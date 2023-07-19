<template>
  <div class="SHeadLead">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SHeadLead {
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-2);
}

.SHeadLead :deep(a) {
  color: var(--c-info-text);
  transition: color 0.25s;

  &:hover {
    color: var(--c-info-text-dark);
  }
}
</style>
