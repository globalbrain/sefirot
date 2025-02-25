<script setup lang="ts">
import SHead from 'sefirot/components/SHead.vue'
import SHeadLead from 'sefirot/components/SHeadLead.vue'
import SHeadTitle from 'sefirot/components/SHeadTitle.vue'

const title = 'Components / SHead / 01. Playground'
const docs = '/components/head'

function state() {
  return {
    mode: 'neutral',
    title: 'The head title',
    lead: 'Lorem ipsum dolor sit, amet consectetur.'
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="mode"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
        v-model="state.mode"
      />
      <HstText
        title="Title"
        v-model="state.title"
      />
      <HstText
        title="Lead"
        v-model="state.lead"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <div class="max-w-512">
          <SHead>
            <SHeadTitle v-if="state.title" :mode="state.mode">{{ state.title }}</SHeadTitle>
            <SHeadLead v-if="state.lead">{{ state.lead }}</SHeadLead>
          </SHead>
        </div>
      </Board>
    </template>
  </Story>
</template>
