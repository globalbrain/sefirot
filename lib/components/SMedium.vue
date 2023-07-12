<template>
  <div class="SMedium">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SMedium {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.SMedium :deep(p) {
  margin: 0;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  color: var(--c-text-1);
}

.SMedium :deep(strong) {
  font-weight: 600;
}

.SMedium :deep(a) {
  color: var(--c-info-text);
  transition: color 0.25s;

  &:hover {
    color: var(--c-info-text-dark);
  }
}

.SMedium :deep(ul),
.SMedium :deep(ol) {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.SMedium :deep(ol) {
  counter-reset: s-medium-counter;
}

.SMedium :deep(li) {
  position: relative;
  margin: 0;
  padding-left: 20px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  color: var(--c-text-1);
}

.SMedium :deep(ul > li::before) {
  position: absolute;
  top: 8px;
  left: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--c-text-3);
  content: "";
}

.SMedium :deep(ol > li) {
  counter-increment: s-medium-counter;
}

.SMedium :deep(ol > li::before) {
  margin-right: 3px;
  margin-left: -20px;
  color: var(--c-text-2);
  font-feature-settings: "tnum";
  content: counter(s-medium-counter)". ";
}
</style>
