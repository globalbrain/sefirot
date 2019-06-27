<template>
  <div class="TheFooter">
    <div class="container">
      <p class="quote">We shape our buildings. Thereafter, they shape us.</p>
      <p class="copyright">&copy; 2019 <a class="link" href="https://globalbrains.com" target="_blank">Global Brain Corporation</a></p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  margin: 0 auto;
  padding: 32px 0;
  width: 960px;
}

.quote {
  font-size: 14px;
  font-weight: 500;
}

.copyright {
  font-size: 12px;
  font-weight: 500;
  color: var(--c-gray);
}

.link {
  transition: color .25s;

  &:hover {
    color: var(--c-black);
  }
}
</style>
