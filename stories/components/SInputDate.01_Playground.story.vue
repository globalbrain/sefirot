<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { ref } from 'vue'

const title = 'Components / SInputDate / 01. Playground'

const value = ref(null)
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <SInputDate
        label="Label"
        info="Some helpful information."
        note="Note text"
        text="Text for the checkbox"
        help="This is a help text."
        v-model="value"
      />
    </Board>
  </Story>
</template>
