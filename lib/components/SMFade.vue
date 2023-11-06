<script setup lang="ts">
import SM, { type Props as BaseProps } from './SM.vue'

export type Props = Omit<BaseProps, 'opacity'>

defineProps<Props>()
</script>

<template>
  <SM
    class="SMFade"
    opacity="0"
    v-bind="$props"
    v-slot="{ on }"
  >
    <slot :on="on" />
  </SM>
</template>
