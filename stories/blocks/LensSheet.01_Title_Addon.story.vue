<script setup lang="ts">
// Histoire renders story content in a separate Vue sub-app, so Lens providers
// registered in the story component are unavailable to LensSheet. The fixture
// registers them in the same component tree as LensSheet.
import HFixture from './LensSheet.01_Title_Addon.story.Fixture.vue'

const title = 'Blocks / LensSheet / 01. Title Addon'
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title>
      <HFixture />
    </Board>
  </Story>
</template>
