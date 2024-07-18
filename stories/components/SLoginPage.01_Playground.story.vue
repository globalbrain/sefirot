<script setup lang="ts">
import SLoginPage, { type Action } from 'sefirot/components/SLoginPage.vue'
import { sleep } from 'sefirot/support/Time'

const title = 'Components / SLoginPage / 01. Playground'
const docs = '/components/login-page'

const cover = 'https://images.unsplash.com/photo-1526783166374-1239abde1c20?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const coverTitle = {
  text: 'Golden Gate Bridge',
  link: 'https://unsplash.com/photos/bottom-view-of-orange-building-LjE32XEW01g'
}

const coverPhotographer = {
  text: 'Keegan Houser',
  link: 'https://unsplash.com/@khouser01'
}

const actions: Action[] = [
  { type: 'password', onSubmit: async () => { await sleep(1000); return true } },
  { type: 'google', onClick: async () => {} }
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <SLoginPage
        :cover="cover"
        :cover-title="coverTitle"
        :cover-photographer="coverPhotographer"
        :actions="actions"
      />
    </Board>
  </Story>
</template>
