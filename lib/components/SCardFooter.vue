<template>
  <div class="SCardFooter">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCardFooter {
  display: flex;
  align-items: center;
  border-radius: 0 0 5px 5px;
  background-color: var(--c-bg-elv-3);
}
</style>
