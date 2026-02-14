<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { computed, markRaw } from 'vue'
import { type FieldData } from '../FieldData'
import { useFieldFactory } from '../composables/FieldFactory'

const props = defineProps<{
  name: string
  field: FieldData
  override: Partial<FieldData>
}>()

const emit = defineEmits<{
  cancel: []
  saved: [field: Partial<FieldData>]
}>()

const fieldFactory = useFieldFactory()

const _field = cloneDeep(props.field)
const _overrides = cloneDeep(props.override)

const override = Object.assign(_field, _overrides) as any

const fieldInstance = fieldFactory.make(props.field)

const formComponent = computed(() => {
  return markRaw(fieldInstance.overrideForm())
})

async function onSave(override: Partial<FieldData>) {
  emit('saved', override)
}
</script>

<template>
  <component
    :is="formComponent"
    :name
    :field
    :override
    @saved="onSave"
    @cancel="$emit('cancel')"
  />
</template>
