<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
defineProps<{ is?: any }>()
</script>

<template>
  <component v-if="is" :is="is" v-bind="$attrs">
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </component>
  <slot v-else />
</template>
