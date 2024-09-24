<script setup lang="ts">
import SDatePickerBase from 'sefirot/components/SDatePicker.vue'
import { now } from 'sefirot/support/Now'
import { reactive } from 'vue'

const title = 'Components / SDatePicker / 01. Playground'

const selected = reactive({ ...now })
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <template #default>
      <Board :title="title">
        <SDatePickerBase v-model="selected" />
      </Board>
    </template>
  </Story>
</template>
