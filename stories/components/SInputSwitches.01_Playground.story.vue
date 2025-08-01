<script setup lang="ts">
import SInputSwitches from 'sefirot/components/SInputSwitches.vue'
import { ref } from 'vue'

const title = 'Components / SInputSwitches / 01. Playground'

const data = ref([2])

const options = [
  { label: 'Switch 1', value: 1 },
  { label: 'Switch 2', value: 2 },
  { label: 'Switch 3', value: 3 }
]
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title>
      <SInputSwitches
        class="switches"
        size="md"
        name="input"
        label="Label"
        info="Some helpful information."
        note="Note text"
        help="This is a help text."
        :options
        v-model="data"
      />
    </Board>
  </Story>
</template>

<style scoped lang="postcss">
.switches {
  width: 192px;
}
</style>
