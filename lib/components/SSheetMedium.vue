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
</style>
