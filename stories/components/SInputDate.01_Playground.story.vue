<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { useData } from 'sefirot/composables/Data'
import { useValidation } from 'sefirot/composables/Validation'
import { type Day, day } from 'sefirot/support/Day'
import { afterOrEqual, beforeOrEqual } from 'sefirot/validation/rules'

const title = 'Components / SInputDate / 01. Playground'

function initState() {
  return {
    size: 'md',
    block: false
  }
}

const { data } = useData({
  date: null as Day | null
})

const { validation } = useValidation(data, {
  date: {
    afterOrEqual: afterOrEqual(day('2020-01-01')),
    beforeOrEqual: beforeOrEqual(day('2030-12-31'))
  }
})
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.size"
        title="size"
        :options="{
          sm: 'sm',
          md: 'md'
        }"
      />
      <HstSelect
        v-model="state.tabindex"
        title="tabindex"
        :options="[0, -1]"
      />
      <HstCheckbox
        v-model="state.block"
        title="block"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <SInputDate
          v-model="data.date"
          :validation="validation.date"
          label="Label"
          name="date"
          :size="state.size"
          :block="state.block"
          :tabindex="state.tabindex"
        />
      </Board>
    </template>
  </Story>
</template>
