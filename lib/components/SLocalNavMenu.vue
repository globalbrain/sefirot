<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import SIcon from './SIcon.vue'
import SLink from './SLink.vue'

export interface MenuItem {
  icon?: IconifyIcon
  text: string
  link: string
  active?: boolean
}

defineProps<{
  menu: MenuItem[][]
}>()
</script>

<template>
  <div class="SLocalNavMenu">
    <div v-for="nav, index in menu" :key="index" class="group">
      <div v-for="item in nav" :key="item.text" class="item">
        <SLink class="link" :class="{ active: item.active }" :href="item.link">
          <SIcon v-if="item.icon" class="icon-svg" :icon="item.icon" />
          <span class="text">{{ item.text }}</span>
        </SLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SLocalNavMenu {
  display: flex;
  margin: 0 -24px;
  padding: 0 24px;
  overflow: hidden;
  overflow-x: auto;

  @media (min-width: 768px) {
    margin: 0 -32px;
    padding: 0 32px;
  }
}

.group {
  position: relative;
  display: flex;
  gap: 16px;

  & + & {
    padding-left: 32px;
  }

  & + &::before {
    position: absolute;
    top: 4px;
    left: 16px;
    display: block;
    width: 1px;
    height: 16px;
    background-color: var(--c-divider);
    content: "";
  }
}

.link {
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid transparent;
  padding-bottom: 7px;
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-2);
  transition: border-color 0.25s, color 0.25s;

  &:hover {
    color: var(--c-text-1);
  }

  &.active,
  &.router-link-active {
    color: var(--c-text-1);
    border-bottom-color: var(--c-border-info-1);
  }
}

.icon-svg {
  width: 16px;
  height: 16px;
}
</style>
