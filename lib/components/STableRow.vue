<script setup lang="ts">

</script>

<template>
  <div class="STableRow">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.STableRow {
  display: flex;
  border-top: 1px solid var(--c-divider-light);
  background-color: var(--c-bg);
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--c-bg-soft);
  }

  &:first-child {
    border-top: 0;
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }

  .dark & {
    background-color: var(--c-bg-mute);
  }

  .dark &:hover {
    background-color: var(--c-bg-soft);
  }
}
</style>
