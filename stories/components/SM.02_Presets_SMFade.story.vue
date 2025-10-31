<script setup lang="ts">
import SMFade from 'sefirot/components/SMFade.vue'

const title = 'Components / SM / 02. Presets: SMFade'
const docs = '/components/m'

function initState() {
  return {
    x: '16px',
    y: '0',
    duration: '0.75s',
    delay: '0s',
    once: true
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstText
        v-model="state.x"
        title="x"
      />
      <HstText
        v-model="state.y"
        title="y"
      />
      <HstText
        v-model="state.duration"
        title="duration"
      />
      <HstText
        v-model="state.delay"
        title="delay"
      />
      <HstCheckbox
        v-model="state.once"
        title="once"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <div>Scroll down to see animation.</div>
        <div v-for="i in [...Array(5).keys()]" :key="i" class="py-256">
          <SMFade
            :x="state.x"
            :y="state.y"
            :duration="state.duration"
            :delay="state.delay"
            :once="state.once"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </SMFade>
        </div>
      </Board>
    </template>
  </Story>
</template>
