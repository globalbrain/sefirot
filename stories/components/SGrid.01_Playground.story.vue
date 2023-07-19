<script setup lang="ts">
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'

const title = 'Components / SGrid / 01. Playground'
const docs = '/components/grid'
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <SGrid cols="4" gap="24">
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
        <SGridItem>
          <div class="h-64 rounded-6 bg-info" />
        </SGridItem>
      </SGrid>
    </Board>
  </Story>
</template>
