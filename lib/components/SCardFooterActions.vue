<template>
  <div class="SCardFooterActions">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCardFooterActions {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  gap: 12px;
  padding: 12px 24px;
}
</style>
