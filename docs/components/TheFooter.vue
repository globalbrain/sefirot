<template>
  <div class="TheFooter">
    <div class="mx-auto max-w-960 text-center">
      <p class="leading-20 text-12 font-500">We shape our buildings. Thereafter, they shape us.</p>
      <p class="copyright text-12 font-500">&copy; 2021 <a class="link" href="https://globalbrains.com" target="_blank">Global Brain Corporation</a></p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheFooter {
  position: relative;
  z-index: var(--z-index-footer);
  border-top: 1px solid var(--c-divider-light);
  padding: 32px;
  background-color: var(--c-bg);

  @media (min-width: 768px) {
    padding-right: 48px;
    padding-left: 48px;
  }
}

.link {
  transition: color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.copyright {
  color: var(--c-text-2);
}
</style>
