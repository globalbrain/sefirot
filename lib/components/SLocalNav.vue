<script setup lang="ts">
import { computed } from 'vue'
import SLocalNavAvatar from './SLocalNavAvatar.vue'
import SLocalNavDescription from './SLocalNavDescription.vue'
import SLocalNavMenu, { type MenuItem } from './SLocalNavMenu.vue'
import SLocalNavTitle, { type Title } from './SLocalNavTitle.vue'

export type { Title, MenuItem }

export interface Avatar {
  image?: string | null
  name?: string | null
}

const props = defineProps<{
  avatar?: Avatar
  title: Title[]
  description?: string
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
    <div class="title-bar">
      <div v-if="avatar" class="title-bar-avatar">
        <SLocalNavAvatar
          :image="avatar.image"
          :name="avatar.name"
        />
      </div>
      <div class="title-bar-body">
        <SLocalNavTitle :title="title" />
        <SLocalNavDescription v-if="description" :text="description" />
      </div>
    </div>
    <SLocalNavMenu v-if="normalizedMenu" :menu="normalizedMenu" />
  </div>
</template>

<style scoped lang="postcss">
.SLocalNav {
  display: flex;
  flex-direction: column;
  gap: 12px;
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

.title-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
