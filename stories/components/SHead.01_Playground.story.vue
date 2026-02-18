<script setup lang="ts">
import SHead from 'sefirot/components/SHead.vue'
import SHeadLead from 'sefirot/components/SHeadLead.vue'
import SHeadTitle, { type Mode } from 'sefirot/components/SHeadTitle.vue'

const title = 'Components / SHead / 01. Playground'
const docs = '/components/head'

function initState() {
  return {
    mode: 'neutral',
    title: 'The head title',
    lead: 'Lorem ipsum dolor sit, amet consectetur.'
  } satisfies {
    mode: Mode
    title: string
    lead: string
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.mode"
        title="mode"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
      />
      <HstText
        v-model="state.title"
        title="Title"
      />
      <HstText
        v-model="state.lead"
        title="Lead"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
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
