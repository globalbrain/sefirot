<template>
  <div class="SDoc">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SDoc {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.SDoc {
  --divider-padding: 24px 0;
}
</style>
