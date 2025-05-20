<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

const title = 'Components / SButton / 02. Sizes'
const docs = '/components/button'

const variants = [
  { title: 'Mini', size: 'mini' },
  { title: 'Small', size: 'small' },
  { title: 'Medium', size: 'medium' },
  { title: 'Large', size: 'large' },
  { title: 'Jumbo', size: 'jumbo' }
] as const

const modes = [
  'default',
  'mute',
  'neutral',
  'white',
  'black',
  'info',
  'success',
  'warning',
  'danger'
]

function state() {
  return {
    mode: 'default',
    label: 'Button',
    rounded: false
  } as const
}
</script>

<template>
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="mode"
        :options="modes"
        v-model="state.mode"
      />
      <HstText
        title="label"
        v-model="state.label"
      />
      <HstCheckbox
        title="rounded"
        v-model="state.rounded"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <div class="root">
          <div v-for="v in variants" :key="v.size" class="group">
            <div class="title">{{ v.title }}</div>

            <div class="grid">
              <SButton
                v-for="t in (['fill', 'outline', 'text'] as const)"
                :key="t"
                :size="v.size"
                :type="t"
                :mode="state.mode"
                :label="state.label"
                :rounded="state.rounded"
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
