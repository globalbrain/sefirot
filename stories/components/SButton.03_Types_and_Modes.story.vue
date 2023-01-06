<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

const variants = [
  { title: 'Fill', type: 'fill' },
  { title: 'Outline', type: 'outline' },
  { title: 'Text', type: 'text' }
]

const modes = [
  'neutral',
  'mute',
  'info',
  'success',
  'warning',
  'danger'
]

function state() {
  return {
    label: 'Button'
  }
}
</script>

<template>
  <Board
    title="Components / SButton / 03. Types and Modes"
    :state="state"
    docs="/components/button"
  >
    <template #controls="{ state }">
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
              v-for="m in modes"
              :key="m"
              size="medium"
              :type="v.type"
              :mode="m"
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
