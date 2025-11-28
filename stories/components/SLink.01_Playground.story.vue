<script setup lang="ts">
import SLink from 'sefirot/components/SLink.vue'

const title = 'Components / SLink / 01. Playground'
const docs = '/components/link'

function initState() {
  return {
    href: 'https://example.com',
    external: 'undefined',
    text: 'This is link text'
  } as const
}

function getExternal(value: 'undefined' | 'true' | 'false') {
  return value === 'undefined' ? undefined : value === 'true'
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstText
        v-model="state.href"
        title="href"
      />
      <HstText
        v-model="state.text"
        title="text"
      />
      <HstSelect
        v-model="state.external"
        title="external"
        :options="{
          undefined: 'undefined',
          true: 'true',
          false: 'false'
        }"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SLink
          :href="state.href"
          :external="getExternal(state.external)"
        >
          {{ state.text }}
        </SLink>
      </Board>
    </template>
  </Story>
</template>
