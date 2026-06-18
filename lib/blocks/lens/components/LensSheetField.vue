<script setup lang="ts">
import IconPencilSimple from '~icons/ph/pencil-simple'
import { computed, ref } from 'vue'
import SButton from '../../../components/SButton.vue'
import SDataListItem from '../../../components/SDataListItem.vue'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
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

const editable = computed(() => !!edit && (props.field as any).data?.showOnUpdate === true)

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
// static markup with no value, so they must not gain an edit affordance.
const canEdit = computed(() => editable.value && !!inputComponent.value && props.field.isSubmittable())

const editing = ref(false)
const model = ref<any>(null)

const { validation, validate, reset } = useValidation(
  () => ({ input: model.value }),
  () => ({ input: props.field.generateValidationRules() })
)

function start() {
  const raw = props.record[props.fieldKey]
  model.value = props.field.payloadToInput(raw ?? props.field.inputEmptyValue())
  reset()
  editing.value = true
}

function cancel() {
  editing.value = false
}

async function apply() {
  // Client-side validation only (required, length, …). Server-only rules such
  // as `unique` are enforced by the background write, which surfaces a snackbar
  // on rejection.
  if (!(await validate())) {
    return
  }

  // Optimistic: patch + persist in the background, then close immediately.
  edit!.save(props.record, {
    [props.fieldKey]: props.field.inputToPayload(model.value)
  })
  editing.value = false
}
</script>

<template>
  <div class="LensSheetField" :class="{ editing }">
    <div v-if="!editing" class="display">
      <component :is="displayComponent" v-if="displayComponent" :value="record[fieldKey]" />
      <SDataListItem v-else>
        <template #label>{{ field.label() }}</template>
        <template v-if="displayValue !== null" #value>{{ displayValue }}</template>
      </SDataListItem>
      <button
        v-if="canEdit"
        class="edit"
        type="button"
        :aria-label="`${t.edit} ${field.label()}`"
        @click="start"
      >
        <IconPencilSimple class="edit-icon" />
      </button>
    </div>

    <div v-else class="form">
      <component :is="inputComponent" v-model="model" :validation="validation.input" />
      <div class="actions">
        <SButton size="mini" :label="t.cancel" @click="cancel" />
        <SButton size="mini" mode="info" :label="t.apply" @click="apply" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.LensSheetField {
  position: relative;
  border-bottom: 1px dashed var(--c-divider);
}

.form {
  padding: 8px 0;
}

.display {
  position: relative;
}

.edit {
  position: absolute;
  top: 10px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--c-text-2);
  opacity: 0;
  transition: opacity 0.1s, background-color 0.1s, color 0.1s;
}

.LensSheetField:hover .edit {
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}
</style>
