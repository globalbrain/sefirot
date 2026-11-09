<script setup lang="ts">
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import SInputAsyncDropdown from 'sefirot/components/SInputAsyncDropdown.vue'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import STableColumn from 'sefirot/components/STableColumn.vue'
import STableHeaderMenuItem from 'sefirot/components/STableHeaderMenuItem.vue'
import { type DropdownSection } from 'sefirot/composables/Dropdown'
import { ref } from 'vue'

const title = 'Components / SDropdown / 03. Containment'
const selected = ref<string | null>(null)
const options = Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: `${index}` }))
const sections: DropdownSection[] = [{ type: 'menu', options: options.map(({ label }) => ({ label })) }]
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <div class="examples">
      <SInputDropdown v-model="selected" :options label="Dropdown" />
      <SInputAsyncDropdown v-model="selected" :fetch="async () => options.map((option) => option.value)" :to-option="(value: string) => options[Number(value)]" label="Async dropdown" />
      <div class="edge"><SActionMenu label="Action menu" :options="sections" dropdown-align="right" /></div>
      <div class="edge"><SInputAddon label="Addon menu" :dropdown="sections" /></div>
      <div class="edge"><STableHeaderMenuItem label="Table menu" :dropdown="sections" /></div>
      <STableColumn name="example" label="Column menu" :has-header="false" :resizable="false" :dropdown="sections" />
    </div>
  </Story>
</template>

<style scoped>
.examples {
  /* Exercise fixed-position dropdowns inside a transformed containing block. */
  transform: translateZ(0); display: grid; gap: 24px; width: min(100%, 320px); padding: 16px; }
.edge { display: flex; justify-content: flex-end; }
</style>
