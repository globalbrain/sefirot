<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

const title = 'Components / SButton / 03. Types and Modes'
const docs = '/components/button'

const variants = [
  { title: 'Fill', type: 'fill' },
  { title: 'Outline', type: 'outline' },
  { title: 'Text', type: 'text' }
] as const

const modes = [
  'default',
  'mute',
  'neutral',
  'info',
  'success',
  'warning',
  'danger'
] as const

function state() {
  return {
    label: 'Button',
    rounded: false,
    loading: false,
    disabled: false
  } as const
}
</script>

<template>
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstText title="label" v-model="state.label" />
      <HstCheckbox title="rounded" v-model="state.rounded" />
      <HstCheckbox title="loading" v-model="state.loading" />
      <HstCheckbox title="disabled" v-model="state.disabled" />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
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
                :rounded="state.rounded"
                :loading="state.loading"
                :disabled="state.disabled"
              />
            </div>
          </div>
        </div>
      </Board>
    </template>
  </Story>
</template>

<style scoped lang="postcss">
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
