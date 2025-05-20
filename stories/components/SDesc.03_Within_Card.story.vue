<script setup lang="ts">
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
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

const title = 'Components / SDesc / 03. Within Card'
const docs = '/components/desc'
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title :docs>
      <div class="max-w-640">
        <SCard>
          <SCardBlock size="small" class="s-px-24">
            <div class="s-font-14 s-font-w-600">
              Applicant Information
            </div>
          </SCardBlock>
          <SCardBlock class="s-p-24">
            <SDesc cols="2" gap="24">
              <SDescItem span="1">
                <SDescLabel>Full name</SDescLabel>
                <SDescText>Margot Foster</SDescText>
              </SDescItem>
              <SDescItem span="1">
                <SDescLabel>Website</SDescLabel>
                <SDescLink>https://margot.example</SDescLink>
              </SDescItem>
              <SDescItem span="1">
                <SDescLabel>Birthday</SDescLabel>
                <SDescDay>1985-10-10</SDescDay>
              </SDescItem>
              <SDescItem span="1">
                <SDescLabel>Age</SDescLabel>
                <SDescNumber>37</SDescNumber>
              </SDescItem>
              <SDescItem span="1">
                <SDescLabel>Application for</SDescLabel>
                <SDescPill :pill="{ label: 'Frontend Developer' }" />
              </SDescItem>
              <SDescItem span="1">
                <SDescLabel>Interview status</SDescLabel>
                <SDescState :state="{ mode: 'info', label: 'In progress' }" />
              </SDescItem>
              <SDescItem span="2">
                <SDescLabel>About</SDescLabel>
                <SDescText>Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur <a href="https://hello.com">qui ipsum aliquip consequat</a> sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</SDescText>
              </SDescItem>
              <SDescItem span="2">
                <SDescLabel>Attachments</SDescLabel>
                <SDescFile
                  :item="[
                    { name: 'John-Doe-Resume-19851010.pdf', onDownload: () => {} },
                    { name: 'profile-photo.jpg', onDownload: () => {} }
                  ]"
                />
              </SDescItem>
            </SDesc>
          </SCardBlock>
        </SCard>
      </div>
    </Board>
  </Story>
</template>
