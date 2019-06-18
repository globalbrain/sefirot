<template>
  <div class="SGrid">
    <div class="header">
      <div class="header-row">
        <div :class="`header-cell ${column.name}`" :key="column.label" v-for="column in columns">
          {{ column.label }}
        </div>
      </div>
    </div>

    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: { type: Array, required: true }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGrid {
  background-color: var(--c-white);
  box-shadow: var(--shadow-depth-1);
}

.header-row {
  display: flex;
  padding: 0 16px;
}

.header-cell {
  flex-shrink: 0;
  padding: 16px 16px 12px;
  font-size: 12px;
  font-weight: 700;
  color: var(--c-gray);
}

.body {
  .row {
    display: flex;
    border-top: 1px solid var(--c-divider);
    padding: 15px 16px 16px;
  }

  .cell {
    flex-shrink: 0;
    padding: 0 16px;
    font-size: 14px;
  }
}
</style>
