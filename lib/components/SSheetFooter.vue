<template>
  <footer class="SSheetFooter">
    <slot />
  </footer>
</template>

<style scoped lang="postcss">
.SSheetFooter {
  border-top: 1px solid var(--c-divider-light);
  padding: 0 16px;

  @media (min-width: 512px) {
    padding: 0 32px;
  }
}
</style>
