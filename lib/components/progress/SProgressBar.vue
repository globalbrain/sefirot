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

<script>
export default {
  props: {
    now: { type: Number, required: true },
    max: { type: Number, required: true }
  },

  computed: {
    styles () {
      return {
        transform: `scaleX(${this.progress})`
      }
    },

    progress () {
      const value = this.now / this.max

      const pow = Math.pow(10, 4)

      return Math.round(value * pow) / pow
    },

    progressForNumber () {
      const progress = this.progress * 100

      return progress.toFixed(2)
    }
  }
}
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
