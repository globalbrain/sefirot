<script setup lang="ts">
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'
import { ref } from 'vue'

const on = ref(false)
</script>

<template>
  <Story title="Components / SInputSwitch">
    <SInputSwitch
      class="switch"
      name="input"
      label="Label"
      note="Note text"
      text="Text for the switch"
      help="This is a help text."
      v-model="on"
    />
  </Story>
</template>

<style scoped>
.switch {
  width: 192px;
}
</style>
