<template>
  <p class="SCardHeaderTitle">
    <slot />
  </p>
</template>

<style scoped lang="postcss">
.SCardHeaderTitle {
  flex-grow: 1;
  padding-left: 24px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}
</style>
