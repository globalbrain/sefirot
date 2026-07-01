<script setup lang="ts">
import IconPencilSimple from '~icons/ph/pencil-simple'
import { useElementBounding } from '@vueuse/core'
import { computed, nextTick, onUnmounted, ref, shallowRef, watch } from 'vue'
import SButton from '../../../components/SButton.vue'
import SLink from '../../../components/SLink.vue'
import SPill from '../../../components/SPill.vue'
import SState from '../../../components/SState.vue'
import { useManualDropdownPosition } from '../../../composables/Dropdown'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { type ColorMode } from '../../../support/Color'
import { day } from '../../../support/Day'
import { dispatchEditorKeydown, focusFirstEditable } from '../../../support/Dom'
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

// A predicate `editable` on the catalog can disable editing per row; hide the
// affordance and refuse to open the editor when this record is rejected.
const canEdit = computed(() => !!edit?.canEdit(props.record))

// If the backing value is replaced while this editor is open — a refresh banner
// apply, a parent `refresh()`, or a requery that keeps this row visible — the
// `model` captured back in `start()` is now stale, and saving it would overwrite
// the freshly fetched cell. Close the editor so the user re-opens against the
// current value. Our own optimistic save also mutates `props.value`, but `apply()`
// calls `inline.stop()` synchronously right after, so `editing` is already false
// by the time this (async) watcher flushes — it won't fight a normal save. User
// typing only touches the local `model`, never `props.value`, so it won't trip.
watch(
  () => props.value,
  () => { if (editing.value) { inline?.stop() } }
)

// STable virtualization can unmount this row (and its teleported editor) while
// scrolling. If this cell holds the active editor, clear the shared active key
// on unmount so a later remount doesn't reopen a blank editor (the local
// `inputComponent`/`model` are only set by `start()`).
onUnmounted(() => {
  if (inline?.activeKey.value === myKey.value) {
    inline.stop()
  }
})

// Reuse the field's own table-cell rendering for the display value so the
// label mapping (e.g. select option labels) matches the read-only columns.
const resolvedCell = computed<any>(() => {
  try {
    const cell = props.field.tableColumn().cell
    return typeof cell === 'function' ? cell(props.value, props.record) : cell
  } catch {
    // Field types without a usable cell fall through to the generic display.
    return null
  }
})

// A `pills` cell (e.g. a multi-select with displayAs: 'pills') renders as pills
// rather than text, mirroring the read-only `STableCellPills` column.
const displayPills = computed<{ label: string; color?: ColorMode }[] | null>(() => {
  const cell = resolvedCell.value
  return cell && cell.type === 'pills' ? cell.pills : null
})

// A `state` cell (e.g. a select with displayAs: 'state') renders as a status
// badge rather than its bare label, mirroring the read-only `STableCellState`
// column.
const displayState = computed<{ label: string; mode?: ColorMode } | null>(() => {
  const cell = resolvedCell.value
  return cell && cell.type === 'state' ? { label: cell.label, mode: cell.mode } : null
})

// A text cell carrying a `link` (or `onClick`) — e.g. a LinkField — renders as a
// link rather than bare text, mirroring the read-only STableCellText so a column
// that was clickable before inline editing was enabled stays clickable instead of
// degrading to plain text. The text itself comes from `displayValue` below.
const displayLink = computed<{ link: string | null; onClick?: (v: any, r: any) => void } | null>(() => {
  const cell = resolvedCell.value
  if (cell && cell.type === 'text' && (cell.link != null || typeof cell.onClick === 'function')) {
    return { link: cell.link ?? null, onClick: cell.onClick }
  }
  return null
})

// Falls back to a plain representation for non-text displays (pills and state
// cells are rendered as their own components in the template above).
const displayValue = computed(() => {
  const resolved: any = resolvedCell.value
  if (resolved && (resolved.type === 'text' || resolved.type === 'number')) {
    return resolved.value ?? ''
  }

  // A `day` cell (e.g. a DateField) carries a Day value plus a format; render the
  // formatted day — mirroring the read-only STableCellDay — so an inline-editable
  // date column shows e.g. `YYYY-MM-DD` rather than the raw ISO/timestamp string
  // the generic fallback below would otherwise surface.
  if (resolved && resolved.type === 'day') {
    return resolved.value ? day(resolved.value).format(resolved.format ?? 'YYYY-MM-DD HH:mm:ss') : ''
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

const { validation, validate, reset } = useValidation(
  () => ({ input: model.value }),
  () => ({ input: props.field.generateValidationRules() })
)

const editorStyle = computed(() => ({
  ...inset.value,
  width: `${Math.max(bounds.width.value, 240)}px`
}))

function start() {
  if (!canEdit.value) {
    return
  }

  inputComponent.value = props.field.formInputComponent()
  model.value = props.field.payloadToInput(props.value ?? props.field.inputEmptyValue())
  reset()
  inline?.start(myKey.value)
  nextTick(() => {
    update()
    focusFirstEditable(editorEl.value)
  })
}

function cancel() {
  inline?.stop()
}

async function apply() {
  // Snapshot the value we're editing so we can detect the backing cell being
  // replaced out from under us during validation (checked below).
  const editedValue = props.value

  // Client-side validation only; server-only rules (e.g. `unique`) are enforced
  // by the background write, which surfaces a snackbar on rejection.
  if (!(await validate())) {
    return
  }

  // A wholesale refresh (refresh banner, a parent `refresh()`, a route change)
  // can swap the backing row during the validate microtask. If this cell's value
  // changed, `model` now predates the fresh value and persisting it would clobber
  // the just-fetched cell — bail. The value watcher above also closes the editor,
  // but it flushes asynchronously and can't abort this already-running save, so
  // re-check here against the snapshot rather than relying on its ordering.
  if (props.value !== editedValue) {
    return
  }

  // A per-record `editable` predicate can flip to reject this row while the editor
  // is open (e.g. a refresh marks it locked) — `start()` only gates opening, so
  // re-check before persisting. Without this an already-open editor could save a
  // row the policy now rejects. Close only if this cell is still the active one
  // (mirrors the post-save close below) so bailing can't wipe an editor the user
  // opened on another cell during the `await validate()`.
  if (!canEdit.value) {
    if (inline?.activeKey.value === myKey.value) {
      inline.stop()
    }
    return
  }

  // Optimistic: patch + persist in the background, then close immediately.
  edit!.save(props.record, {
    [props.fieldKey]: props.field.inputToPayload(model.value)
  })

  // Only close if this cell is still the active one: the user may have started
  // editing another cell while validating, and an unconditional stop would
  // clear that new editor's shared key.
  if (inline?.activeKey.value === myKey.value) {
    inline.stop()
  }
}

function onEditorKeydown(event: KeyboardEvent) {
  dispatchEditorKeydown(event, { cancel, submit: apply })
}
</script>

<template>
  <div ref="anchor" class="LensTableEditableCell" :class="{ editing }">
    <div v-if="displayPills" class="pills">
      <SPill
        v-for="(pill, i) in displayPills"
        :key="i"
        size="mini"
        :mode="pill.color"
        :label="pill.label"
      />
    </div>
    <SState
      v-else-if="displayState"
      size="mini"
      :mode="displayState.mode"
      :label="displayState.label"
    />
    <SLink
      v-else-if="displayLink"
      class="value link"
      :href="displayLink.link"
      :role="displayLink.onClick ? 'button' : null"
      @click="() => displayLink?.onClick?.(value, record)"
    >
      {{ displayValue }}
    </SLink>
    <span v-else class="value">{{ displayValue }}</span>
    <button
      v-if="canEdit"
      class="edit"
      type="button"
      :aria-label="`${t.edit} ${field.label()}`"
      @click="start"
    >
      <IconPencilSimple class="edit-icon" />
    </button>

    <Teleport v-if="editing && inputComponent" to="#sefirot-modals">
      <div
        ref="editorEl"
        class="LensTableEditableCellEditor"
        :style="editorStyle"
        @keydown="onEditorKeydown"
      >
        <component :is="inputComponent" v-model="model" :validation="validation.input" />
        <div class="actions">
          <SButton size="mini" :label="t.cancel" @click="cancel" />
          <SButton size="mini" mode="info" :label="t.save" @click="apply" />
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

.value.link {
  color: var(--c-text-info-1);
  transition: color 0.1s;
}

.value.link:hover {
  color: var(--c-text-info-2);
}

.pills {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow: hidden;
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
