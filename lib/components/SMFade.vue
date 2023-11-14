<script setup lang="ts">
import SM, { type Props } from './SM.vue'

withDefaults(defineProps<Props>(), {
  opacity: 0,
  once: true
})
</script>

<template>
  <SM class="SMFade" v-bind="$props" v-slot="{ on }">
    <slot :on="on" />
  </SM>
</template>
