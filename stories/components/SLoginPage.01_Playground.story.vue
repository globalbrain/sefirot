<script setup lang="ts">
import SLoginPage from 'sefirot/components/SLoginPage.vue'
import coverImage from '../_img/login-page-cover.jpg'

const title = 'Components / SLoginPage / 01. Playground'
const docs = '/components/login-page'

function state() {
  const state: InstanceType<typeof SLoginPage>['$props'] = {
    cover: coverImage,
    coverTitle: {
      text: 'Golden Gate Bridge',
      link: 'https://unsplash.com/photos/bottom-view-of-orange-building-LjE32XEW01g'
    },
    coverPhotographer: {
      text: 'Keegan Houser',
      link: 'https://unsplash.com/@khouser01'
    },
    actions: [
      { type: 'google', onClick: async () => {} },
      { type: 'google', label: 'Sign in via G', onClick: async () => {} }
    ]
  }

  return state
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstText
        title="cover"
        v-model="state.cover"
      />
      <HstJson
        title="coverTitle"
        v-model="state.coverTitle"
      />
      <HstJson
        title="coverPhotographer"
        v-model="state.coverPhotographer"
      />
      <HstJson
        title="actions"
        v-model="state.actions"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SLoginPage
          :cover="state.cover"
          :cover-title="state.coverTitle"
          :cover-photographer="state.coverPhotographer"
          :actions="state.actions"
        />
      </Board>
    </template>
  </Story>
</template>
