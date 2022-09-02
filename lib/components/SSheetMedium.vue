<template>
  <div class="SSheetMedium">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SSheetMedium {
  padding: 32px;

  .SSheetTitle + & {
    padding-top: 0;
  }
}

.SSheetMedium :deep(p) {
  margin-bottom: 16px;
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
  font-size: 16px;
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
  margin-top: 8px;
}

.SSheetMedium :deep(li > ul) {
  margin: 4px 0 0;
  margin-bottom: 16px;
}
</style>
