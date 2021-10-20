<template>
  <div class="SSheetMedium">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SSheetMedium {
  padding: 24px 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
}

.SSheet.small .SSheetMedium {
  @media (min-width: 768px) {
    padding: 24px 16px;
  }
}

.SSheetMedium >>> h1 {
  line-height: 32px;
  font-size: 20px;
  font-weight: 500;
}

.SSheetMedium >>> h1 + p {
  margin-top: 8px;
}

.SSheetMedium >>> p {
  margin: 16px 0;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
}

.SSheetMedium >>> p:first-child {
  margin-top: 0;
}

.SSheetMedium >>> p:last-child {
  margin-bottom: 0;
}

.SSheetMedium >>> a {
  font-weight: 500;
  color: var(--c-info);
  transition: color .25s;

  &:hover {
    color: var(--c-info-dark);
  }
}

.SSheetMedium >>> ul {
  margin: 16px 0;
}

.SSheetMedium >>> ul:last-child {
  margin-bottom: 0;
}

.SSheetMedium >>> li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 400;
}

.SSheetMedium >>> li::before {
  position: absolute;
  top: 9px;
  left: 4px;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background-color: var(--c-text-3);
  content: "";
}

.SSheetMedium >>> li + li {
  margin-top: 4px;
}

.SSheetMedium >>> li > ul {
  margin: 4px 0 0;
}
</style>
