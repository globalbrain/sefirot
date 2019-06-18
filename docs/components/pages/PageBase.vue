<template>
  <div class="PageBase">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.PageBase.page-enter-active {
  transition: opacity .5s, transform .5s;
}

.PageBase.page-enter,
.PageBase.page-leave-to {
  opacity: 0;
}

.PageBase.page-enter {
  transform: translateY(8px);
}

.PageBase.page-leave-active {
  transition: opacity .1s, transform .1s;
}

.PageBase.page-leave-to {
  transform: translateY(-8px);
}
</style>
