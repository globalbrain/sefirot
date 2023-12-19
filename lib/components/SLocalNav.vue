<script setup lang="ts">
import SLocalNavMenu, { type MenuItem } from './SLocalNavMenu.vue'
import SLocalNavTitle, { type Title } from './SLocalNavTitle.vue'

export type { Title, MenuItem }

defineProps<{
  title: Title[]
  menu?: MenuItem[][]
}>()
</script>

<template>
  <div class="SLocalNav" :class="{ 'has-menu': menu }">
    <SLocalNavTitle :title="title" />
    <SLocalNavMenu v-if="menu" :menu="menu" />
  </div>
</template>

<style scoped lang="postcss">
.SLocalNav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 24px;

  @media (min-width: 768px) {
    padding: 16px 32px;
  }
}

.SLocalNav.has-menu {
  padding-bottom: 0;

  @media (min-width: 768px) {
    padding-bottom: 0;
  }
}
</style>
