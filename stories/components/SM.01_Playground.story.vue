<script setup lang="ts">
import SM from 'sefirot/components/SM.vue'

const title = 'Components / SM / 01. Playground'
const docs = '/components/m'

function state() {
  return {
    opacity: 0,
    x: '16px',
    y: '0',
    duration: '0.75s',
    delay: '0s',
    once: true
  }
}
</script>

<template>
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstText
        title="opacity"
        v-model="state.opacity"
      />
      <HstText
        title="x"
        v-model="state.x"
      />
      <HstText
        title="y"
        v-model="state.y"
      />
      <HstText
        title="duration"
        v-model="state.duration"
      />
      <HstText
        title="delay"
        v-model="state.delay"
      />
      <HstCheckbox
        title="once"
        v-model="state.once"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <div>Scroll down to see animation.</div>
        <div v-for="i in [...Array(5).keys()]" :key="i" class="py-256">
          <SM
            :opacity="state.opacity"
            :x="state.x"
            :y="state.y"
            :duration="state.duration"
            :delay="state.delay"
            :once="state.once"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </SM>
        </div>
      </Board>
    </template>
  </Story>
</template>
