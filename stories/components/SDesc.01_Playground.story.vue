<script setup lang="ts">
import IconDotsThree from '~icons/ph/dots-three-bold'
import IconNotePencil from '~icons/ph/note-pencil'
import SDesc from 'sefirot/components/SDesc.vue'
import SDescAvatar from 'sefirot/components/SDescAvatar.vue'
import SDescDay from 'sefirot/components/SDescDay.vue'
import SDescFile from 'sefirot/components/SDescFile.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescLink from 'sefirot/components/SDescLink.vue'
import SDescNumber from 'sefirot/components/SDescNumber.vue'
import SDescPill from 'sefirot/components/SDescPill.vue'
import SDescState from 'sefirot/components/SDescState.vue'
import SDescText from 'sefirot/components/SDescText.vue'

const title = 'Components / SDesc / 01. Playground'
const docs = '/components/desc'

const actions = [
  { icon: IconNotePencil, onClick: () => {} },
  {
    type: 'menu' as const,
    icon: IconDotsThree,
    options: [
      { label: 'Inspect', onClick: () => {} },
      { label: 'Preview', onClick: () => {} },
      { label: 'Delete', onClick: () => {} }
    ]
  }
]

function initState() {
  return {
    divider: true
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstCheckbox
        v-model="state.divider"
        title="divider"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SDesc
          cols="2"
          gap="24"
          :divider="state.divider"
        >
          <SDescItem span="2" :divider="false">
            <SDescLabel :actions>Account</SDescLabel>
            <SDescAvatar
              :avatar="{
                avatar: 'https://i.pravatar.cc/64?img=1',
                name: 'margot.foster'
              }"
            />
          </SDescItem>
          <SDescItem span="1">
            <SDescLabel :actions>Full name</SDescLabel>
            <SDescText>Margot Foster</SDescText>
          </SDescItem>
          <SDescItem span="1">
            <SDescLabel :actions>Website</SDescLabel>
            <SDescLink>https://margot.example</SDescLink>
          </SDescItem>
          <SDescItem span="1">
            <SDescLabel :actions>Birthday</SDescLabel>
            <SDescDay>1985-10-10</SDescDay>
          </SDescItem>
          <SDescItem span="1">
            <SDescLabel :actions>Age</SDescLabel>
            <SDescNumber>37</SDescNumber>
          </SDescItem>
          <SDescItem span="1">
            <SDescLabel :actions>Application for</SDescLabel>
            <SDescPill :pill="{ label: 'Frontend Developer' }" />
          </SDescItem>
          <SDescItem span="1">
            <SDescLabel :actions>Interview status</SDescLabel>
            <SDescState :state="{ mode: 'info', label: 'In progress' }" />
          </SDescItem>
          <SDescItem span="2">
            <SDescLabel :actions>About</SDescLabel>
            <SDescText>Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur <a href="https://hello.com">qui ipsum aliquip consequat</a> sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</SDescText>
          </SDescItem>
          <SDescItem span="2">
            <SDescLabel :actions>Attachments</SDescLabel>
            <SDescFile
              :item="[
                { name: 'John-Doe-Resume-19851010.pdf', onDownload: () => {} },
                { name: 'profile-photo.jpg', onDownload: () => {} }
              ]"
            />
          </SDescItem>
        </SDesc>
      </Board>
    </template>
  </Story>
</template>
