<script setup lang="ts">
import IconChevronUp from '~icons/lucide/chevron-up'
import IconCommand from '~icons/lucide/command'
import IconCornerDownLeft from '~icons/lucide/corner-down-left'
import IconPencilSimple from '~icons/ph/pencil-simple'
import { type Component, computed, nextTick, onUnmounted, ref, watch } from 'vue'
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
import { useLensInlineEdit } from '../composables/LensInlineEdit'
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

// The editor's visible label. The input's own label — the one that carries the
// required marker — is visually hidden (the row label stands in for it), so
// re-attach the marker here.
const editorLabel = computed(() =>
  (props.field as any).data?.required ? `${props.field.label()} *` : props.field.label()
)

// One sheet editor open at a time: `editing` derives from the sheet-scoped
// inline-edit context (provided by LensSheet), so opening another field's
// editor closes this one — mirroring the table's inline cells.
const inline = useLensInlineEdit()
const editing = computed(() => inline?.activeKey.value === props.fieldKey)
const model = ref<any>(null)
const activeEditorTarget = ref<EventTarget | null>(null)

// The sheet can close (or flip to create mode) while an editor is open; the
// field unmounts but the shared key would survive and reopen this field's
// editor on the next mount. Release it if it's still ours.
onUnmounted(() => {
  if (editing.value) {
    inline?.stop()
  }
})

// If the backing record is replaced/rebound while this editor is open (the
// refresh banner, a parent `refresh()`, or a `/show` merge filling detail keys),
// the `model` captured in `start()` is stale; applying it would overwrite the
// freshly bound value. Close the editor so the user re-opens against the current
// value. Our own optimistic save also mutates this value, but `apply()` stops
// the edit synchronously right after, so this async watcher sees it already
// closed; user typing only touches the local `model`, never the record.
watch(
  () => props.record[props.fieldKey],
  () => { if (editing.value) { inline?.stop() } }
)

const { validation, validate, reset } = useValidation(
  () => ({ input: model.value }),
  () => ({ input: props.field.generateValidationRules() })
)

const formEl = ref<HTMLElement | null>(null)

// No hint while nothing inside the form is focused (e.g. a radio-group editor,
// whose options aren't keyboard-focusable): keydowns don't route through the
// form then, so no shortcut would actually work.
const submitShortcut = computed(() =>
  activeEditorTarget.value ? editorSubmitShortcutForTarget(activeEditorTarget.value) : null
)
const submitShortcutModifierIcon = computed<Component | null>(() => {
  return submitShortcut.value === 'command-enter'
    ? IconCommand
    : submitShortcut.value === 'control-enter'
      ? IconChevronUp
      : null
})
const submitShortcutLabel = computed(() =>
  submitShortcut.value ? shortcutLabel(submitShortcut.value) : null
)

function start() {
  const raw = props.record[props.fieldKey]
  model.value = raw != null ? props.field.payloadToInput(raw) : props.field.inputEmptyValue()
  reset()
  inline?.start(props.fieldKey)
  // Focus the input on open (matching the inline table editor): better UX, and
  // it routes the editor's keydowns — notably Escape — through the form handler
  // so Escape cancels the edit rather than closing the sheet.
  nextTick(() => {
    focusFirstEditable(formEl.value)
    syncActiveEditorTarget()
  })
}

function cancel() {
  inline?.stop()
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
    // Only release the shared key if it's still ours: another field's editor
    // may have opened during the awaited validation above.
    if (editing.value) {
      inline?.stop()
    }
    return
  }

  // Optimistic: patch + persist in the background, then close immediately.
  edit!.save(props.record, {
    [props.fieldKey]: props.field.inputToPayload(model.value)
  })
  if (editing.value) {
    inline?.stop()
  }
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

function onEditorFocusout(event: FocusEvent) {
  // Focus moving within the form (including onto the action buttons) keeps the
  // hint stable; focus leaving the editor entirely clears it, so the hint can't
  // keep advertising a control that's no longer focused.
  if (!(event.relatedTarget instanceof HTMLElement && formEl.value?.contains(event.relatedTarget))) {
    activeEditorTarget.value = null
  }
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

    <div
      v-else
      ref="formEl"
      class="form"
      @keydown="onEditorKeydown"
      @focusin="onEditorFocusin"
      @focusout="onEditorFocusout"
    >
      <SDataListItem>
        <template #label>{{ editorLabel }}</template>
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
              <SButton size="mini" mode="info" @click="apply">
                <span class="apply-content">
                  <span>{{ t.apply }}</span>
                  <template v-if="submitShortcut">
                    <span class="visually-hidden">({{ submitShortcutLabel }})</span>
                    <span class="shortcut" :title="submitShortcutLabel ?? undefined" aria-hidden="true">
                      <component
                        :is="submitShortcutModifierIcon"
                        v-if="submitShortcutModifierIcon"
                        class="shortcut-icon"
                      />
                      <IconCornerDownLeft class="shortcut-icon" />
                    </span>
                  </template>
                </span>
              </SButton>
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

/* Scope the hover chrome to the data-list row's own cell: display renderers
   can nest their own `.value` (e.g. `SDescPill`), which must not grow a second
   hover border. */
.display :deep(.SDataListItem > .content > .value),
.display :deep(.SDataListItem > .content > .empty) {
  position: relative;
  z-index: 0;
}

.LensSheetField.is-editable .display :deep(.SDataListItem > .content > .value)::before,
.LensSheetField.is-editable .display :deep(.SDataListItem > .content > .empty)::before {
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

.LensSheetField.is-editable:hover .display :deep(.SDataListItem > .content > .value)::before,
.LensSheetField.is-editable:hover .display :deep(.SDataListItem > .content > .empty)::before {
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
  border-radius: 8px;
  color: var(--c-text-2);
  background-color: var(--c-bg-1);
  box-shadow: var(--shadow-depth-1);
  opacity: 0;
  transition: opacity 0.1s, background-color 0.1s, color 0.1s;
}

.LensSheetField.is-editable:hover .edit {
  opacity: 1;
}

.edit:hover {
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

/* Visually hidden but kept in the accessibility tree (`display: none` would
   drop it): the input's own label keeps naming the input for screen readers
   while the row label stands in for it visually, and the shortcut text keeps
   reaching screen readers alongside the icon-only hint. */
.editor-input :deep(.SInputBase > .label),
.visually-hidden {
  position: absolute;
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  min-height: 0;
  border: 0;
  clip-path: inset(50%);
  white-space: nowrap;
  overflow: hidden;
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

.apply-content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.shortcut {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  padding: 2px 3px;
  border-radius: 5px;
  background-color: color-mix(in oklab, currentColor 16%, transparent);
}

.shortcut-icon {
  width: 12px;
  height: 12px;
  opacity: 0.9;
}
</style>
