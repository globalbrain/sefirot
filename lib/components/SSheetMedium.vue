<template>
  <div class="SSheetMedium">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.SSheetMedium {
  padding: 16px;
}

.SSheetMedium :deep(h1) {
  line-height: 32px;
  font-size: 20px;
  font-weight: 500;
}

.SSheetMedium :deep(h1 + p) {
  margin-top: 8px;
}

.SSheetMedium :deep(p) {
  margin: 16px 0;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
}

.SSheetMedium :deep(p:first-child) {
  margin-top: 0;
}

.SSheetMedium :deep(p:last-child) {
  margin-bottom: 0;
}

.SSheetMedium :deep(a) {
  font-weight: 500;
  color: var(--c-info);
  transition: color .25s;

  &:hover {
    color: var(--c-info-dark);
  }
}

.SSheetMedium :deep(ul) {
  margin: 16px 0;
}

.SSheetMedium :deep(ul:last-child) {
  margin-bottom: 0;
}

.SSheetMedium :deep(li) {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 400;
}

.SSheetMedium :deep(li::before) {
  position: absolute;
  top: 9px;
  left: 4px;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background-color: var(--c-text-3);
  content: "";
}

.SSheetMedium :deep(li + li) {
  margin-top: 4px;
}

.SSheetMedium :deep(li > ul) {
  margin: 4px 0 0;
}
</style>
