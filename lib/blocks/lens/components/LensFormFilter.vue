<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '../../../composables/Data'
import { useLang, useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { type FieldData } from '../FieldData'
import { useFieldFactory } from '../composables/FieldFactory'
import { type FilterCondition } from './LensFormFilterCondition.vue'
import LensFormFilterGroup, { type FilterGroup } from './LensFormFilterGroup.vue'

const props = defineProps<{
  fields: Record<string, FieldData>
  filters: any[]
  filterable: string[]
}>()

const emit = defineEmits<{
  cancel: []
  apply: [filters: any[]]
}>()

const lang = useLang()

const { t } = useTrans({
  en: {
    title: 'Advanced search',
    a_add_group: 'Add group',
    a_cancel: 'Cancel',
    a_apply: 'Apply filters'
  },
  ja: {
    title: '詳細検索',
    a_add_group: 'グループを追加',
    a_cancel: 'キャンセル',
    a_apply: 'フィルターを適用'
  }
})

const fieldFactory = useFieldFactory()

const { data } = useData({
  group: lensFiltersToGroup()
})

const { validateAndNotify } = useValidation()

// Create field options for the filter dropdown based on the provided
// `filterable` props here and pass down so that we only have to
// computed this once.
const fieldOptions = computed(() => {
  return props.filterable.filter((key) => {
    const fieldData = props.fields[key]
    const field = fieldFactory.make(fieldData)
    return field.availableFilterOperators().length > 0
  }).map((key) => {
    const field = props.fields[key]
    return {
      label: lang === 'ja' ? field.labelJa : field.labelEn,
      value: key
    }
  })
})

// Converts the provided filters to the `FilterGroup` structure by wrapping
// filters into implicit `$and` group. This way we can use the
// `LensFormSearchGroup` component from the root level.
//
// This will convert the filters like this:
//
// input:
// [
//   ['company_id', '=', 123],
//   ['opportunity_id', '!=', 456]
// ]
//
// output:
// {
//   connector: '$and',
//   conditions: [
//     { field: 'company_id', operator: '=', value: 123 },
//     { field: 'opportunity_id', operator: '!=', value: 456 }
//   ]
// }
function lensFiltersToGroup() {
  return {
    connector: '$and' as const,
    conditions: props.filters.length > 0
      ? props.filters.map(lensConditionToCondition)
      : [createEmptyCondition()]
  }
}

function lensConditionToCondition(filter: any[]) {
  const fieldOrConnector = filter[0]

  if (fieldOrConnector === '$and' || fieldOrConnector === '$or') {
    return {
      connector: fieldOrConnector,
      conditions: filter[1].map(lensConditionToCondition)
    }
  }

  return {
    field: filter[0],
    operator: filter[1],
    value: filter[2] ?? null
  }
}

function createEmptyCondition() {
  return { field: null, operator: null, value: null }
}

function groupToLensFilters(conditions: (FilterGroup | FilterCondition)[]): any[] {
  return conditions.map((c) => {
    if ('connector' in c) {
      return [c.connector, groupToLensFilters(c.conditions)]
    }
    return [c.field, c.operator, c.value]
  })
}

async function onApply() {
  if (await validateAndNotify()) {
    emit('apply', groupToLensFilters(data.value.group.conditions))
  }
}
</script>

<template>
  <SCard class="LensFormFilters" size="xlarge">
    <SCardBlock class="s-p-32">
      <SDoc>
        <SContent>
          <h2>{{ t.title }}</h2>
        </SContent>
        <LensFormFilterGroup
          v-model="data.group"
          :fields
          :field-options
          is-root
          :can-remove="false"
        />
      </SDoc>
    </SCardBlock>
    <SCardBlock class="s-py-16 s-px-32">
      <SControl size="md">
        <SControlRight>
          <SControlButton
            :label="t.a_cancel"
            @click="$emit('cancel')"
          />
          <SControlButton
            mode="info"
            :label="t.a_apply"
            @click="onApply"
          />
        </SControlRight>
      </SControl>
    </SCardBlock>
  </SCard>
</template>

<style scoped lang="postcss">
.LensFormFilters {
  --c-bg-elv-2: var(--c-bg-1);
  --c-bg-elv-3: var(--c-bg-1);
}
</style>
