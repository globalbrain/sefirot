<template>
  <div class="SCardFooter">
    <slot />
  </div>
</template>

<style scoped>
.SCardFooter {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-radius: 0 0 11px 11px;
  background-color: var(--c-bg-2);
}
</style>
