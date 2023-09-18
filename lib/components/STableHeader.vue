<script setup lang="ts">
import { computed } from 'vue'
import { type TableAction, type TableMenu } from '../composables/Table'
import { format } from '../support/Num'
import { isNullish } from '../support/Utils'
import STableHeaderActions from './STableHeaderActions.vue'
import STableHeaderMenu from './STableHeaderMenu.vue'

const props = defineProps<{
  total?: number | null
  reset?: boolean
  menu?: TableMenu[] | TableMenu[][]
  actions?: TableAction[]
  borderless?: boolean
  onReset?(): void
  selected?: unknown[]
}>()

const stats = computed(() => {
  if (isNullish(props.total)) {
    return null
  }
  let text = `${format(props.total)} ${props.total > 1 ? 'records' : 'record'}`
  if (props.selected?.length) {
    text = `${format(props.selected.length)} of ${text} selected`
  }
  return text
})

const actionsWithStatsAndReset = computed(() => {
  return [
    ...(stats.value ? [{ label: stats.value }] : []),
    ...(props.reset ? [{ label: 'Reset filters', onClick: props.onReset, type: 'info' as const }] : []),
    ...(props.actions || [])
  ]
})
</script>

<template>
  <div class="STableHeader" :class="{ borderless }">
    <div class="container">
      <STableHeaderActions :actions="actionsWithStatsAndReset" />
      <div v-if="menu && menu.length" class="menu">
        <STableHeaderMenu :menu="menu" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableHeader {
  padding-right: var(--table-padding-right);
  padding-left: var(--table-padding-left);
  background-color: var(--c-bg-soft);

  &:not(.borderless) {
    border-radius: 5px 5px 0 0;
  }
}

.container {
  display: flex;
  min-height: 48px;
}

.menu {
  flex-shrink: 0;
  padding-right: 8px;
}
</style>
