<script setup lang="ts">
import IconTrash from '~icons/ph/trash'
import IconX from '~icons/ph/x'
import { computed, reactive, ref, watch } from 'vue'
import SButton from '../../../components/SButton.vue'
import SSheet from '../../../components/SSheet.vue'
import { provideDataListState } from '../../../composables/DataList'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { type FieldData } from '../FieldData'
import { useFieldFactory } from '../composables/FieldFactory'
import { useLensEdit } from '../composables/LensEdit'
import LensSheetField from './LensSheetField.vue'

const props = withDefaults(defineProps<{
  open: boolean
  mode?: 'view' | 'create'
  entity: string
  record?: Record<string, any> | null
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
  en: { create: 'Create', cancel: 'Cancel', delete: 'Delete', new_record: 'New record', deleting: 'Deleting…' },
  ja: { create: '作成', cancel: 'キャンセル', delete: '削除', new_record: '新規作成', deleting: '削除中…' }
})

const edit = useLensEdit()
const factory = useFieldFactory()

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
const createFieldViews = computed(() =>
  createFields.value.map((e) => ({
    key: e.key,
    component: e.field.formInputComponent()
  }))
)

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

const { validation, validate, reset } = useValidation(
  () => createModel,
  () => Object.fromEntries(createFields.value.map((e) => [e.key, e.field.generateValidationRules()]))
)

watch(
  () => [props.open, props.mode] as const,
  ([open, mode]) => {
    if (open && mode === 'create') {
      for (const { key, field } of createFields.value) {
        createModel[key] = field.inputEmptyValue()
      }
      reset()
    }
  },
  { immediate: true }
)

async function onCreate() {
  if (!(await validate())) {
    return
  }

  saving.value = true

  try {
    const values: Record<string, any> = {}
    for (const { key, field } of createFields.value) {
      values[key] = field.inputToPayload(createModel[key])
    }
    await edit!.create(values)
    emit('close')
  } finally {
    saving.value = false
  }
}

async function onDelete() {
  if (!props.record) {
    return
  }
  saving.value = true
  try {
    await edit!.remove(props.record)
    emit('close')
  } finally {
    saving.value = false
  }
}

// --- Slot context -----------------------------------------------------------
//
// Content passed to the `#before` / `#after` slots is declared in the page
// that hosts the catalog, so it cannot `inject` the edit context (which is
// provided inside `LensCatalog`, a child of that page). Expose the pieces a
// slot needs as slot props instead: the resolved record id, a record-bound
// partial `save`, and the entity key. This keeps the generic sheet free of
// one-off concerns (avatar upload, social links, linked records) while still
// letting a page implement them.

const resolvedId = computed(() =>
  props.record && edit ? edit.resolveId(props.record) : null
)

function saveRecord(values: Record<string, any>): Promise<void> {
  if (!props.record || !edit) {
    return Promise.resolve()
  }
  return edit.save(props.record, values)
}

const slotProps = computed(() => ({
  record: props.record ?? null,
  id: resolvedId.value,
  entity: props.entity,
  save: saveRecord
}))
</script>

<template>
  <SSheet :open :width="width ?? '480px'" @close="emit('close')">
    <div class="LensSheet">
      <div class="header">
        <div class="title">{{ title }}</div>
        <button class="close" type="button" aria-label="Close" @click="emit('close')">
          <IconX class="close-icon" />
        </button>
      </div>

      <div class="body">
        <slot name="before" v-bind="slotProps" />

        <template v-if="mode === 'view' && record">
          <div class="sheet-rows">
            <LensSheetField
              v-for="entry in detailFields"
              :key="entry.key"
              :field="entry.field"
              :field-key="entry.key"
              :record
            />
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
          <SButton size="medium" :label="t.cancel" :disabled="saving" @click="emit('close')" />
          <SButton size="medium" mode="info" :label="t.create" :loading="saving" @click="onCreate" />
        </template>
        <template v-else-if="record">
          <SButton size="medium" mode="danger" type="outline" :icon="IconTrash" :label="t.delete" :loading="saving" @click="onDelete" />
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

.close:hover {
  background-color: var(--c-bg-mute-1);
  color: var(--c-text-1);
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
</style>
