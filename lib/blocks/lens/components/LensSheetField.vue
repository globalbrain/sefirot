<script setup lang="ts">
import IconArrowBendDownLeft from '~icons/ph/arrow-bend-down-left'
import IconCommand from '~icons/ph/command'
import IconControl from '~icons/ph/control'
import IconPencilSimple from '~icons/ph/pencil-simple'
import { type Component, computed, nextTick, ref, watch } from 'vue'
import SButton from '../../../components/SButton.vue'
import SDataListItem from '../../../components/SDataListItem.vue'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import {
  type EditorSubmitShortcut,
  dispatchEditorKeydown,
  editorSubmitShortcutForTarget,
  focusFirstEditable
} from '../../../support/Dom'
import { type FieldData } from '../FieldData'
import { useLensEdit } from '../composables/LensEdit'
import { type Field } from '../fields/Field'

const props = defineProps<{
  field: Field<FieldData>
  fieldKey: string
  record: Record<string, any>
}>()

const { t } = useTrans({
  en: { cancel: 'Cancel', apply: 'Apply', edit: 'Edit' },
  ja: { cancel: 'キャンセル', apply: '適用', edit: '編集' }
})

const edit = useLensEdit()

const editable = computed(() => !!edit?.canEdit(props.record) && (props.field as any).data?.showOnUpdate === true)

// Some field types do not implement a detail renderer or an editable input
// (they `throw new Error('Not implemented.')`). Resolve them defensively so a
// single unimplemented field never breaks the whole sheet — fall back to a
// plain label/value row for display, and simply omit the edit affordance.
//
// Computed off `props.field` so they recompute when the field instance changes
// (e.g. a refresh swaps in new field metadata for an already-rendered key).
const displayComponent = computed(() => resolve(() => props.field.dataListItemComponent()))
const inputComponent = computed(() => resolve(() => props.field.formInputComponent()))

function resolve(fn: () => any): any {
  try {
    return fn()
  } catch {
    return null
  }
}

// Fallback display value for fields without a `dataListItemComponent`.
const displayValue = computed(() => {
  const v = props.record[props.fieldKey]
  if (v == null) {
    return null
  }
  if (Array.isArray(v)) {
    return v.join(', ')
  }
  if (typeof v === 'object') {
    return v.display ?? v.value ?? JSON.stringify(v)
  }
  return String(v)
})

// Display-only fields (e.g. `content`) resolve an input component but render
// static markup with no value, so they must not gain an edit affordance. The
// row-identifier (`indexField`) is also never editable: optimistically changing
// the id before the write settles would re-key the row, so a follow-up save /
// delete would address the not-yet-synced new id instead of the in-flight one.
const canEdit = computed(() =>
  editable.value
  && !!inputComponent.value
  && props.fieldKey !== edit?.indexField
  && props.field.isSubmittable()
  && props.field.supportsOptimisticUpdate()
)

const editing = ref(false)
const model = ref<any>(null)
const activeEditorTarget = ref<EventTarget | null>(null)

// If the backing record is replaced/rebound while this editor is open (the
// refresh banner, a parent `refresh()`, or a `/show` merge filling detail keys),
// the `model` captured in `start()` is stale; applying it would overwrite the
// freshly bound value. Close the editor so the user re-opens against the current
// value. Our own optimistic save also mutates this value, but `apply()` sets
// `editing = false` synchronously right after, so this async watcher sees it
// already closed; user typing only touches the local `model`, never the record.
watch(
  () => props.record[props.fieldKey],
  () => { if (editing.value) { editing.value = false } }
)

const { validation, validate, reset } = useValidation(
  () => ({ input: model.value }),
  () => ({ input: props.field.generateValidationRules() })
)

const formEl = ref<HTMLElement | null>(null)

const submitShortcut = computed(() => editorSubmitShortcutForTarget(activeEditorTarget.value))
const submitShortcutModifierIcon = computed<Component | null>(() => {
  return submitShortcut.value === 'command-enter'
    ? IconCommand
    : submitShortcut.value === 'control-enter'
      ? IconControl
      : null
})
const submitShortcutLabel = computed(() => shortcutLabel(submitShortcut.value))

function start() {
  const raw = props.record[props.fieldKey]
  model.value = raw != null ? props.field.payloadToInput(raw) : props.field.inputEmptyValue()
  reset()
  editing.value = true
  // Focus the input on open (matching the inline table editor): better UX, and
  // it routes the editor's keydowns — notably Escape — through the form handler
  // so Escape cancels the edit rather than closing the sheet.
  nextTick(() => {
    focusFirstEditable(formEl.value)
    syncActiveEditorTarget()
  })
}

function cancel() {
  editing.value = false
}

async function apply() {
  // Snapshot the value we're editing so we can detect the backing record being
  // rebound out from under us during validation (checked below).
  const editedValue = props.record[props.fieldKey]

  // Client-side validation only (required, length, …). Server-only rules such
  // as `unique` are enforced by the background write, which surfaces a snackbar
  // on rejection.
  if (!(await validate())) {
    return
  }

  // A refresh / rebind can swap the backing record during the validate microtask;
  // the watcher above closes the editor but flushes asynchronously and can't abort
  // this already-running apply, so re-check against the snapshot. If the value
  // changed, `model` is stale — bail rather than overwrite the fresh value.
  if (props.record[props.fieldKey] !== editedValue) {
    return
  }

  // A per-record `editable` predicate can flip to reject this row while the editor
  // is open (e.g. a refresh marks it locked). Re-check before persisting so an
  // already-open editor can't save a row the policy now rejects.
  if (!canEdit.value) {
    editing.value = false
    return
  }

  // Optimistic: patch + persist in the background, then close immediately.
  edit!.save(props.record, {
    [props.fieldKey]: props.field.inputToPayload(model.value)
  })
  editing.value = false
}

function onEditorKeydown(event: KeyboardEvent) {
  // `shield` keeps Escape from reaching the surrounding sheet, which otherwise
  // closes on it (via SSheet's window-level handler).
  dispatchEditorKeydown(event, { cancel, submit: apply, shield: true })
}

function onEditorFocusin(event: FocusEvent) {
  if (event.target instanceof HTMLElement && event.target.closest('.actions')) {
    return
  }

  activeEditorTarget.value = event.target
}

function syncActiveEditorTarget() {
  const activeElement = document.activeElement
  activeEditorTarget.value = activeElement instanceof HTMLElement
    && formEl.value?.contains(activeElement)
    && !activeElement.closest('.actions')
    ? activeElement
    : null
}

function shortcutLabel(shortcut: EditorSubmitShortcut): string {
  return shortcut === 'enter'
    ? 'Enter'
    : shortcut === 'command-enter'
      ? 'Command+Enter'
      : 'Control+Enter'
}
</script>

<template>
  <div class="LensSheetField" :class="{ editing, 'is-editable': canEdit }">
    <div v-if="!editing" class="display">
      <component
        :is="displayComponent"
        v-if="displayComponent"
        :value="record[fieldKey]"
        :value-action="canEdit"
        @click:value="start"
      />
      <SDataListItem v-else :value-action="canEdit" @click:value="start">
        <template #label>{{ field.label() }}</template>
        <template v-if="displayValue !== null" #value>{{ displayValue }}</template>
      </SDataListItem>
      <button
        v-if="canEdit"
        class="edit"
        type="button"
        :aria-label="`${t.edit} ${field.label()}`"
        @click.stop="start"
      >
        <IconPencilSimple class="edit-icon" />
      </button>
    </div>

    <div v-else ref="formEl" class="form" @keydown="onEditorKeydown" @focusin="onEditorFocusin">
      <SDataListItem>
        <template #label>{{ field.label() }}</template>
        <template #value>
          <div class="editor">
            <div class="editor-input">
              <component
                :is="inputComponent"
                v-model="model"
                size="mini"
                :validation="validation.input"
              />
            </div>
            <div class="actions">
              <SButton size="mini" :label="t.cancel" @click="cancel" />
              <button
                class="apply-action"
                type="button"
                :aria-label="`${t.apply} (${submitShortcutLabel})`"
                @click="apply"
              >
                <span class="apply-content">
                  <span class="apply-label">{{ t.apply }}</span>
                  <span class="shortcut" :title="submitShortcutLabel" aria-hidden="true">
                    <component
                      :is="submitShortcutModifierIcon"
                      v-if="submitShortcutModifierIcon"
                      class="shortcut-icon"
                    />
                    <span v-if="submitShortcutModifierIcon" class="shortcut-plus">+</span>
                    <IconArrowBendDownLeft class="shortcut-icon" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </template>
      </SDataListItem>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.LensSheetField {
  position: relative;
  border-bottom: 1px dashed var(--c-divider);
}

.form {
  position: relative;
}

.display {
  position: relative;
  isolation: isolate;
}

.display :deep(.value),
.display :deep(.empty) {
  position: relative;
  z-index: 0;
}

.LensSheetField.is-editable .display :deep(.value)::before,
.LensSheetField.is-editable .display :deep(.empty)::before {
  content: "";
  position: absolute;
  inset: -6px 0 -6px -16px;
  z-index: -1;
  pointer-events: none;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background-color: var(--c-bg-1);
  box-shadow: var(--shadow-depth-2);
  opacity: 0;
  transition: opacity 0.1s;
}

.LensSheetField.is-editable:hover .display :deep(.value)::before,
.LensSheetField.is-editable:hover .display :deep(.empty)::before {
  opacity: 1;
}

.edit {
  position: absolute;
  top: 50%;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  color: var(--c-text-2);
  background-color: var(--c-bg-1);
  box-shadow: var(--shadow-depth-1);
  opacity: 0;
  transition: opacity 0.1s, border-color 0.1s, background-color 0.1s, color 0.1s;
}

.LensSheetField.is-editable:hover .edit {
  opacity: 1;
}

.edit:hover {
  border-color: var(--input-hover-border-color);
  background-color: var(--c-bg-mute-1);
  color: var(--c-text-1);
}

.edit-icon {
  width: 16px;
  height: 16px;
}

.form :deep(.value) {
  position: relative;
}

.editor {
  position: relative;
  z-index: 2;
  margin: -8px 0 0 -16px;
  width: calc(100% + 16px);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background-color: var(--c-bg-1);
  box-shadow: var(--shadow-depth-2);
  overflow: visible;
}

.editor-input {
  position: relative;
  z-index: 2;
  padding: 8px;
}

.editor-input :deep(.SInputBase > .label) {
  display: none;
}

.actions {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
  border-top: 1px solid var(--c-divider);
}

.apply-action {
  --button-border-color: var(--button-fill-info-border-color);
  --button-text-color: var(--button-fill-info-text-color);
  --button-content-color: var(--button-fill-info-content-color);
  --button-bg-color: var(--button-fill-info-bg-color);
  --button-hover-border-color: var(--button-fill-info-hover-border-color);
  --button-hover-text-color: var(--button-fill-info-hover-text-color);
  --button-hover-bg-color: var(--button-fill-info-hover-bg-color);
  --button-active-border-color: var(--button-fill-info-active-border-color);
  --button-active-text-color: var(--button-fill-info-active-text-color);
  --button-active-bg-color: var(--button-fill-info-active-bg-color);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  min-width: 28px;
  min-height: 28px;
  border: 1px solid var(--button-border-color);
  border-radius: 8px;
  color: var(--button-text-color);
  background-color: var(--button-bg-color);
  font-size: var(--button-font-size, var(--button-mini-font-size));
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0;
  text-align: center;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.apply-action:hover {
  border-color: var(--button-hover-border-color);
  color: var(--button-hover-text-color);
  background-color: var(--button-hover-bg-color);
}

.apply-action:active {
  border-color: var(--button-active-border-color);
  color: var(--button-active-text-color);
  background-color: var(--button-active-bg-color);
}

.apply-content {
  display: inline-flex;
  align-items: center;
  height: 100%;
  gap: 6px;
  color: var(--button-content-color);
}

.apply-label {
  line-height: 20px;
}

.shortcut {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: currentColor;
}

.shortcut-icon {
  width: 16px;
  height: 16px;
}

.shortcut-plus {
  line-height: 16px;
  font-size: 11px;
  font-weight: 600;
}
</style>
