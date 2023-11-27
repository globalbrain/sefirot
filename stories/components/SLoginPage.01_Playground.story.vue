<script setup lang="ts">
import SLoginPage from 'sefirot/components/SLoginPage.vue'

const title = 'Components / SLoginPage / 01. Playground'
const docs = '/components/login-page'

function state() {
  const state: InstanceType<typeof SLoginPage>['$props'] = {
    cover: 'https://images.unsplash.com/photo-1526783166374-1239abde1c20?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    coverTitle: {
      text: 'Golden Gate Bridge',
      link: 'https://unsplash.com/photos/bottom-view-of-orange-building-LjE32XEW01g'
    },
    coverPhotographer: {
      text: 'Keegan Houser',
      link: 'https://unsplash.com/@khouser01'
    },
    actions: [
      { type: 'google', onClick: async () => {} }
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
