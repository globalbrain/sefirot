<script setup lang="ts">
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'

const title = 'Components / SGrid / 01. Playground'
const docs = '/components/grid'

function state() {
  return {
    cols: 4,
    gap: 24,
    gapCol: undefined,
    gapRow: undefined
  }
}
</script>

<template>
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstText title="cols" v-model="state.cols" />
      <HstText title="gap" v-model="state.gap" />
      <HstText title="gap-col" v-model="state.gapCol" />
      <HstText title="gap-row" v-model="state.gapRow" />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SGrid :cols="state.cols" :gap="state.gap" :gap-row="state.gapRow" :gap-col="state.gapCol">
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
    </template>
  </Story>
</template>
