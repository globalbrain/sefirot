<script setup lang="ts">
import { ref } from 'vue'
import SButtonGroup, { ButtonGroupItem } from 'sefirot/components/SButtonGroup.vue'

const value = ref('button-a')

const items: ButtonGroupItem[] = [
  { label: 'Button A', value: 'button-a' },
  { label: 'Button B', value: 'button-b' },
  { label: 'Button C', value: 'button-c' }
]
</script>

<template>
  <Story title="Components/SButtonGroup">
    <SButtonGroup
      v-model="value"
      :items="items"
    />
  </Story>
</template>

<docs lang="md">
# SButtonGroup

Button Group allow users to select one of the buttons. Similar checkboxes, but with look of buttons.
</docs>
