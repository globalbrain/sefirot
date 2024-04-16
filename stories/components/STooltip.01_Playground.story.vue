<script setup lang="ts">
import STooltip from 'sefirot/components/STooltip.vue'

const title = 'Components / STooltip / 01. Playground'
const docs = '/components/tooltip'

function state() {
  return {
    position: 'top',
    text: 'This is a tooltip text. Tooltips are a powerful way to simplify a user interface.'
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="position"
        :options="{
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left'
        }"
        v-model="state.position"
      />
      <HstTextarea
        title="text"
        v-model="state.text"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <STooltip class="top-left" :text="state.text" :position="state.position">
          Hover this text.
        </STooltip>
        <STooltip class="top-right" :text="state.text" :position="state.position">
          Hover this text.
        </STooltip>
        <STooltip class="center" :text="state.text" :position="state.position">
          Hover this text.
        </STooltip>
        <STooltip class="bottom-left" :text="state.text" :position="state.position">
          Hover this text.
        </STooltip>
        <STooltip class="bottom-right" :text="state.text" :position="state.position">
          Hover this text.
        </STooltip>
      </Board>
    </template>
  </Story>
</template>

<style scoped lang="postcss">
:deep(.b-menu) {
  display: none !important;
}

:deep(.b-page) {
  position: relative;

  .top-left {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  .top-right {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bottom-left {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  .bottom-right {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
}
</style>
