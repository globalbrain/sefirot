<script setup lang="ts">
import HFixture from './SSnackbars.01_Playground.story.Fixture.vue'

const title = 'Components / SSnackbars / 01. Playground'
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <HFixture />
    </Board>
  </Story>
</template>
