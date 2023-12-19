<script setup lang="ts">
import SLink from './SLink.vue'

export interface Title {
  text: string
  link?: string
}

defineProps<{
  title: Title[]
}>()
</script>

<template>
  <div class="SLocalNavTitle">
    <div v-for="item in title" :key="item.text" class="title">
      <SLink class="text" :href="item.link">
        {{ item.text }}
      </SLink>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SLocalNavTitle {
  display: flex;
  overflow: hidden;
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & + &::before {
    display: inline-block;
    margin: 0 8px;
    line-height: 32px;
    font-size: 20px;
    color: var(--c-text-3);
    content: "/";
  }
}

.text {
  line-height: 32px;
  font-size: 20px;
  font-weight: 500;
}

.text.link {
  color: var(--c-text-info-1);
  cursor: pointer;
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-info-2);
  }
}
</style>
