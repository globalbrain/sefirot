<script setup lang="ts">
import SButtonGroup, { ButtonGroupItem } from 'sefirot/components/SButtonGroup.vue'
import { ref } from 'vue'

const value = ref('button-a')

const items: ButtonGroupItem[] = [
  { label: 'Button A', value: 'button-a' },
  { label: 'Button B', value: 'button-b' },
  { label: 'Button C', value: 'button-c' }
]
</script>

<template>
  <Board
    title="Components / SButtonGroup / 01. Playground"
  >
    <SButtonGroup :items="items" v-model="value" />
  </Board>
</template>
