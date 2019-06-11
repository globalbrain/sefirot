<template>
  <div class="TheHeader">
    <div class="container">
      <div class="logo">
        <nuxt-link class="logo-link" to="/">
          <IconSefirotH class="logo-icon" />
        </nuxt-link>
      </div>

      <ul class="nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/components">Components</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconSefirotH from '@/components/icons/IconSefirotH'

export default {
  components: {
    IconSefirotH
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  display: flex;
  margin: 0 auto;
  width: 960px;
}

.logo-link {
  display: flex;
  align-items: center;
  width: 102px;
  height: 64px;

  &:hover .logo-icon {
    fill: var(--c-gray);
  }
}

.logo-icon {
  display: block;
  width: 102px;
  height: 32px;
  fill: var(--c-black);
  transition: fill .25s;
}

.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.nav-item {
 & + & {
  padding-left: 32px;
 }
}

.nav-link {
  display: block;
  line-height: 64px;
  font-weight: 500;
  font-size: 14px;
  color: var(--c-black);
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}
</style>
