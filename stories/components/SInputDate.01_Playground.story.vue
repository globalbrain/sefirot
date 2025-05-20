<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { ref } from 'vue'

const title = 'Components / SInputDate / 01. Playground'

const value = ref(null)

function state() {
  return {
    size: 'small'
  }
}
</script>

<template>
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium'
        }"
        v-model="state.size"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <SInputDate
          label="Label"
          :size="state.size"
          info="Some helpful information."
          note="Note text"
          text="Text for the checkbox"
          help="This is a help text."
          v-model="value"
        />
      </Board>
    </template>
  </Story>
</template>
