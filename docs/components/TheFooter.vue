<template>
  <div class="TheFooter bg-white-soft">
    <div class="mx-auto max-w-960 text-center">
      <p class="leading-20 text-14 font-500">We shape our buildings. Thereafter, they shape us.</p>
      <p class="text-12 font-500 text-light-2">&copy; 2020 <a class="link" href="https://globalbrains.com" target="_blank">Global Brain Corporation</a></p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheFooter {
  position: relative;
  z-index: var(--z-index-footer);
  padding: 32px;

  @media (min-width: 768px) {
    padding-right: 48px;
    padding-left: 48px;
  }
}

.link {
  transition: color .25s;

  &:hover {
    color: var(--c-text-light-1);
  }
}
</style>
