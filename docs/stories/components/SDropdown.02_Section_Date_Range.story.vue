<script setup lang="ts">
import SDropdown from 'sefirot/components/SDropdown.vue'
import { createDropdownDateRange } from 'sefirot/composables/Dropdown'
import { DateRange } from 'sefirot/support/DateRange'
import { shallowRef } from 'vue'

const title = 'Components / SDropdown / 02. Section Date Range'

const range = shallowRef(new DateRange())

const sections = [
  createDropdownDateRange({
    range,
    onApply: (r) => { range.value = r }
  })
]
</script>

<template>
  <Board :title="title">
    <div class="max-w-256">
      <SDropdown :sections="sections" />
    </div>
  </Board>
</template>
