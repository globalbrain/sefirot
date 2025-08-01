<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { ref } from 'vue'

const title = 'Components / SInputDate / 01. Playground'

const value = ref(null)

function initState() {
  return {
    size: 'md'
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          sm: 'sm',
          md: 'md'
        }"
        v-model="state.size"
      />
      <HstSelect
        title="tabindex"
        :options="[0, -1]"
        v-model="state.tabindex"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <SInputDate
          label="Label"
          :size="state.size"
          :tabindex="state.tabindex"
          v-model="value"
        />
      </Board>
    </template>
  </Story>
</template>
