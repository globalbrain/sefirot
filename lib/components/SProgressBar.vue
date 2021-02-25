<template>
  <div class="SProgressBar">
    <div class="bar">
      <div class="bar-bg">
        <div class="bar-line" :style="styles" />
      </div>
    </div>

    <p class="number">
      {{ progressForNumber }}<span class="number-unit">%</span>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    now: { type: Number, required: true },
    max: { type: Number, required: true }
  },

  setup(props) {
    const progress = computed(() => {
      const value = props.now / props.max
      const pow = 10 ** 4

      return Math.round(value * pow) / pow
    })

    const progressForNumber = computed(() => (progress.value * 100).toFixed(2))

    const styles = computed<Partial<CSSStyleDeclaration>>(() => ({
      transform: `scaleX(${progress.value})`
    }))

    return {
      styles,
      progressForNumber
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SProgressBar {
  display: flex;
  width: 100%;
}

.bar {
  flex-grow: 1;
}

.bar-bg {
  border-radius: 2px;
  width: 100%;
  height: 16px;
  background-color: var(--c-white-mute);
  overflow: hidden;
}

.bar-line {
  border-radius: 2px;
  height: 16px;
  background-color: var(--c-black);
  transform-origin: 0 50%;
  transition: transform .25s;
}

.number {
  flex-shrink: 0;
  width: 64px;
  text-align: right;
  line-height: 16px;
  font-family: var(--font-family-number);
  font-size: 14px;
}

.number-unit {
  display: inline-block;
  margin-left: 2px;
  font-size: 12px;
  color: var(--c-gray);
}
</style>
