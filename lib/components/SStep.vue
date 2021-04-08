<template>
  <div class="SStep" :class="[status]">
    <div class="indicator">
      <div class="bar" :class="[barLeft]" />
      <div class="point">
        <div v-if="status === 'active'" class="inner-dot" />
        <SIconCheck v-else-if="status === 'done'" class="icon" />
        <SIconX v-else-if="status === 'failed'" class="icon" />
      </div>
      <div class="bar" :class="[barRight]" />
    </div>

    <p v-if="text" class="text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { StepStatus, BarMode } from '../composables/Step'
import SIconCheck from './icons/SIconCheck.vue'
import SIconX from './icons/SIconX.vue'

export default defineComponent({
  components: {
    SIconCheck,
    SIconX
  },

  props: {
    status: { type: String as PropType<StepStatus>, required: true },
    barLeft: { type: String as PropType<BarMode>, default: null },
    barRight: { type: String as PropType<BarMode>, default: null },
    text: { type: String, default: null }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SStep.upcoming {
  .point { border-color: var(--c-divider); }
  .text  { color: var(--c-text-2); }
}

.SStep.active {
  .point { border-color: var(--c-success); }
  .text  { color: var(--c-success); }
}

.SStep.done {
  .point { border-color: var(--c-success); background-color: var(--c-success); }
  .text  { color: var(--c-text-1); }
}

.SStep.failed {
  .point { border-color: var(--c-danger); background-color: var(--c-danger); }
  .text  { color: var(--c-danger); }
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
  background-color: var(--c-success);
}

.icon {
  width: 10px;
  height: 10px;
  fill: var(--c-white);
}

.bar {
  width: calc(50% - 8px);
  height: 2px;
}

.bar.mute   { background-color: var(--c-divider-light); }
.bar.active { background-color: var(--c-success); }
.bar.failed { background-color: var(--c-danger); }

.text {
  margin: 0;
  padding: 8px 8px 0;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
}
</style>
