<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SCardFooterAction from 'sefirot/components/SCardFooterAction.vue'
import SCardFooterActions from 'sefirot/components/SCardFooterActions.vue'
import SCardHeader from 'sefirot/components/SCardHeader.vue'
import SCardHeaderActionClose from 'sefirot/components/SCardHeaderActionClose.vue'
import SCardHeaderActions from 'sefirot/components/SCardHeaderActions.vue'
import SCardHeaderTitle from 'sefirot/components/SCardHeaderTitle.vue'
import SModal from 'sefirot/components/SModal.vue'
import { ref } from 'vue'

const title = 'Components / SCard / 02. Within Modal'
const docs = '/components/card'

const open = ref(false)

function state() {
  return {
    cardSize: 'small',
    cardMode: 'neutral',
    titleMode: 'neutral'
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="Card size"
        :options="{
          small: 'small',
          medium: 'medium',
          large: 'large',
          xlarge: 'xlarge',
          xxlarge: 'xxlarge'
        }"
        v-model="state.cardSize"
      />
      <HstSelect
        title="Card mode"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
        v-model="state.cardMode"
      />
      <HstSelect
        title="Title mode"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
        v-model="state.titleMode"
      />
    </template>

    <template #default="{ state }">
      <div id="sefirot-modals" />

      <Board :title="title" :docs="docs">
        <SButton mode="info" label="Open dialog" @click="open = true" />

        <SModal :open="open" @close="open = false">
          <SCard :size="state.cardSize" :mode="state.cardMode">
            <SCardHeader>
              <SCardHeaderTitle :mode="state.titleMode">Header title</SCardHeaderTitle>
              <SCardHeaderActions>
                <SCardHeaderActionClose @click="open = false" />
              </SCardHeaderActions>
            </SCardHeader>

            <SCardBlock space="compact">
              <p class="text-14">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </SCardBlock>

            <SCardFooter>
              <SCardFooterActions>
                <SCardFooterAction label="Cancel" @click="open = false" />
                <SCardFooterAction mode="info" label="Submit" @click="open = false" />
              </SCardFooterActions>
            </SCardFooter>
          </SCard>
        </SModal>
      </Board>
    </template>
  </Story>
</template>
