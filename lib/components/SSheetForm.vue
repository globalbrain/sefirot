<template>
  <div class="SSheetForm">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SSheetForm {
  padding: 32px;

  .SSheetTitle + & {
    padding-top: 16px;
  }
}
</style>
