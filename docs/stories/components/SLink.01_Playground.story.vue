<script setup lang="ts">
import SLink from 'sefirot/components/SLink.vue'

const title = 'Components / SLink / 01. Playground'
const docs = '/components/link'

function state() {
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
  <Story :init-state="state">
    <template #controls="{ state }">
      <HstText
        title="href"
        v-model="state.href"
      />
      <HstText
        title="text"
        v-model="state.text"
      />
      <HstSelect
        title="external"
        :options="{
          undefined: 'undefined',
          true: 'true',
          false: 'false'
        }"
        v-model="state.external"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
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
