<script setup lang="ts">
import SDesc from 'sefirot/components/SDesc.vue'
import SDescAvatar from 'sefirot/components/SDescAvatar.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'

const title = 'Components / SDesc / 05. Avatar Many'
const docs = '/components/desc'

const avatars = [
  { avatar: 'https://i.pravatar.cc/64?img=1', name: 'Margot Foster' },
  { avatar: 'https://i.pravatar.cc/64?img=2', name: 'Chris Johna' },
  { avatar: 'https://i.pravatar.cc/64?img=3', name: 'Jenny Wilson' }
]
</script>

<template>
  <Board :title="title" :docs="docs">
    <SDesc gap="24">
      <SDescItem>
        <SDescLabel>Vertical stack</SDescLabel>
        <SDescAvatar :avatar="avatars" />
      </SDescItem>
      <SDescItem>
        <SDescLabel>Horizontal stack</SDescLabel>
        <SDescAvatar dir="row" :avatar="avatars" />
      </SDescItem>
    </SDesc>
  </Board>
</template>
