<template>
  <div class="TheHeader">
    <div class="container">
      <div class="logo">
        <nuxt-link class="logo-link" to="/">
          <IconSefirotH class="logo-icon" />
        </nuxt-link>
      </div>
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

.TheHeader {
  padding: 0 24px;

  @media (min-width: 375px) {
    padding: 0 32px;
  }

  @media (min-width: 768px) {
    padding: 0 48px;
  }
}

.container {
  display: flex;
  margin: 0 auto;
  max-width: 960px;
}

.logo-link {
  display: flex;
  align-items: center;
  width: 102px;
  height: 96px;

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
</style>
