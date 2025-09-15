<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export interface Props {
  as?: string
  x?: string
  y?: string
  opacity?: string | number
  duration?: string
  delay?: string
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  x: '0',
  y: '0',
  opacity: 1,
  duration: '0.75s',
  delay: '0s',
  once: true
})

const target = ref<HTMLElement | null>(null)
const on = ref(false)

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  on.value = isIntersecting
  if (on.value && props.once) {
    stop()
  }
})
</script>

<template>
  <component :is="as" ref="target" class="SM" :class="{ on }">
    <slot :on />
  </component>
</template>

<style scoped lang="postcss">
.SM {
  position: relative;
  opacity: v-bind(opacity);
  transform: translate(v-bind(x), v-bind(y));
  transition: opacity, transform;
  transition-duration: v-bind(duration);
  transition-delay: v-bind(delay);
}

.SM.on {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
