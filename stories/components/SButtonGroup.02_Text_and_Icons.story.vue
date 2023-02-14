<script setup lang="ts">
import IconArrowDown from '@iconify-icons/ph/arrow-down-bold'
import IconArrowUp from '@iconify-icons/ph/arrow-up-bold'
import SButtonGroup, { ButtonGroupItem } from 'sefirot/components/SButtonGroup.vue'
import { ref } from 'vue'

const current = ref(0)

const items: ButtonGroupItem[] = [
  { icon: IconArrowUp, value: 1 },
  { icon: IconArrowDown, value: -1 }
]

function handleClick(value: string | number) {
  current.value = current.value + Number(value)
}
</script>

<template>
  <Board
    title="Components / SButtonGroup / 02. Text"
  >
    <SButtonGroup
      :items="items"
      before-text="Score"
      :after-text="current"
      @click="handleClick"
    />
  </Board>
</template>
