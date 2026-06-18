<script setup lang="ts">
import IconPencilSimple from '~icons/ph/pencil-simple'
import { useElementBounding } from '@vueuse/core'
import { computed, nextTick, ref, shallowRef } from 'vue'
import SButton from '../../../components/SButton.vue'
import { useManualDropdownPosition } from '../../../composables/Dropdown'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { type FieldData } from '../FieldData'
import { useLensEdit } from '../composables/LensEdit'
import { useLensInlineEdit } from '../composables/LensInlineEdit'
import { type Field } from '../fields/Field'

const props = defineProps<{
  field: Field<FieldData>
  fieldKey: string
  value: any
  record: Record<string, any>
}>()

const { t } = useTrans({
  en: { cancel: 'Cancel', save: 'Save', edit: 'Edit' },
  ja: { cancel: 'キャンセル', save: '保存', edit: '編集' }
})

const edit = useLensEdit()
const inline = useLensInlineEdit()

const myKey = computed(() => `${edit?.resolveId(props.record)}:${props.fieldKey}`)
const editing = computed(() => inline?.activeKey.value === myKey.value)

// Reuse the field's own table-cell rendering for the display value so the
// label mapping (e.g. select option labels) matches the read-only columns.
// Falls back to a plain representation for non-text displays.
const displayValue = computed(() => {
  try {
    const cell = props.field.tableColumn().cell
    const resolved: any = typeof cell === 'function' ? cell(props.value, props.record) : cell
    if (resolved && (resolved.type === 'text' || resolved.type === 'number')) {
      return resolved.value ?? ''
    }
  } catch {
    // Field types without a text cell fall through to the generic display.
  }

  const v = props.value
  if (v == null) {
    return ''
  }
  if (Array.isArray(v)) {
    return v.join(', ')
  }
  if (typeof v === 'object') {
    return v.display ?? v.value ?? ''
  }
  return String(v)
})

// --- Editor (a floating box anchored to the cell, escaping table overflow) ---

const anchor = ref<HTMLElement | null>(null)
const editorEl = ref<HTMLElement | null>(null)
const bounds = useElementBounding(anchor)
const { inset, update } = useManualDropdownPosition(anchor)

const inputComponent = shallowRef<any>(null)
const model = ref<any>(null)
const saving = ref(false)

const { validation, validate, reset } = useValidation(
  () => ({ input: model.value }),
  () => ({ input: props.field.generateValidationRules() })
)

const editorStyle = computed(() => ({
  ...inset.value,
  width: `${Math.max(bounds.width.value, 240)}px`
}))

function start() {
  inputComponent.value = props.field.formInputComponent()
  model.value = props.field.payloadToInput(props.value ?? props.field.inputEmptyValue())
  reset()
  inline?.start(myKey.value)
  nextTick(() => {
    update()
    const el = editorEl.value?.querySelector(
      'input, textarea, [contenteditable], [tabindex]'
    ) as HTMLElement | null
    el?.focus()
  })
}

function cancel() {
  inline?.stop()
}

async function apply() {
  if (!(await validate())) {
    return
  }

  saving.value = true

  try {
    await edit!.save(props.record, {
      [props.fieldKey]: props.field.inputToPayload(model.value)
    })
    inline?.stop()
  } finally {
    saving.value = false
  }
}

function onEditorKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    cancel()
    return
  }
  // Enter saves, except in a textarea where it inserts a newline.
  if (event.key === 'Enter' && (event.target as HTMLElement)?.tagName !== 'TEXTAREA') {
    event.preventDefault()
    apply()
  }
}
</script>

<template>
  <div ref="anchor" class="LensTableEditableCell" :class="{ editing }">
    <span class="value">{{ displayValue }}</span>
    <button
      class="edit"
      type="button"
      :aria-label="`${t.edit} ${field.label()}`"
      @click="start"
    >
      <IconPencilSimple class="edit-icon" />
    </button>

    <Teleport v-if="editing" to="#sefirot-modals">
      <div ref="editorEl" class="LensTableEditableCellEditor" :style="editorStyle" @keydown="onEditorKeydown">
        <component :is="inputComponent" v-model="model" :validation="validation.input" />
        <div class="actions">
          <SButton size="mini" :label="t.cancel" :disabled="saving" @click="cancel" />
          <SButton size="mini" mode="info" :label="t.save" :loading="saving" @click="apply" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="postcss">
/* Mirror STableCellText's box so the cell fills the row height instead of
   collapsing, leaving room on the right for the hover edit affordance. */
.LensTableEditableCell {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 40px;
  padding: 8px 36px 8px 16px;
}

.value {
  line-height: 24px;
  font-size: var(--table-cell-font-size);
  font-weight: var(--table-cell-font-weight);
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.LensTableEditableCell:hover .edit,
.LensTableEditableCell.editing .edit {
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

.LensTableEditableCellEditor {
  position: fixed;
  z-index: var(--z-index-sheet, 2000);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background-color: var(--c-bg-1);
  box-shadow: var(--shadow-depth-3);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
