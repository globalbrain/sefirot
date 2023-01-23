<script setup lang="ts">
import { format } from '../support/Num'

defineProps<{
  total?: number | null
  reset?: boolean
  borderless?: boolean
  onReset?(): void
}>()
</script>

<template>
  <div class="STableHeader" :class="{ borderless }">
    <div class="container">
      <p class="total">
        {{ format(total ?? 0) }} {{ (total ?? 0) > 1 ? 'records' : 'record' }}
      </p>

      <div v-if="reset" class="reset">
        <button class="button" @click="onReset">
          Reset filters
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableHeader {
  padding-right: var(--table-padding-right);
  padding-left: var(--table-padding-left);
}

.container {
  display: flex;
  padding: 0 16px;
}

.total {
  margin: 0;
  padding: 13px 0 11px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.reset {
  position: relative;
  margin-left: 16px;

  &::before {
    display: inline-block;
    margin-right: 16px;
    width: 1px;
    height: 16px;
    background-color: var(--c-divider-light);
    content: "";
    transform: translateY(4px);
  }
}

.button {
  padding: 13px 0 11px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-info);
  transition: color 0.25s;

  &:hover {
    color: var(--c-info-dark);
  }
}
</style>
