<script setup lang="ts">
import SDatePicker from 'sefirot/components/SDatePickerNew.vue'

const title = 'Components / SDatePicker / 01. Playground'
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <template #default>
      <Board :title="title">
        <SDatePicker />
      </Board>
    </template>
  </Story>
</template>
