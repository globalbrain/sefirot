<script setup lang="ts">
import IconTrash from '~icons/ph/trash'
import { type Ref, computed, markRaw, ref, watch } from 'vue'
import SButton from '../../../components/SButton.vue'
import SInputDropdown, { type Option } from '../../../components/SInputDropdown.vue'
import SSpinner from '../../../components/SSpinner.vue'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { required } from '../../../validation/rules'
import { type FieldData } from '../FieldData'
import { type FilterOperator, FilterOperatorOptionDict } from '../FilterOperator'
import { useFieldFactory } from '../composables/FieldFactory'
import { type FilterInput } from '../filter-inputs/FilterInput'

export interface Props {
  fields: Record<string, FieldData>
  fieldOptions: Option[]
  canRemove: boolean
}

export interface FilterCondition {
  field: string | null
  operator: FilterOperator | null
  value: any
}

const props = defineProps<Props>()

const model = defineModel<FilterCondition>({ required: true })

defineEmits<{
  remove: []
}>()

const { t } = useTrans({
  en: {
    i_field_ph: 'Select a field'
  },
  ja: {
    i_field_ph: '項目を選択してください'
  }
})

const fieldFactory = useFieldFactory()

const field = computed(() => {
  if (!model.value.field) {
    return null
  }
  const fieldData = props.fields[model.value.field]
  return fieldFactory.make(fieldData)
})

const operatorOptions = computed(() => {
  return field.value?.availableFilterOperators().map((op) => {
    return FilterOperatorOptionDict[op]
  }) ?? []
})

const input = ref(null) as Ref<FilterInput | null>

const inputComponent = computed(() => {
  return input.value ? markRaw(input.value.component()) : null
})

const { validation, reset: resetValidation } = useValidation(() => ({
  field: model.value.field,
  operator: model.value.operator,
  value: model.value.value
}), () => ({
  field: { required: required() },
  operator: { required: required() },
  value: input.value ? input.value.rules() : {}
}))

resolveInput()

// Handle field selection changes.
//
// When the field is selected, only then we can know what operators are
// available, and what input to show. So here, we watch for changes to
// the field, then resolve the operators and input accordingly.
watch(() => model.value.field, () => {
  // When field changed, but operator is not set, set the first available
  // operator. This happens when the user selects a field for the first time.
  if (model.value.operator === null) {
    model.value.operator = operatorOptions.value[0]?.value || null
  }

  // Next, now it means that the user had operator selected already, and the
  // field has changed. In this case check if the new field has the operator
  // available. If not, reset the operator to the first available one.
  if (!operatorOptions.value.some((o) => o.value === model.value.operator)) {
    model.value.operator = operatorOptions.value[0]?.value || null
  }

  // Finally, resolve the input for the new field.
  resolveInput()
})

// Resolve the input when the operator changes.
watch(() => model.value.operator, () => {
  resolveInput()
})

// We have to cast the input value to the correct type when the input changes.
//
// For example, when filtering select input, and at first the user setups
// single select value filter: ['status', '=', 'open'].
//
// Then, user changes the operator to multi select: ['status', 'in', 'open'].
// Now, the value must be converted to array: ['status', 'in', ['open']].
//
// We do this by calling the `castValue` method of the input component.
watch(input, (newInput) => {
  if (newInput) {
    model.value.value = newInput.castValue(model.value.value)
  }
  resetValidation()
})

async function resolveInput() {
  if (!field.value || !model.value.operator) {
    input.value = null
    return
  }
  input.value = field.value.filterInputByOperator(model.value.operator)
}
</script>

<template>
  <div class="LensFormSearchCondition">
    <div class="field">
      <SInputDropdown
        v-model="model.field"
        size="mini"
        :placeholder="t.i_field_ph"
        :options="fieldOptions"
        :validation="validation.field"
        hide-error
      />
    </div>
    <div class="operator">
      <div v-if="!model.operator" class="skeleton" />
      <SInputDropdown
        v-else
        v-model="model.operator"
        size="sm"
        :options="operatorOptions"
        :validation="validation.operator"
        hide-error
      />
    </div>
    <div class="value">
      <div v-if="input === null" class="skeleton" />
      <Suspense v-else :key="model.field ?? '__empty__'">
        <component :is="inputComponent" v-model="model.value" />
        <template #fallback>
          <div class="resolving">
            <SSpinner class="spinner" />
          </div>
        </template>
      </Suspense>
    </div>
    <div class="remove">
      <SButton
        v-if="canRemove"
        type="text"
        size="small"
        mode="mute"
        :icon="IconTrash"
        @click="$emit('remove')"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.LensFormSearchCondition {
  display: grid;
  grid-template-columns: 256px 160px minmax(0, 1fr) 32px;
  gap: 8px;
  width: 100%;
}

.skeleton {
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  height: 32px;
}

.resolving {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  height: 32px;
}

.spinner {
  width: 24px;
  height: 24px;
}
</style>
