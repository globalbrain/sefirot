<script setup lang="ts">
import IconActivity from '~icons/ph/activity'
import IconCurrencyCircleDollar from '~icons/ph/currency-circle-dollar'
import IconGear from '~icons/ph/gear'
import SLocalNav from 'sefirot/components/SLocalNav.vue'

const title = 'Components / SLocalNav / 01. Playground'
const docs = '/components/local-nav'

const navTitle = [
  { text: 'ABC Company', link: '#' },
  { text: 'Series A' }
]

const navActions = [
  { label: 'Edit title', onClick: () => {} },
  { label: 'About', onClick: () => {} }
]

const navMenu = [
  [
    { icon: IconActivity, text: 'Overview', link: '#', active: true },
    { icon: IconCurrencyCircleDollar, text: 'Payments', link: '#' }
  ],
  [
    { icon: IconGear, text: 'Settings', link: '#' }
  ]
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <SLocalNav
        :title="navTitle"
        :actions="navActions"
        :menu="navMenu"
      />
    </Board>
  </Story>
</template>
