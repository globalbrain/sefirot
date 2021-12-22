<template>
  <div class="SSheetFooterActions">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.SSheetFooterActions {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0 15px;
}

.SSheetFooterActions :deep(.SSheetFooterAction + .SSheetFooterAction) {
  padding-left: 8px;
}
</style>
