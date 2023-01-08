<script setup lang="ts">
import IconCheckCircle from '@iconify-icons/ph/check-circle-bold'
import IconImageSquare from '@iconify-icons/ph/image-square-bold'
import IconMagnifyingGlass from '@iconify-icons/ph/magnifying-glass-bold'
import SButton from 'sefirot/components/SButton.vue'

const variants = [
  { title: 'Fill', type: 'fill' },
  { title: 'Outline', type: 'outline' },
  { title: 'Text', type: 'text' }
] as const

const icons = [
  IconCheckCircle,
  IconImageSquare,
  IconMagnifyingGlass
]

function state() {
  return {
    size: 'medium',
    mode: 'neutral',
    label: 'Button'
  } as const
}
</script>

<template>
  <Board
    title="Components / SButton / 04. Icons"
    :state="state"
    docs="/components/button"
  >
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium',
          large: 'large',
          jumbo: 'jumbo'
        }"
        v-model="state.size"
      />
      <HstSelect
        title="mode"
        :options="{
          neutral: 'neutral',
          mute: 'mute'
        }"
        v-model="state.mode"
      />
      <HstText
        title="label"
        v-model="state.label"
      />
    </template>

    <template #default="{ state }">
      <div class="root">
        <div v-for="v in variants" :key="v.type" class="group">
          <div class="title">{{ v.title }}</div>

          <div class="grid">
            <SButton
              v-for="(i, index) in icons"
              :key="index"
              :size="state.size"
              :type="v.type"
              :mode="state.mode"
              :icon="i"
              :label="state.label"
            />
          </div>
        </div>
      </div>
    </template>
  </Board>
</template>

<style scoped>
.root {
  display: grid;
  gap: 32px;
}

.group {
  display: grid;
  gap: 12px;
}

.title {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-2);
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
