<template>
  <header class="SSheetTitle">
    <h1 class="title">
      <slot />
    </h1>
  </header>
</template>

<style lang="postcss" scoped>
.title {
  padding: 20px 48px 0 16px;
  line-height: 28px;
  font-size: 20px;
  font-weight: 500;

  @media (min-width: 512px) {
    padding: 24px 64px 0 24px;
  }
}
</style>
