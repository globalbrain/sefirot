<template>
  <div class="SButtonGroup">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SButtonGroup :deep(.SButton) {
  border-left-width: 0;
  border-radius: 0;

  &:first-child { border-left-width: 1px; }

  &:first-child { border-radius: 6px 0 0 6px; }
  &:last-child  { border-radius: 0 6px 6px 0; }
}
</style>
