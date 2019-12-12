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

.TheFooter {
  border-top: 1px solid var(--c-divider-light);
  padding: 32px 24px;

  @media (min-width: 375px) {
    padding: 32px;
  }

  @media (min-width: 768px) {
    padding: 32px 48px;
  }
}

.container {
  margin: 0 auto;
  max-width: 960px;
}

.quote {
  line-height: 20px;
  font-size: 14px;
}

.copyright {
  font-size: 12px;
  color: var(--c-gray);
}

.link {
  transition: color .25s;

  &:hover {
    color: var(--c-black);
  }
}
</style>
