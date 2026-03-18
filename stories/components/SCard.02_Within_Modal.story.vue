<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SCard, { type Mode, type Size } from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SCardClose from 'sefirot/components/SCardClose.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SContent from 'sefirot/components/SContent.vue'
import SModal from 'sefirot/components/SModal.vue'
import { ref } from 'vue'

const title = 'Components / SCard / 02. Within Modal'
const docs = '/components/card'

const open = ref(false)

function initState() {
  return {
    cardSize: 'small',
    cardMode: 'neutral',
    titleMode: 'neutral'
  } satisfies {
    cardSize: Size
    cardMode: Mode
    titleMode: Mode
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.cardSize"
        title="Card size"
        :options="{
          small: 'small',
          medium: 'medium',
          large: 'large',
          xlarge: 'xlarge',
          xxlarge: 'xxlarge'
        }"
      />
      <HstSelect
        v-model="state.cardMode"
        title="Card mode"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SButton size="md" mode="info" label="Open dialog" @click="open = true" />

        <SModal :open @close="open = false">
          <SCard :size="state.cardSize" :mode="state.cardMode">
            <SCardClose @click="open = false" />
            <SCardBlock class="s-pt-20 s-px-24 s-pb-24">
              <SContent>
                <h2>Consectetur adipisicing</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </SContent>
            </SCardBlock>
            <SCardFooter class="s-py-16 s-px-24">
              <SButton size="md" label="Cancel" @click="open = false" />
              <SButton size="md" mode="info" label="Save changes" @click="open = false" />
            </SCardFooter>
          </SCard>
        </SModal>
      </Board>
    </template>
  </Story>
</template>
