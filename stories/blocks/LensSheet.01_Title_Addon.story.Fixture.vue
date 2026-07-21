<script setup lang="ts">
import { type FieldData, type TextFieldData } from 'sefirot/blocks/lens/FieldData'
import LensSheet from 'sefirot/blocks/lens/components/LensSheet.vue'
import { useSetupLens } from 'sefirot/blocks/lens/composables/SetupLens'
import SButton from 'sefirot/components/SButton.vue'
import SPill from 'sefirot/components/SPill.vue'
import { ref } from 'vue'

const open = ref(true)

useSetupLens()

function textField(key: string, label: string): TextFieldData {
  return {
    type: 'text',
    key,
    labelEn: label,
    labelJa: label,
    filterKey: key,
    sortable: false,
    freeze: false,
    width: 160,
    required: false,
    rules: [],
    showOnDetail: true,
    placeholderEn: null,
    placeholderJa: null,
    helpEn: null,
    helpJa: null,
    unitBefore: null,
    unitAfter: null
  }
}

const fields: Record<string, FieldData> = {
  category: textField('category', 'Category'),
  maintainer: textField('maintainer', 'Maintainer'),
  summary: textField('summary', 'Summary'),
  updatedAt: textField('updatedAt', 'Last updated')
}

const record = {
  id: { value: 42, display: 'Designing resilient interfaces' },
  category: 'Design systems',
  maintainer: 'Documentation team',
  summary: 'A practical guide to building flexible, accessible components for evolving products.',
  updatedAt: 'July 18, 2026'
}
</script>

<template>
  <SButton label="Open sheet" @click="open = true" />

  <LensSheet
    :open
    entity="documents"
    :record
    :fields
    width="760px"
    @close="open = false"
  >
    <template #title-after>
      <SPill size="mini" label="Featured" />
    </template>
  </LensSheet>
</template>
