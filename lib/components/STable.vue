<template>
  <div class="STable">
    <div class="container">
      <div class="table" role="grid">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.table {
  border: 1px solid var(--c-divider-light);
  border-radius: 12px;
}
</style>
