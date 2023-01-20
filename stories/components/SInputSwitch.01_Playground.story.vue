<script setup lang="ts">
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'
import { ref } from 'vue'

const on = ref(false)
</script>

<template>
  <Board
    title="Components / SInputSwitch / 01. Playground"
  >
    <SInputSwitch
      class="switch"
      name="input"
      label="Label"
      info="Some helpful information."
      note="Note text"
      text="Text for the switch"
      help="This is a help text."
      v-model="on"
    />
  </Board>
</template>

<style scoped>
.switch {
  width: 192px;
}
</style>
