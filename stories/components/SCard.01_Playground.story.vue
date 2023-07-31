<script setup lang="ts">
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SCardFooterAction from 'sefirot/components/SCardFooterAction.vue'
import SCardFooterActions from 'sefirot/components/SCardFooterActions.vue'
import SCardHeader from 'sefirot/components/SCardHeader.vue'
import SCardHeaderActionClose from 'sefirot/components/SCardHeaderActionClose.vue'
import SCardHeaderActions from 'sefirot/components/SCardHeaderActions.vue'
import SCardHeaderTitle from 'sefirot/components/SCardHeaderTitle.vue'

const title = 'Components / SCard / 01. Playground'
const docs = '/components/card'

function state() {
  return {
    cardMode: 'neutral',
    titleMode: 'neutral'
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
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
      <Board :title="title" :docs="docs">
        <div class="max-w-512">
          <SCard :mode="state.cardMode">
            <SCardHeader>
              <SCardHeaderTitle :mode="state.titleMode">Header title</SCardHeaderTitle>
              <SCardHeaderActions>
                <SCardHeaderActionClose />
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
                <SCardFooterAction mode="mute" label="Cancel" />
                <SCardFooterAction mode="info" label="Submit" />
              </SCardFooterActions>
            </SCardFooter>
          </SCard>
        </div>
      </Board>
    </template>
  </Story>
</template>
