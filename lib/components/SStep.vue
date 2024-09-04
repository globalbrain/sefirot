<script setup lang="ts">
import IconCheck from '~icons/ph/check'
import IconX from '~icons/ph/x'
import { type PropType } from 'vue'
import { type BarMode, type StepStatus } from '../composables/Step'

defineProps({
  status: { type: String as PropType<StepStatus>, required: true },
  barLeft: { type: String as PropType<BarMode | null>, default: null },
  barRight: { type: String as PropType<BarMode | null>, default: null },
  text: { type: String, default: null }
})
</script>

<template>
  <div class="SStep" :class="[status]">
    <div class="indicator">
      <div class="bar" :class="[barLeft]" />
      <div class="point">
        <div v-if="status === 'active'" class="inner-dot" />
        <IconCheck v-else-if="status === 'done'" class="icon" />
        <IconX v-else-if="status === 'failed'" class="icon" />
      </div>
      <div class="bar" :class="[barRight]" />
    </div>

    <p v-if="text" class="text">{{ text }}</p>
  </div>
</template>

<style lang="postcss" scoped>
.SStep.upcoming {
  .point { border-color: var(--c-border-mute-1); }
  .text  { color: var(--c-text-2); }
}

.SStep.active {
  .point { border-color: var(--c-fg-success-1); }
  .text  { color: var(--c-text-success-1); }
}

.SStep.done {
  .point {
    border-color: var(--c-fg-success-1);
    background-color: var(--c-fg-success-1);
  }

  .text  { color: var(--c-text-1); }
}

.SStep.failed {
  .point {
    border-color: var(--c-fg-danger-1);
    background-color: var(--c-fg-danger-1);
  }

  .text  { color: var(--c-text-danger-1); }
}

.indicator {
  display: flex;
  align-items: center;
  width: 100%;
}

.point {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 16px;
  height: 16px;
}

.inner-dot {
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background-color: var(--c-fg-success-1);
}

.icon {
  width: 10px;
  height: 10px;
  color: var(--c-white);
}

.bar {
  width: calc(50% - 8px);
  height: 2px;
}

.bar.mute   { background-color: var(--c-border-mute-1); }
.bar.active { background-color: var(--c-fg-success-1); }
.bar.failed { background-color: var(--c-fg-danger-1); }

.text {
  margin: 0;
  padding: 8px 8px 0;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
}
</style>
