<script setup lang="ts">
import IconActivity from '~icons/ph/activity-bold'
import IconCurrencyCircleDollar from '~icons/ph/currency-circle-dollar-bold'
import IconGear from '~icons/ph/gear-bold'
import SLocalNav from 'sefirot/components/SLocalNav.vue'

const title = 'Components / SLocalNav / 02. Avatar'
const docs = '/components/local-nav'

const navAvatar = {
  image: 'https://i.pravatar.cc/128?img=1',
  name: 'Jane Doe'
}

const navTitle = [
  { text: 'ABC Company', link: '#' },
  { text: 'Series A' }
]

const navDescription = '@jane.doe'

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
        :avatar="navAvatar"
        :title="navTitle"
        :description="navDescription"
        :menu="navMenu"
      />
    </Board>
  </Story>
</template>
