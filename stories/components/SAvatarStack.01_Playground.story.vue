<script setup lang="ts">
import SAvatarStack from 'sefirot/components/SAvatarStack.vue'

const title = 'Components / SAvatarStack / 01. Playground'
const docs = '/components/avatar-stack'

const variants = [
  { title: 'Mini', size: 'mini' },
  { title: 'Small', size: 'small' },
  { title: 'Medium', size: 'medium' },
  { title: 'Large', size: 'large' },
  { title: 'Jumbo', size: 'jumbo' }
] as const

function state() {
  return {
    avatarCount: 2
  }
}

const avatars = [
  { image: 'https://i.pravatar.cc/144?img=1' },
  { image: 'https://i.pravatar.cc/144?img=2' },
  { image: 'https://i.pravatar.cc/144?img=3' },
  { image: 'https://i.pravatar.cc/144?img=4' }]
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstNumber title="avatarCount" v-model="state.avatarCount" />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <div class="grid gap-y-32">
          <div v-for="v in variants" :key="v.size" class="grid gap-y-12">
            <div class="leading-24 text-14 font-500 text-c-2">
              {{ v.title }}
            </div>
            <div class="flex flex-wrap gap-16">
              <SAvatarStack :size="v.size" :avatars="avatars" :avatar-count="state.avatarCount" />
            </div>
          </div>
        </div>
      </Board>
    </template>
  </Story>
</template>
