<script setup lang="ts">
import SAvatar from './SAvatar.vue'

defineProps<{
  image?: string | null
  name?: string | null
}>()
</script>

<template>
  <div class="SLocalNavAvatar">
    <SAvatar
      size="fill"
      :avatar="image"
      :name="name"
    />
  </div>
</template>

<style scoped lang="postcss">
.SLocalNavAvatar {
  width: 64px;
  height: 64px;
}
</style>
