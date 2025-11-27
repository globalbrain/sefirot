<script setup lang="ts">
import { computed } from 'vue'
import { type TableMenu } from '../composables/Table'
import STableHeaderMenuItem from './STableHeaderMenuItem.vue'

const props = defineProps<{
  menu: TableMenu[] | TableMenu[][]
}>()

const normalizedMenu = computed(() => {
  return Array.isArray(props.menu[0])
    ? (props.menu as TableMenu[][])
    : ([props.menu] as TableMenu[][])
})
</script>

<template>
  <div class="STableHeaderMenu">
    <div v-for="(items, i) in normalizedMenu" :key="i" class="group">
      <div v-if="i > 0" class="divider" />
      <div v-for="item in items" :key="item.label" class="item">
        <STableHeaderMenuItem
          :label="item.label"
          :state="item.state"
          :dropdown="item.dropdown"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableHeaderMenu {
  display: flex;
  align-items: center;
  height: 48px;
}

.group {
  display: flex;
  align-items: center;
  height: 48px;
}

.divider {
  margin: 0 8px;
  width: 1px;
  height: 16px;
  background-color: var(--c-gutter);
}
</style>
