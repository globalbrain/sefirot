<template>
  <footer class="SSheetFooter">
    <slot />
  </footer>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SSheetFooter {
  border-top: 1px solid var(--c-divider-light);
  padding: 0 16px;
}
</style>
