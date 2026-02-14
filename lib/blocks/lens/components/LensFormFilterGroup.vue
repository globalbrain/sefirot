<script setup lang="ts">
import IconPlusCircle from '~icons/ph/plus-circle'
import IconTrash from '~icons/ph/trash'
import SButton from '../../../components/SButton.vue'
import { type Option } from '../../../components/SInputDropdown.vue'
import SInputSegments from '../../../components/SInputSegments.vue'
import { useTrans } from '../../../composables/Lang'
import { type FieldData } from '../FieldData'
import LensFormFilterCondition, { type FilterCondition } from './LensFormFilterCondition.vue'

export interface Props {
  fields: Record<string, FieldData>
  fieldOptions: Option[]
  isRoot: boolean
  canRemove: boolean
}

export interface FilterGroup {
  connector: '$and' | '$or'
  conditions: (FilterCondition | FilterGroup)[]
}

defineProps<Props>()

const model = defineModel<FilterGroup>({ required: true })

defineEmits<{
  remove: []
}>()

const { t } = useTrans({
  en: {
    a_add_condition: 'Add condition',
    a_add_group: 'Add group'
  },
  ja: {
    a_add_condition: '条件を追加',
    a_add_group: 'グループを追加'
  }
})

const connectorOptions = [
  { label: 'AND', value: '$and' },
  { label: 'OR', value: '$or' }
]

function createEmptyGroup() {
  return {
    connector: '$and',
    conditions: [
      { field: null, operator: null, value: null }
    ]
  } as FilterGroup
}

function onAddCondition() {
  model.value.conditions.push({
    field: null,
    operator: null,
    value: null
  })
}

function onRemoveCondition(index: number) {
  model.value.conditions.splice(index, 1)
}

function onAddGroup() {
  model.value.conditions.push(createEmptyGroup())
}
</script>

<template>
  <div class="LensFormFilterGroup" :class="{ 'is-root': isRoot }">
    <div v-if="!isRoot" class="header">
      <SInputSegments
        v-model="model.connector"
        size="mini"
        :options="connectorOptions"
      />
      <SButton
        v-if="canRemove"
        type="text"
        size="small"
        mode="mute"
        :icon="IconTrash"
        @click="$emit('remove')"
      />
    </div>
    <div class="conditions">
      <template v-for="c, i in model.conditions" :key="i">
        <LensFormFilterGroup
          v-if="(c as FilterGroup).connector"
          v-model="(model.conditions[i] as FilterGroup)"
          :fields
          :field-options
          :can-remove="model.conditions.length > 1"
          :is-root="false"
          @remove="onRemoveCondition(i)"
        />
        <LensFormFilterCondition
          v-else
          v-model="(model.conditions[i] as FilterCondition)"
          :fields
          :field-options
          :can-remove="model.conditions.length > 1"
          @remove="onRemoveCondition(i)"
        />
      </template>
    </div>
    <div class="actions">
      <SButton
        type="outline"
        size="small"
        mode="mute"
        :icon="IconPlusCircle"
        :label="t.a_add_condition"
        @click="onAddCondition"
      />
      <SButton
        type="outline"
        size="small"
        mode="mute"
        :icon="IconPlusCircle"
        :label="t.a_add_group"
        @click="onAddGroup"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.LensFormFilterGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  padding: 8px;

  &:hover:not(:has(.LensFormSearchGroup:hover)) {
    border-color: var(--c-border-info-1);
  }

  &.is-root {
    border: 0;
    padding: 0;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.conditions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.groups {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.actions {
  display: flex;
  gap: 8px;
}
</style>
