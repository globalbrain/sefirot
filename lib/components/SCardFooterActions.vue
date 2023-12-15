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

  .SCardFooter.compact > & { padding: 12px 24px; }
  .SCardFooter.wide > &    { padding: 16px 32px; }
  .SCardFooter.xwide > &   { padding: 24px 48px; }
}
</style>
