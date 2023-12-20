<script setup lang="ts">
import { computed } from 'vue'
import SLocalNavMenu, { type MenuItem } from './SLocalNavMenu.vue'
import SLocalNavTitle, { type Title } from './SLocalNavTitle.vue'

export type { Title, MenuItem }

const props = defineProps<{
  title: Title[]
  menu?: MenuItem[][]
}>()

const normalizedMenu = computed(() => {
  return props.menu?.reduce<MenuItem[][]>((carry, group) => {
    group.length && carry.push(group)
    return carry
  }, []) ?? null
})
</script>

<template>
  <div class="SLocalNav" :class="{ 'has-menu': normalizedMenu }">
    <SLocalNavTitle :title="title" />
    <SLocalNavMenu v-if="normalizedMenu" :menu="normalizedMenu" />
  </div>
</template>

<style scoped lang="postcss">
.SLocalNav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 24px;
  background-color: var(--c-bg-elv-2);

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
