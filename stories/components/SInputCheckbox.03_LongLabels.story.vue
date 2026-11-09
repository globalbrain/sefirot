<script setup lang="ts">
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import SInputRadio from 'sefirot/components/SInputRadio.vue'
import { ref } from 'vue'

const title = 'Components / SInputCheckbox / 03. Long Labels'
const checked = ref(false)
const text = 'A long label should wrap within this narrow container without overlapping the next control or shrinking its indicator.'
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <div class="examples">
      <SInputCheckbox v-model="checked" :text />
      <SInputRadio v-model="checked" :text />
    </div>
  </Story>
</template>

<style scoped>
.examples {
  display: grid;
  gap: 24px;
  width: min(100%, 320px);
  padding: 16px;
}
</style>
