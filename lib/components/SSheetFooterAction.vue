<template>
  <div class="SSheetFooterAction">
    <SButton
      size="medium"
      :type="type ?? 'primary'"
      :mode="mode ?? 'neutral'"
      :label="label"
      block
      @click="$emit('click')"
    />
  </div>
</template>

<script setup lang="ts">
import SButton from './SButton.vue'

type Type = 'primary' | 'secondary' | 'tertiary' | 'text' | 'mute'
type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

defineProps<{
  type?: Type
  mode?: Mode
  label?: string
}>()

defineEmits(['click'])
</script>
