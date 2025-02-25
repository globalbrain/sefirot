<script setup lang="ts">
import SW from 'sefirot/components/SW.vue'

const title = 'Components / SW / 01. Playground'
</script>

<template>
  <Board :title="title">
    <p class="max-w-512">Resize the window and try line breaking this text line. <SW><span class="text-c-info-1">This word</span></SW> should not be word borken and should be treated as a single word. For another example, <SW><span class="text-c-info-1">this word</span></SW> should also be broke together.</p>
  </Board>
</template>
