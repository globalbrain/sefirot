<script setup lang="ts">
import SLink from 'sefirot/components/SLink.vue'

const title = 'Components / SLink / 01. Playground'
const docs = '/components/link'
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <template #default>
      <Board :title="title" :docs="docs">
        <ul>
          <li>
            <SLink href="/">
              Internal Link (opening in the same browser tab)
            </SLink>
          </li>
          <li>
            <SLink href="/" external>
              Internal Link (opening in another browser tab)
            </SLink>
          </li>
          <li>
            <SLink href="https://example.com">
              External Link Without External Prop (opening in another browser tab)
            </SLink>
          </li>
          <li>
            <SLink href="https://example.com" external>
              External Link With External Prop (opening in another browser tab)
            </SLink>
          </li>
        </ul>
      </Board>
    </template>
  </Story>
</template>
