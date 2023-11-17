<script setup lang="ts">
import SDesc from 'sefirot/components/SDesc.vue'
import SDescDay from 'sefirot/components/SDescDay.vue'
import SDescFile from 'sefirot/components/SDescFile.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescLink from 'sefirot/components/SDescLink.vue'
import SDescNumber from 'sefirot/components/SDescNumber.vue'
import SDescPill from 'sefirot/components/SDescPill.vue'
import SDescState from 'sefirot/components/SDescState.vue'
import SDescText from 'sefirot/components/SDescText.vue'

const title = 'Components / SDesc / 02. Row Direction'
const docs = '/components/desc'

function state() {
  return {
    cols: 1,
    gap: 16,
    labelWidth: 128,
    divider: false
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstNumber
        title="cols"
        v-model="state.cols"
      />
      <HstNumber
        title="gap"
        v-model="state.gap"
      />
      <HstNumber
        title="labelWidth"
        v-model="state.labelWidth"
      />
      <HstCheckbox
        title="divider"
        v-model="state.divider"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SDesc
          :cols="state.cols"
          :gap="state.gap"
          dir="row"
          :label-width="state.labelWidth"
          :divider="state.divider"
        >
          <SDescItem>
            <SDescLabel>Full name</SDescLabel>
            <SDescText>Margot Foster</SDescText>
          </SDescItem>
          <SDescItem>
            <SDescLabel>Website</SDescLabel>
            <SDescLink>https://margot.example</SDescLink>
          </SDescItem>
          <SDescItem>
            <SDescLabel>Birthday</SDescLabel>
            <SDescDay>1985-10-10</SDescDay>
          </SDescItem>
          <SDescItem>
            <SDescLabel>Age</SDescLabel>
            <SDescNumber>37</SDescNumber>
          </SDescItem>
          <SDescItem>
            <SDescLabel>Application for</SDescLabel>
            <SDescPill :pill="{ label: 'Frontend Developer' }" />
          </SDescItem>
          <SDescItem>
            <SDescLabel>Interview status</SDescLabel>
            <SDescState :state="{ mode: 'info', label: 'In progress' }" />
          </SDescItem>
          <SDescItem>
            <SDescLabel>About</SDescLabel>
            <SDescText>Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur <a href="https://hello.com">qui ipsum aliquip consequat</a> sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</SDescText>
          </SDescItem>
          <SDescItem>
            <SDescLabel>Attachments</SDescLabel>
            <SDescFile
              :file="[
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
