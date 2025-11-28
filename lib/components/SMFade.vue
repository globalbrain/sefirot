<script setup lang="ts">
import SM, { type Props } from './SM.vue'

withDefaults(defineProps<Props>(), {
  opacity: 0,
  once: true
})
</script>

<template>
  <SM v-slot="{ on }" class="SMFade" v-bind="$props">
    <slot :on />
  </SM>
</template>
