<template>
  <div class="STooltip">
    <div class="content" @mouseenter="on = true" @mouseleave="on = false">
      <slot />
    </div>

    <transition name="fade">
      <div class="tip" :class="classes" v-show="on">
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    position: { type: String, default: 'top' }
  },

  data () {
    return {
      on: false
    }
  },

  computed: {
    classes () {
      return {
        top: this.position === 'top',
        right: this.position === 'right',
        bottom: this.position === 'bottom',
        left: this.position === 'left'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.STooltip {
  position: relative;
  display: inline-block;
}

.tip {
  position: absolute;
  border-radius: 4px;
  padding: 0 12px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  color: var(--c-white);
  background-color: rgba(0, 0, 0, .9);
  transition: opacity .25s, transform .25s;
}

.tip.fade-enter,
.tip.fade-leave-to {
  opacity: 0;

  &.top    { transform: translate(-50%, 8px); }
  &.right  { transform: translate(0, -50%); }
  &.bottom { transform: translate(-50%, -8px); }
  &.left   { transform: translate(0, -50%); }
}


.tip.top {
  top: -40px;
  left: 50%;
  transform: translate(-50%, 0);
}

.tip.right {
  top: 50%;
  left: 100%;
  transform: translate(8px, -50%);
}

.tip.bottom {
  bottom: -40px;
  left: 50%;
  transform: translate(-50%, 0);
}

.tip.left {
  top: 50%;
  right: 100%;
  transform: translate(-8px, -50%);
}
</style>
