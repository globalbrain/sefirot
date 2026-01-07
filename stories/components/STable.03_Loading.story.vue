<script setup lang="ts">
import { ref } from 'vue'
import STableLoadingExample from './STableLoadingExample.vue'

const title = 'Components / STable / 03. Loading'
const docs = '/components/table'

const delay = ref(300)
</script>

<template>
  <Story :title :docs source="Not available" auto-props-disabled>
    <template #controls>
      <HstSlider
        v-model="delay"
        title="loading delay (ms)"
        :min="0"
        :max="8000"
        :step="100" />
    </template>
    <Board :title :docs>
      <STableLoadingExample :loading-delay="delay" />
    </Board>
  </Story>
</template>
