<script setup lang="ts">
import SMFade from 'sefirot/components/SMFade.vue'

const title = 'Components / SM / 02. Presets: SMFade'
const docs = '/components/m'

function state() {
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
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
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
