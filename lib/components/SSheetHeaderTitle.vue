<template>
  <h1 class="SSheetHeaderTitle">
    <slot />
  </h1>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SSheetHeaderTitle {
  margin: 0;
  padding: 14px 16px 10px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 500;
}
</style>
