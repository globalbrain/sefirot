<template>
  <div class="SControlButtonGroup">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SControlButtonGroup :deep(.SControlButton) {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .SButton {
    border-left-width: 0;
    border-radius: 0;
  }

  &:first-child .SButton {
    border-left-width: 1px;
    border-radius: 6px 0 0 6px;
  }

  &:last-child .SButton {
    border-radius: 0 6px 6px 0;
  }
}
</style>
