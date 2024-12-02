<template>
  <div class="SContent">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SContent {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.SContent :deep(h1),
.SContent :deep(.h1) {
  margin: 0;
  padding: 0;
  max-width: 640px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 500;
  color: var(--c-text-1);
}

.SContent :deep(h2),
.SContent :deep(.h2) {
  margin: 0;
  padding: 0;
  max-width: 640px;
  line-height: 32px;
  font-size: 20px;
  font-weight: 500;
  color: var(--c-text-1);
}

.SContent :deep(h3),
.SContent :deep(.h3) {
  margin: 0;
  padding: 0;
  max-width: 640px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--c-text-1);
}

.SContent :deep(p) {
  margin: 0;
  max-width: 640px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  color: var(--c-text-1);
}

.SContent :deep(strong) {
  font-weight: 600;
}

.SContent :deep(a) {
  color: var(--c-text-info-1);
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-info-2);
  }
}

.SContent :deep(ul),
.SContent :deep(ol) {
  margin: 0;
  padding-left: 0;
  max-width: 640px;
  list-style: none;
}

.SContent :deep(ol) {
  counter-reset: s-medium-counter;
}

.SContent :deep(li) {
  position: relative;
  margin: 0;
  padding-left: 20px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  color: var(--c-text-1);
}

.SContent :deep(ul > li::before) {
  position: absolute;
  top: 9px;
  left: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--c-text-1);
  content: "";
}

.SContent :deep(ol > li) {
  counter-increment: s-medium-counter;
}

.SContent :deep(ol > li::before) {
  margin-right: 3px;
  margin-left: -20px;
  color: var(--c-text-1);
  font-feature-settings: "tnum";
  content: counter(s-medium-counter)". ";
}

.SContent :deep(table) {
  margin: 8px 0;
  border-style: hidden;
  border-radius: 6px;
  text-align: left;
  font-size: 14px;
  color: var(--c-text-1);
  overflow: clip;
  box-shadow: 0 0 0 1px var(--c-divider);
}

.SContent :deep(table tr:hover td) {
  background-color: var(--c-bg-elv-4);
}

.SContent :deep(table thead > tr > th) {
  vertical-align: middle;
}

.SContent :deep(table th),
.SContent :deep(table td) {
  border: 1px solid var(--c-gutter);
  padding: 8px 16px;
  height: 40px;
  vertical-align: top;
  text-wrap: pretty;
  background-color: var(--c-bg-elv-3);
  overflow-wrap: break-word;
}

.SContent :deep(table th) {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-2);
  text-wrap: balance;
}
</style>
