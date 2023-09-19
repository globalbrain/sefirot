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

  return props.selected?.length
    ? `${format(props.selected.length)} of ${props.total} selected`
    : `${format(props.total)} ${props.total > 1 ? 'records' : 'record'}`
})

// deprecated `reset` prop in favor of `actions`, remove this in next major version
const resetAction = computed(() => {
  return props.reset
    ? [{ label: 'Reset filters', onClick: props.onReset, type: 'info' }]
    : []
})
</script>

<template>
  <div class="STableHeader" :class="{ borderless }">
    <div class="container">
      <div class="primary">
        <div v-if="stats" class="stats">
          {{ stats }}
        </div>
        <div v-if="actions?.length" class="actions">
          <STableHeaderActions :actions="actions" />
        </div>
        <div v-else-if="resetAction.length">
          <STableHeaderActions :actions="resetAction" />
        </div>
      </div>
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
    border-radius: calc(var(--table-border-radius) - 1px) calc(var(--table-border-radius) - 1px) 0 0;
  }
}

.container {
  display: flex;
  min-height: 48px;
}

.primary {
  display: flex;
  gap: 16px;
  flex-grow: 1;
  padding: 0 16px;
  min-height: 48px;
}

.stats {
  padding: 12px 0;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.menu {
  flex-shrink: 0;
  padding-right: 8px;
}
</style>
