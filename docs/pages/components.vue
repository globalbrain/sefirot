<template>
  <div class="Components">
    <div class="container">
      <nav class="nav">
        <p class="nav-title">Components</p>

        <ul class="nav-list">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/components/buttons">Buttons</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/components/inputs-text">Inputs: Text</nuxt-link>
          </li>
        </ul>
      </nav>

      <div class="main">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  display: flex;
  margin: 0 auto;
  width: 960px;
}

.nav {
  padding: 8px 48px 192px 0;
  flex-shrink: 0;
  width: 240px;
}

.nav-title {
  padding-bottom: 16px;
  color: var(--c-gray);
}

.nav-item {
  & + & {
    padding-top: 8px;
  }
}

.nav-link {
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}

.main {
  width: 720px;
}
</style>

