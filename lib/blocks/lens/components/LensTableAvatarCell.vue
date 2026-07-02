<script setup lang="ts">
import IconCamera from '~icons/ph/camera'
import IconPencilSimple from '~icons/ph/pencil-simple'
import { useElementBounding } from '@vueuse/core'
import { computed, nextTick, onUnmounted, reactive, ref, watch } from 'vue'
import SAvatar from '../../../components/SAvatar.vue'
import SButton from '../../../components/SButton.vue'
import SSpinner from '../../../components/SSpinner.vue'
import { useManualDropdownPosition } from '../../../composables/Dropdown'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { useSnackbars } from '../../../stores/Snackbars'
import { dispatchEditorKeydown, focusFirstEditable } from '../../../support/Dom'
import { type FieldData } from '../FieldData'
import { useLensEdit } from '../composables/LensEdit'
import { useLensInlineEdit } from '../composables/LensInlineEdit'
import { type AvatarField } from '../fields/AvatarField'
import { type Field } from '../fields/Field'

const props = defineProps<{
  field: AvatarField
  fieldKey: string
  // The English / Japanese display-name companion fields, resolved by the table
  // from the avatar field's `nameEn` / `nameJa` keys. Present only when the
  // avatar declares them, so the names can be edited alongside the image.
  nameEnKey?: string | null
  nameJaKey?: string | null
  nameFieldEn?: Field<FieldData> | null
  nameFieldJa?: Field<FieldData> | null
  // Injected by STable for a `component` cell: the cell value (image URL) and
  // the full row record.
  value: any
  record: Record<string, any>
}>()

const { t } = useTrans({
  en: { cancel: 'Cancel', save: 'Save', edit_image: 'Change image', edit_names: 'Edit name', upload_error: 'We couldn’t upload the image. Please try again.' },
  ja: { cancel: 'キャンセル', save: '保存', edit_image: '画像を変更', edit_names: '名前を編集', upload_error: '画像をアップロードできませんでした。もう一度お試しください。' }
})

const edit = useLensEdit()
const inline = useLensInlineEdit()
const snackbars = useSnackbars()

const canEdit = computed(() => !!edit?.canEdit(props.record))

// The image is written through the Lens update (a blocking save); the overlay
// affordance is shown whenever the row is editable.
const canEditImage = computed(() => canEdit.value)

const nameEntries = computed(() => {
  const entries: { key: string; field: Field<FieldData> }[] = []
  const seen = new Set<string>()
  const add = (key: string | null | undefined, field: Field<FieldData> | null | undefined): void => {
    // Skip a companion that isn't fetched on this row — editing the visible name
    // would otherwise send an empty value for the unfetched sibling and clear it
    // (e.g. `loadSelectable` exposes `name_ja` in `fields` while the select omits
    // it). De-duplicate too: both languages may point at one shared name column.
    if (!key || !field || seen.has(key) || !(key in props.record)) {
      return
    }
    seen.add(key)
    entries.push({ key, field })
  }
  add(props.nameEnKey, props.nameFieldEn)
  add(props.nameJaKey, props.nameFieldJa)
  return entries
})

const canEditNames = computed(() => canEdit.value && nameEntries.value.length > 0)

// --- Display (mirrors STableCellAvatar) -------------------------------------

const base = computed<any>(() => props.field.tableCell(props.value, props.record))

// While an upload is in flight, show a local preview of the picked file so the
// new image appears immediately instead of waiting on the round-trip.
const previewSrc = ref<string | null>(null)
const displayImage = computed(() => previewSrc.value ?? base.value.image ?? null)
const displayName = computed(() => base.value.name || null)

// --- Image edit (file picker -> blocking Lens update) -----------------------

const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

// Validate the picked image against the field rules before the blocking save.
// The picked value is a raw `File` (or null), so the file rules apply directly.
const imagePending = reactive<{ value: File | null }>({ value: null })
const { validation: imageValidation, validate: validateImage } = useValidation(
  () => imagePending,
  () => ({ value: props.field.generateValidationRules() })
)

function pickImage() {
  if (!canEditImage.value || uploading.value) {
    return
  }
  fileInput.value?.click()
}

async function onFilePicked(event: Event) {
  const input = event.target as HTMLInputElement
  const file = (input.files ?? [])[0] ?? null
  // Reset the input so picking the same file again still fires `change`.
  input.value = ''
  if (!file) {
    return
  }
  await upload(file)
}

async function upload(file: File | null) {
  if (!canEditImage.value) {
    return
  }
  imagePending.value = file
  if (!(await validateImage())) {
    const message = imageValidation.value.$errors[0]?.$message
    snackbars.push({ mode: 'danger', text: message ? String(message) : t.upload_error })
    return
  }
  uploading.value = true
  previewSrc.value = file ? URL.createObjectURL(file) : null
  try {
    // The catalog writes through the Lens update and patches the row's column
    // itself, with write accounting so a concurrent query change can't land
    // stale rows over it; the patched value is the URL, never the raw file.
    await edit?.saveBlocking(props.record, { [props.fieldKey]: file })
  } catch {
    // saveBlocking rejects on a failed write; guard with a generic message so a
    // failure never goes unreported.
    snackbars.push({ mode: 'danger', text: t.upload_error })
  } finally {
    if (previewSrc.value) {
      URL.revokeObjectURL(previewSrc.value)
      previewSrc.value = null
    }
    uploading.value = false
  }
}

// --- Name edit (floating editor anchored to the cell) -----------------------

const myKey = computed(() => `${edit?.resolveId(props.record)}:${props.fieldKey}`)
const editingNames = computed(() => inline?.activeKey.value === myKey.value)

const anchor = ref<HTMLElement | null>(null)
const editorEl = ref<HTMLElement | null>(null)
const bounds = useElementBounding(anchor)
const { inset, update } = useManualDropdownPosition(anchor)

const nameModel = reactive<Record<string, any>>({})

// Materialize the name inputs once so the editor doesn't mint a fresh component
// definition each render (which breaks Vue's patching).
const nameInputs = computed(() =>
  nameEntries.value.map((entry) => ({
    key: entry.key,
    field: entry.field,
    component: entry.field.formInputComponent()
  }))
)

const { validation, validate, reset } = useValidation(
  () => nameModel,
  () => Object.fromEntries(nameEntries.value.map((e) => [e.key, e.field.generateValidationRules()]))
)

const editorStyle = computed(() => ({
  ...inset.value,
  width: `${Math.max(bounds.width.value, 280)}px`
}))

// If the backing record is replaced while the name editor is open (a refresh
// apply, a parent refresh, a requery), close it so a stale model can't be saved.
watch(
  () => nameEntries.value.map((e) => props.record[e.key]),
  () => { if (editingNames.value) { inline?.stop() } },
  { deep: true }
)

// STable virtualization can unmount this row while scrolling; clear the shared
// active key on unmount so a remount doesn't reopen a blank editor.
onUnmounted(() => {
  if (inline?.activeKey.value === myKey.value) {
    inline.stop()
  }
})

function startNames() {
  if (!canEditNames.value) {
    return
  }
  for (const entry of nameEntries.value) {
    nameModel[entry.key] = entry.field.payloadToInput(props.record[entry.key] ?? entry.field.inputEmptyValue())
  }
  reset()
  inline?.start(myKey.value)
  nextTick(() => {
    update()
    focusFirstEditable(editorEl.value)
  })
}

function cancelNames() {
  inline?.stop()
}

async function applyNames() {
  // Snapshot the companion values we're editing so we can detect the backing row
  // being replaced (a refresh apply, a parent refresh, a requery, or a sibling
  // save) during the async validate, and avoid clobbering the fresh state.
  const edited = nameEntries.value.map((entry) => props.record[entry.key])

  if (!(await validate())) {
    return
  }

  // A refresh / requery can swap a companion value during the validate microtask;
  // the watcher above closes the editor but flushes asynchronously and can't abort
  // this running apply, so re-check against the snapshot. If any changed, `model`
  // predates the fresh value — bail rather than overwrite it.
  if (nameEntries.value.some((entry, i) => props.record[entry.key] !== edited[i])) {
    if (inline?.activeKey.value === myKey.value) {
      inline.stop()
    }
    return
  }

  // The editable predicate can flip to reject this row while the editor is open.
  if (!canEditNames.value) {
    if (inline?.activeKey.value === myKey.value) {
      inline.stop()
    }
    return
  }
  const values: Record<string, any> = {}
  for (const entry of nameEntries.value) {
    values[entry.key] = entry.field.inputToPayload(nameModel[entry.key])
  }
  edit!.save(props.record, values)
  if (inline?.activeKey.value === myKey.value) {
    inline.stop()
  }
}

function onEditorKeydown(event: KeyboardEvent) {
  dispatchEditorKeydown(event, { cancel: cancelNames, submit: applyNames })
}
</script>

<template>
  <div ref="anchor" class="LensTableAvatarCell" :class="{ editing: editingNames }">
    <div v-if="displayImage || displayName || canEditImage" class="avatar">
      <button
        class="image"
        type="button"
        :class="{ editable: canEditImage }"
        :disabled="!canEditImage || uploading"
        :aria-label="`${t.edit_image} ${field.label()}`"
        @click="pickImage"
      >
        <SAvatar size="mini" :avatar="displayImage" :name="displayName" />
        <span v-if="canEditImage" class="image-overlay">
          <SSpinner v-if="uploading" class="image-spinner" />
          <IconCamera v-else class="image-icon" />
        </span>
      </button>
      <span v-if="displayName" class="name">{{ displayName }}</span>
    </div>

    <input
      v-if="canEditImage"
      ref="fileInput"
      class="file-input"
      type="file"
      :accept="field.accept()"
      @change="onFilePicked"
    >

    <button
      v-if="canEditNames"
      class="edit"
      type="button"
      :aria-label="`${t.edit_names} ${field.label()}`"
      @click="startNames"
    >
      <IconPencilSimple class="edit-icon" />
    </button>

    <Teleport v-if="editingNames" to="#sefirot-modals">
      <div
        ref="editorEl"
        class="LensTableAvatarCellEditor"
        :style="editorStyle"
        @keydown="onEditorKeydown"
      >
        <component
          :is="input.component"
          v-for="input in nameInputs"
          :key="input.key"
          v-model="nameModel[input.key]"
          :validation="validation[input.key]"
        />
        <div class="actions">
          <SButton size="mini" :label="t.cancel" @click="cancelNames" />
          <SButton size="mini" mode="info" :label="t.save" @click="applyNames" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="postcss">
.LensTableAvatarCell {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 40px;
  padding: 8px 36px 8px 16px;
}

.avatar {
  display: flex;
  align-items: center;
  min-width: 0;
}

.image {
  position: relative;
  display: flex;
  flex-shrink: 0;
  border-radius: 50%;
}

.image.editable {
  cursor: pointer;
}

.image:disabled {
  cursor: default;
}

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  opacity: 0;
  transition: opacity 0.1s;
}

.image.editable:hover .image-overlay,
.image:disabled .image-overlay {
  opacity: 1;
}

.image-icon {
  width: 12px;
  height: 12px;
}

.image-spinner {
  width: 12px;
  height: 12px;
}

.name {
  display: inline-block;
  margin-left: 8px;
  line-height: 24px;
  font-size: var(--table-cell-font-size);
  font-weight: var(--table-cell-font-weight);
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-input {
  display: none;
}

.edit {
  position: absolute;
  top: 50%;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  border-radius: 6px;
  color: var(--c-text-2);
  opacity: 0;
  transition: opacity 0.1s, background-color 0.1s, color 0.1s;
}

.LensTableAvatarCell:hover .edit,
.LensTableAvatarCell.editing .edit {
  opacity: 1;
}

.edit:hover {
  background-color: var(--c-bg-mute-1);
  color: var(--c-text-1);
}

.edit-icon {
  width: 14px;
  height: 14px;
}

.LensTableAvatarCellEditor {
  position: fixed;
  z-index: var(--z-index-sheet, 2000);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  background-color: var(--c-bg-1);
  box-shadow: var(--shadow-depth-3);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
