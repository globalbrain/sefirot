<script setup lang="ts">
import IconTrash from '~icons/ph/trash'
import IconX from '~icons/ph/x'
import { computed, reactive, ref, watch } from 'vue'
import SButton from '../../../components/SButton.vue'
import SSheet from '../../../components/SSheet.vue'
import SSpinner from '../../../components/SSpinner.vue'
import { provideDataListState } from '../../../composables/DataList'
import { useTrans } from '../../../composables/Lang'
import { usePower } from '../../../composables/Power'
import { useValidation } from '../../../composables/Validation'
import { useSnackbars } from '../../../stores/Snackbars'
import { type FieldData } from '../FieldData'
import { type LensCreateExtension } from '../LensCreateExtension'
import { useFieldFactory } from '../composables/FieldFactory'
import { useLensEdit } from '../composables/LensEdit'
import { extractServerErrors, extractServerMessage } from '../validation/ServerErrors'
import LensSheetAvatarField from './LensSheetAvatarField.vue'
import LensSheetField from './LensSheetField.vue'

const props = withDefaults(defineProps<{
  open: boolean
  mode?: 'view' | 'create'
  entity: string
  record?: Record<string, any> | null
  // Whether the record's full detail is still loading via `/show`. While true,
  // the view body shows a spinner instead of partial fields.
  loading?: boolean
  // Whether the detail load failed. When true, the view body shows an error
  // (asking the user to reload) instead of a partial record.
  error?: boolean
  fields: Record<string, FieldData>
  indexField?: string
  width?: string
}>(), {
  mode: 'view',
  indexField: 'id'
})

const emit = defineEmits<{
  close: []
}>()

const { t } = useTrans({
  en: {
    create: 'Create',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm_delete: 'Delete this record?',
    new_record: 'New record',
    load_error:
      'We couldn’t load this record. Please reload the page and try again.'
  },
  ja: {
    create: '作成',
    cancel: 'キャンセル',
    delete: '削除',
    confirm_delete: 'このレコードを削除しますか？',
    new_record: '新規作成',
    load_error:
      'このレコードを読み込めませんでした。ページを再読み込みして、もう一度お試しください。'
  }
})

const edit = useLensEdit()
const factory = useFieldFactory()
const snackbars = useSnackbars()

// Provide the data-list label width directly (instead of wrapping rows in
// SDataList) so each LensSheetField wrapper doesn't make its SDataListItem a
// `:first-child`, which would otherwise double SDataList's dashed dividers.
provideDataListState({ labelWidth: computed(() => '160px') })

const entries = computed(() =>
  Object.entries(props.fields).map(([key, fieldData]) => ({
    key,
    fieldData,
    field: factory.make(fieldData)
  }))
)

const detailFields = computed(() => entries.value.filter((e) => e.fieldData.showOnDetail !== false))
const createFields = computed(() => entries.value.filter((e) => e.fieldData.showOnCreate === true))

// Materialize the create-form input components once per field set. Calling
// `formInputComponent()` inline in the template would mint a brand-new
// component definition on every render, which breaks Vue's component patching
// (`instance.update is not a function`).
//
// Some field types don't implement a form input (they `throw new
// Error('Not implemented.')`); resolve defensively and drop those from the
// form rather than letting one unsupported field crash the create sheet.
const createFieldViews = computed(() =>
  createFields.value
    .map((e) => ({ key: e.key, field: e.field, component: resolveInput(e.field) }))
    .filter((v) => v.component != null)
)

// The subset of create views that actually contribute a value. Display-only
// fields (e.g. a `content` field showing instructions) still render, but
// `formInputComponent()` returns static markup with no value, so they must not
// be seeded, validated, or submitted. An avatar field is submittable (its `File`
// rides the create payload as a multipart part), so it's seeded and validated
// here like any other input.
const createInputViews = computed(() =>
  createFieldViews.value.filter((v) => v.field.isSubmittable())
)

function resolveInput(field: { formInputComponent: () => any }): any {
  try {
    return field.formInputComponent()
  } catch {
    return null
  }
}

const title = computed(() => {
  if (props.mode === 'create') {
    return t.new_record
  }
  const id = props.record?.[props.indexField]
  return (id && typeof id === 'object' ? id.display : id) ?? ''
})

// --- Create mode form state ---

const createModel = reactive<Record<string, any>>({})
const saving = ref(false)

// Whether creation is currently permitted. Reactive (a getter on the injected
// edit context) so the Create button disables if `creatable` flips off after the
// sheet opened; `onCreate` re-checks it too.
const creatable = computed(() => !!edit?.creatable)

// Whether the open record may be deleted. Reactive (a getter on the edit
// context) so the delete button hides if a per-record `deletable` predicate, or
// a permission change, rejects it after the sheet has opened.
const deletable = computed(() => !!props.record && !!edit?.canDelete(props.record))

// Backend-only validation errors (e.g. `unique`) returned by a rejected
// create, fed to Vuelidate via `$externalResults` so they surface on the
// offending field. The create form's keys are the bare field keys, matching
// the 422 error keys 1:1.
const serverErrors = ref<Record<string, string[]>>({})

const { validation, validate, reset } = useValidation(
  () => createModel,
  () => Object.fromEntries(
    createInputViews.value.map((e) => [e.key, e.field.generateValidationRules()])
  ),
  { $externalResults: serverErrors }
)

const confirmingDelete = usePower()

// Latch for the confirmed delete (see onDelete). Reset only when the sheet
// (re)opens — not on close — so a double-click during the close transition stays
// blocked.
const deleting = ref(false)

watch(
  () => [props.open, props.mode, props.record] as const,
  ([open, mode]) => {
    // Reset the delete confirmation whenever the sheet opens, switches mode, or
    // is reused for a different record.
    confirmingDelete.off()
    if (open) {
      deleting.value = false
    }
    if (open && mode === 'create') {
      for (const { key, field } of createInputViews.value) {
        createModel[key] = field.inputEmptyValue()
      }
      serverErrors.value = {}
      reset()
    }
  },
  { immediate: true }
)

// Create-form extensions registered by sheet slots (`#before` / `#after`) — a
// page's custom inputs that aren't Lens fields (e.g. social links written
// server-side alongside the record). On submit each is run to validate its own
// inputs and contribute extra keys to the create payload. Registered on mount and
// disposed on unmount; the create slot content unmounts with the sheet, so a
// component-lifecycle cleanup keeps this empty between creates.
const createExtensions = new Set<LensCreateExtension>()

function registerCreateExtension(extension: LensCreateExtension): () => void {
  createExtensions.add(extension)
  return () => { createExtensions.delete(extension) }
}

async function onCreate() {
  // Guard re-entry: set `saving` before the first await so a fast double-click on
  // Create can't start a second submission (and create a duplicate record) while
  // the first call's validation is still pending.
  if (saving.value) {
    return
  }
  // Re-check creation is still permitted: `openCreate()`'s guard runs once, so if
  // `creatable` flipped off after the sheet opened (async permission change, a
  // parent disabling creation), the context no longer allows it. Close instead of
  // POSTing a create the server would reject anyway. The Create button is also
  // disabled in this state; this guards a flip between render and click.
  if (!edit?.creatable) {
    emit('close')
    return
  }
  saving.value = true
  serverErrors.value = {}

  try {
    // Validate the built-in fields and every registered slot extension, running
    // them all even when something already failed, so each section surfaces its
    // own errors on a single submit rather than one at a time. A valid extension
    // contributes extra keys to the payload; any failure aborts the create.
    const fieldsValid = await validate()
    const contributions: Record<string, any>[] = []
    let extensionsValid = true
    for (const extend of createExtensions) {
      const { valid, values } = await extend()
      if (valid) {
        contributions.push(values)
      } else {
        extensionsValid = false
      }
    }
    if (!fieldsValid || !extensionsValid) {
      return
    }
    const values: Record<string, any> = {}
    for (const { key, field } of createInputViews.value) {
      values[key] = field.inputToPayload(createModel[key])
    }
    // Merge each extension's contribution (e.g. `social_links`) into the payload.
    for (const extra of contributions) {
      Object.assign(values, extra)
    }
    // A picked avatar `File` rides `values`; `edit.create` sends the payload
    // multipart when one is present, so the avatar persists with the new record.
    await edit!.create(values)
    emit('close')
  } catch (e) {
    // Surface backend validation errors (e.g. a duplicate `unique` value) on the
    // offending fields. Failing that, surface a server-provided message (a policy
    // / business-rule deny, or a form-level 422) as a snackbar and keep the sheet
    // open with the input intact — rather than rethrowing into the global
    // full-page error handler. Failures without a displayable message — network,
    // 5xx, opaque, and auth / session expiry (which extractServerMessage excludes
    // so the app can prompt re-auth) — still propagate.
    const errors = extractServerErrors(e)
    if (errors) {
      serverErrors.value = errors
      return
    }
    const message = extractServerMessage(e)
    if (message) {
      snackbars.push({ mode: 'danger', text: message })
      return
    }
    throw e
  } finally {
    saving.value = false
  }
}

function onDelete() {
  // Latch so a fast double-click — before the sheet's leave transition unmounts
  // the panel — can't run twice and queue a second DELETE for the same record (a
  // non-idempotent backend would then show a failure snackbar after the first
  // delete already succeeded). Reset when the sheet next opens.
  if (!props.record || deleting.value) {
    return
  }
  deleting.value = true
  // Optimistic: the row is removed immediately and the delete is persisted in
  // the background, so close right away.
  edit!.remove(props.record)
  emit('close')
}

// Block closing while a create is in flight. The create POST is blocking and
// slow; closing mid-save would dismiss the sheet while `creating` keeps the
// catalog controls interactive (create isn't part of the busy lock), letting
// the user submit a duplicate record or start an edit the create's follow-up
// refresh could overwrite. The backdrop/Escape paths are gated via SSheet's
// `closable` prop; this guards the explicit close button (and any stray emit).
function requestClose() {
  if (saving.value) {
    return
  }
  emit('close')
}

// --- Slot context -----------------------------------------------------------
//
// Content passed to the `#before` / `#after` slots is declared in the page
// that hosts the catalog, so it cannot `inject` the edit context (which is
// provided inside `LensCatalog`, a child of that page). Expose the pieces a
// slot needs as slot props instead: the resolved record id, a record-bound
// partial `save`, the entity key, the sheet `mode` (so a slot can render
// different content for create vs view), and `registerCreateExtension` (so a
// create-mode slot can contribute extra keys to the create payload). This keeps
// the generic sheet free of one-off concerns (avatar upload, social links,
// linked records) while still letting a page implement them.

const resolvedId = computed(() => (props.record && edit ? edit.resolveId(props.record) : null))

function saveRecord(values: Record<string, any>): Promise<void> {
  // Refuse to save until the full record has loaded. The slots render before the
  // `loading` / `error` branch (so a `#before` header can show during the load),
  // but saving against the partial row mid-`/show` (or after it failed) could
  // overwrite a not-yet-loaded detail field with an empty value — the built-in
  // fields avoid this by not rendering until the record is ready.
  //
  // Also honor the per-record edit gate: a custom slot editor funnels through
  // here, so a row a `editable` predicate rejects must not be saved through the
  // slot any more than through the built-in cell / field editors.
  if (props.loading || props.error || !props.record || !edit || !edit.canEdit(props.record)) {
    return Promise.resolve()
  }
  edit.save(props.record, values)
  return Promise.resolve()
}

const slotProps = computed(() => ({
  record: props.record ?? null,
  id: resolvedId.value,
  entity: props.entity,
  // The sheet's current mode, so a slot can branch its content (e.g. show
  // editable inputs only while creating, and a read/edit view otherwise).
  mode: props.mode,
  // Surfaced so custom editors can disable their save controls until the full
  // record has loaded; `save` also hard-refuses while loading/error as a guard.
  loading: props.loading ?? false,
  error: props.error ?? false,
  // Whether a per-record `editable` predicate allows editing this row, so a slot
  // editor can disable its own controls for a rejected row; `save` enforces it
  // regardless, but otherwise the refusal is only visible as a silent no-op.
  canEdit: !!props.record && !!edit?.canEdit(props.record),
  save: saveRecord,
  // Let a create-mode slot register inputs that contribute extra keys to the
  // create payload (see LensCreateExtension). Stable identity; a no-op in view
  // mode (a slot only registers while the create form is shown).
  registerCreateExtension
}))
</script>

<template>
  <SSheet :open :closable="!saving" :width="width ?? '480px'" @close="requestClose">
    <div class="LensSheet">
      <div class="header">
        <div class="title">{{ title }}</div>
        <button
          class="close"
          type="button"
          aria-label="Close"
          :disabled="saving"
          @click="requestClose"
        >
          <IconX class="close-icon" />
        </button>
      </div>

      <div class="body">
        <slot name="before" v-bind="slotProps" />

        <template v-if="mode === 'view' && record">
          <div v-if="loading" class="sheet-loading">
            <SSpinner class="sheet-loading-spinner" />
          </div>
          <div v-else-if="error" class="sheet-error">
            {{ t.load_error }}
          </div>
          <div v-else class="sheet-rows">
            <template v-for="entry in detailFields" :key="entry.key">
              <LensSheetAvatarField
                v-if="entry.fieldData.type === 'avatar'"
                :field="entry.field"
                :field-key="entry.key"
                :record
              />
              <LensSheetField
                v-else
                :field="entry.field"
                :field-key="entry.key"
                :record
              />
            </template>
          </div>
        </template>

        <template v-else-if="mode === 'create'">
          <div class="create-form">
            <component
              :is="view.component"
              v-for="view in createFieldViews"
              :key="view.key"
              v-model="createModel[view.key]"
              :validation="validation[view.key]"
            />
          </div>
        </template>

        <slot name="after" v-bind="slotProps" />
      </div>

      <div class="footer">
        <template v-if="mode === 'create'">
          <SButton size="medium" :label="t.cancel" :disabled="saving" @click="requestClose" />
          <SButton
            size="medium"
            mode="info"
            :label="t.create"
            :loading="saving"
            :disabled="!creatable"
            @click="onCreate"
          />
        </template>
        <template v-else-if="record && !loading && !error && deletable">
          <template v-if="confirmingDelete.state.value">
            <span class="confirm-text">{{ t.confirm_delete }}</span>
            <SButton size="medium" :label="t.cancel" @click="confirmingDelete.off" />
            <SButton size="medium" mode="danger" :label="t.delete" @click="onDelete" />
          </template>
          <SButton
            v-else
            size="medium"
            mode="danger"
            type="outline"
            :icon="IconTrash"
            :label="t.delete"
            @click="confirmingDelete.on"
          />
        </template>
      </div>
    </div>
  </SSheet>
</template>

<style scoped lang="postcss">
.LensSheet {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--c-bg-1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--c-divider);
}

.title {
  font-size: 16px;
  font-weight: 500;
  font-feature-settings: "tnum";
  color: var(--c-text-1);
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: var(--c-text-2);
  transition: background-color 0.1s, color 0.1s;
}

.close:hover:not(:disabled) {
  background-color: var(--c-bg-mute-1);
  color: var(--c-text-1);
}

.close:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.close-icon {
  width: 18px;
  height: 18px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
  padding: 16px 24px;
  overflow-y: auto;
}

.sheet-rows {
  border-top: 1px dashed var(--c-divider);
}

.sheet-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}

.sheet-loading-spinner {
  width: 28px;
  height: 28px;
  color: var(--c-text-2);
}

.sheet-error {
  padding: 24px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-text-2);
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid var(--c-divider);
}

.footer:empty {
  display: none;
}

.confirm-text {
  margin-right: auto;
  font-size: 13px;
  color: var(--c-text-2);
}
</style>
