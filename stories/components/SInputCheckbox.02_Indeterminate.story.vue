<script setup lang="ts">
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { computed, reactive } from 'vue'

const title = 'Components / SInputCheckbox / 02. Indeterminate'
const docs = '/components/input-checkbox'

const options = reactive([
  { label: 'Book', value: 1, modelValue: false },
  { label: 'Diamonds (x2)', value: 2, modelValue: false },
  { label: 'Obsidian (x4)', value: 3, modelValue: false }
])

const control = computed({
  get() {
    return options.every((option) => option.modelValue)
      ? true
      : options.some((option) => option.modelValue)
        ? 'indeterminate'
        : false
  },
  set(newValue) {
    options.forEach((option) => {
      option.modelValue = newValue === true
    })
  }
})
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title :docs>
      <SInputCheckbox
        label="Complete the recipe"
        text="Enchantment table"
        v-model="control"
      />
      <div class="indent">
        <SInputCheckbox
          v-for="(option, i) in options"
          :key="i"
          :text="option.label"
          v-model="option.modelValue"
        />
      </div>
    </Board>
  </Story>
</template>

<style scoped lang="postcss">
.indent {
  margin-left: 24px;
}
</style>
