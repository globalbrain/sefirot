<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import { UnexpectedError } from 'sefirot/errors'

function throwErr() {
  throw new UnexpectedError()
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
