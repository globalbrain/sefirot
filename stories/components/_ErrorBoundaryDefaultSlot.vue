<script setup lang="ts">
function throwErr() {
  throw new Error('Error!')
}
</script>

<template>
  <div>Default slot</div>
  <button @click="throwErr">Throw error</button>
</template>
