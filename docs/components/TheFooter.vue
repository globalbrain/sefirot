<template>
  <div class="TheFooter">
    <div class="container">
      <p class="catch">We shape our buildings. Thereafter, they shape us.</p>
      <p class="copyright">&copy; 2021 <a class="link" href="https://globalbrains.com" target="_blank">Global Brain Corporation</a></p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheFooter {
  position: relative;
  z-index: var(--z-index-footer);
  border-top: 1px solid var(--c-divider-light);
  padding: 24px;
  background-color: var(--c-bg);
}

.container {
  margin: 0 auto;
  text-align: center;
}

.catch,
.copyright {
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.link {
  transition: color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}
</style>
