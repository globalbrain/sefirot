<template>
  <nav class="TheHeaderNavBar">
    <ul class="list">
      <li class="item">
        <NuxtLink class="link" to="/guide" @click.native="$emit('close')">Guide</NuxtLink>
      </li>
      <li class="item">
        <NuxtLink class="link" to="/components" @click.native="$emit('close')">Components</NuxtLink>
      </li>
      <li class="item">
        <NuxtLink class="link" to="/mixins" @click.native="$emit('close')">Mixins</NuxtLink>
      </li>
      <li class="item">
        <a class="link" href="https://github.com/globalbrain/sefirot" target="_blank">GitHub</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheHeaderNavBar {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  padding-left: 32px;
}

.list {
  display: flex;
}

.item {
  & + & {
    padding-left: 24px;
  }
}

.link {
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}
</style>
