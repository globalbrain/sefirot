<template>
  <div class="SCardHeader">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCardHeader {
  display: flex;
  align-items: center;
  border-radius: 5px 5px 0 0;
  height: 48px;
  background-color: var(--c-bg-elv-4);
}
</style>
