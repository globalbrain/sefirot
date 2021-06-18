<template>
  <component :is="tag" class="STooltip" @mouseenter="show" @mouseleave="hide">
    <template v-if="text">
      <span ref="content" class="STooltip-content">
        <slot />
      </span>

      <transition name="fade">
        <span v-show="on" ref="tip" class="STooltip-container" :class="classes">
          <SMarkdown class="STooltip-tip" :content="text" inline />
        </span>
      </transition>
    </template>

    <template v-else>
      <span class="STooltip-content">
        <slot />
      </span>
    </template>
  </component>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from '@vue/composition-api'
import { Position, useTooltip } from '../composables/Tooltip'
import SMarkdown from './SMarkdown.vue'

export default defineComponent({
  components: {
    SMarkdown
  },

  props: {
    tag: { type: String, default: 'span' },
    text: { type: String, default: null },
    position: { type: String as PropType<Position>, default: 'top' }
  },

  setup(props) {
    const tip = ref<HTMLElement | null>(null)
    const content = ref<HTMLElement | null>(null)

    const classes = computed(() => [props.position])

    const { on, show, hide } = useTooltip(content, tip, props.position)

    return {
      tip,
      content,
      classes,
      on,
      show,
      hide
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.STooltip {
  position: relative;
}

.STooltip-container {
  position: absolute;
  display: block;
  transition: opacity .25s;
}

.STooltip-container.fade-enter,
.STooltip-container.fade-leave-to {
  opacity: 0;

  &.top .STooltip-tip    { transform: translateY(8px); }
  &.right .STooltip-tip  { transform: translateX(-8px); }
  &.bottom .STooltip-tip { transform: translateY(-8px); }
  &.left  .STooltip-tip  { transform: translateX(8px); }
}

.STooltip-container.top {
  top: 0;
  left: 50%;
  padding-bottom: 8px;
  transform: translate(-50%, -100%);
}

.STooltip-container.right {
  top: 50%;
  left: 100%;
  transform: translate(8px, -50%);
}

.STooltip-container.bottom {
  bottom: 0;
  left: 50%;
  padding-top: 8px;
  transform: translate(-50%, 100%);
}

.STooltip-container.left {
  top: 50%;
  right: 100%;
  transform: translate(-8px, -50%);
}

.STooltip-tip {
  display: block;
  border-radius: 4px;
  padding: 12px;
  width: max-content;
  max-width: 288px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-dark-1);
  background-color: rgba(0, 0, 0, .9);
  transition: transform .25s;
}

.STooltip-tip >>> a {
  color: var(--c-info);

  &:hover {
    color: var(--c-info-dark);
  }
}

.STooltip-content {
  white-space: nowrap;
}
</style>
