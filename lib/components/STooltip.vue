<template>
  <component :is="tag" class="STooltip">
    <span class="STooltip-content" @mouseenter="on = true" @mouseleave="on = false">
      <slot />
    </span>

    <transition name="fade">
      <span v-show="on" class="STooltip-tip" :class="classes">
        {{ text }}
      </span>
    </transition>
  </component>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from '@vue/composition-api'

type Position = 'top' | 'right' | 'bottom' | 'left'

export default defineComponent({
  props: {
    tag: { type: String, default: 'span' },
    text: { type: String, required: true },
    position: { type: String as PropType<Position>, default: 'top' }
  },

  setup(props) {
    const on = ref(false)

    const classes = computed(() => [props.position])

    return {
      on,
      classes
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.STooltip {
  position: relative;
}

.STooltip-tip {
  position: absolute;
  display: block;
  border-radius: 4px;
  padding: 0 12px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  color: var(--c-text-dark-1);
  background-color: rgba(0, 0, 0, .9);
  white-space: nowrap;
  transition: opacity .25s, transform .25s;
}

.STooltip-tip.fade-enter,
.STooltip-tip.fade-leave-to {
  opacity: 0;

  &.top    { transform: translate(-50%, -100%); }
  &.right  { transform: translate(0, -50%); }
  &.bottom { transform: translate(-50%, 100%); }
  &.left   { transform: translate(0, -50%); }
}

.STooltip-tip.top {
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - 8px));
}

.STooltip-tip.right {
  top: 50%;
  left: 100%;
  transform: translate(8px, -50%);
}

.STooltip-tip.bottom {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, calc(100% + 8px));
}

.STooltip-tip.left {
  top: 50%;
  right: 100%;
  transform: translate(-8px, -50%);
}
</style>
