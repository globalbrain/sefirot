<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import SDataListItem from '../../../components/SDataListItem.vue'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { useSnackbars } from '../../../stores/Snackbars'
import { type FieldData } from '../FieldData'
import { useLensEdit } from '../composables/LensEdit'
import { type AvatarField } from '../fields/AvatarField'
import { type Field } from '../fields/Field'
import LensInputAvatar from './LensInputAvatar.vue'

const props = defineProps<{
  field: Field<FieldData>
  fieldKey: string
  record: Record<string, any>
}>()

// The table only renders this component for `avatar` fields, so the field is
// always an `AvatarField` — narrow it for the avatar-specific config getters.
const avatarField = computed(() => props.field as AvatarField)

const { t } = useTrans({
  en: { save_error: 'We couldn’t save the image. Please try again.' },
  ja: { save_error: '画像を保存できませんでした。もう一度お試しください。' }
})

const edit = useLensEdit()
const snackbars = useSnackbars()

// Editable only when the row passes the edit gate and the field is marked
// editable; the image is written through the Lens update (a blocking save).
const editable = computed(() =>
  !!edit?.canEdit(props.record)
  && (props.field as any).data?.showOnUpdate === true
)

// Materialize the read-only display component once (computed off `props.field`):
// `dataListItemComponent()` mints a fresh definition each call, so resolving it
// inline in the template would unmount/remount the avatar on every reactive row
// update (e.g. a write's `patch`), causing flicker.
const displayComponent = computed(() => props.field.dataListItemComponent())

const saving = ref(false)

// The value the picker shows: the row's current image URL, except while a save
// is in flight (then the local file preview the change handler set).
const model = ref<File | string | null>(props.record[props.fieldKey] ?? null)

watch(
  () => props.record[props.fieldKey],
  (value) => { if (!saving.value) { model.value = value ?? null } }
)

// Validate the picked value (a File, or null on removal) against the field rules
// before the blocking save. The model usually holds the existing image URL — a
// string the file rules reject — so validation runs on what's submitted, here,
// rather than inline on the input (which would flag the unchanged URL).
const pending = reactive<{ value: File | null }>({ value: null })
const { validation, validate } = useValidation(
  () => pending,
  () => ({ value: avatarField.value.generateValidationRules() })
)

async function onChange(value: File | string | null | undefined) {
  // A string is the existing URL still selected — nothing to save.
  if (typeof value === 'string') {
    model.value = value
    return
  }
  const file = value ?? null
  // Capture the record being edited: the sheet can be closed and reopened on
  // another row while this save is in flight (only the input is disabled, not
  // the sheet), so `props.record` may point elsewhere by the time we resolve.
  const record = props.record
  // Show the picked file (or the cleared empty state) immediately.
  model.value = file

  pending.value = file
  if (!(await validate())) {
    const message = validation.value.$errors[0]?.$message
    snackbars.push({ mode: 'danger', text: message ? String(message) : t.save_error })
    if (props.record === record) {
      model.value = record[props.fieldKey] ?? null
    }
    return
  }

  saving.value = true
  try {
    // The catalog writes through the Lens update and patches the captured
    // record's column itself (with write accounting); reflect the canonical
    // value on this picker if it still shows the same record.
    await edit?.saveBlocking(record, { [props.fieldKey]: file })
    if (props.record === record) {
      model.value = record[props.fieldKey] ?? null
    }
  } catch {
    if (props.record === record) {
      model.value = record[props.fieldKey] ?? null
    }
    snackbars.push({ mode: 'danger', text: t.save_error })
  } finally {
    saving.value = false
    // If the sheet rebound to another row mid-save, resync the picker to it
    // (the `props.record` watcher skipped re-seeding while `saving` was true).
    if (props.record !== record) {
      model.value = props.record[props.fieldKey] ?? null
    }
  }
}
</script>

<template>
  <div class="LensSheetAvatarField">
    <SDataListItem v-if="editable">
      <template #label>{{ field.label() }}</template>
      <template #value>
        <LensInputAvatar
          :model-value="model"
          :accept="avatarField.accept()"
          :image-type="avatarField.imageType()"
          :help="field.help() || undefined"
          :disabled="saving"
          @update:model-value="onChange"
        />
      </template>
    </SDataListItem>
    <component :is="displayComponent" v-else :value="record[fieldKey]" />
  </div>
</template>

<style scoped lang="postcss">
.LensSheetAvatarField {
  position: relative;
  border-bottom: 1px dashed var(--c-divider);
}
</style>
