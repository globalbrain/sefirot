<template>
  <div class="SCard">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCard {
  display: grid;
  gap: 1px;
  border: 1px solid var(--c-divider-2);
  border-radius: 6px;
  background-color: var(--c-gutter);
}

.SCard.collapsed {
  height: 48px;
  overflow: hidden;
}
</style>
