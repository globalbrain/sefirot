<script setup lang="ts">
import { computed } from 'vue'
import { type TableMenu } from '../composables/Table'
import { format } from '../support/Num'
import { isNullish } from '../support/Utils'
import STableHeaderMenu from './STableHeaderMenu.vue'

const props = defineProps<{
  total?: number | null
  reset?: boolean
  menu?: TableMenu[] | TableMenu[][]
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
</script>

<template>
  <div class="STableHeader" :class="{ borderless }">
    <div class="container">
      <div class="stats">
        <p v-if="stats" class="total">
          {{ stats }}
        </p>
        <div v-if="reset" class="reset">
          <button class="button" @click="onReset">
            Reset filters
          </button>
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
    border-radius: 5px 5px 0 0;
  }
}

.container {
  display: flex;
  min-height: 48px;
}

.stats {
  display: flex;
  flex-grow: 1;
  padding: 0 16px;
}

.total {
  margin: 0;
  padding: 12px 0;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.reset {
  position: relative;

  .total + & {
    margin-left: 16px;
  }

  .total + &::before {
    display: inline-block;
    margin-right: 16px;
    width: 1px;
    height: 16px;
    background-color: var(--c-divider-2);
    content: "";
    transform: translateY(4px);
  }
}

.button {
  padding: 12px 0;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-info-text);
  transition: color 0.25s;

  &:hover {
    color: var(--c-info-text-dark);
  }
}

.menu {
  flex-shrink: 0;
  padding-right: 8px;
}
</style>
