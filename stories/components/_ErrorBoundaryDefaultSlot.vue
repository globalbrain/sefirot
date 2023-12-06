<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

function throwErr() {
  throw new Error('Error message')
}
</script>

<template>
  <div class="flex flex-col gap-16">
    <div>
      Default slot content shown here
    </div>
    <div>
      <SButton size="small" label="Throw error" @click="throwErr" />
    </div>
  </div>
</template>
