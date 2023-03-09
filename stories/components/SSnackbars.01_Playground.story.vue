<script setup lang="ts">
import HFixture from './SSnackbars.01_Playground.story.Fixture.vue'

const title = 'Components / SPill / 03. Types and Modes'
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <HFixture />
    </Board>
  </Story>
</template>
