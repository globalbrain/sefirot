<script setup lang="ts">
import IconX from '@iconify-icons/ph/x-bold'
import SButton from 'sefirot/components/SButton.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlButton from 'sefirot/components/SControlButton.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import SControlText from 'sefirot/components/SControlText.vue'
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
    </template>

    <template #default="{ state }">
      <div id="sefirot-modals" />

      <Board :title="title" :docs="docs">
        <SButton mode="info" label="Open dialog" @click="open = true" />

        <SModal :open="open" @close="open = false">
          <SCard :size="state.cardSize" :mode="state.cardMode">
            <SCardBlock size="small" class="s-pl-24 s-pr-8">
              <SControl>
                <SControlLeft>
                  <SControlText class="s-font-w-500">
                    Header title
                  </SControlText>
                </SControlLeft>
                <SControlRight>
                  <SControlButton type="text" mode="mute" :icon="IconX" @click="open = false" />
                </SControlRight>
              </SControl>
            </SCardBlock>
            <SCardBlock class="s-p-24">
              <p class="s-text-14">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </SCardBlock>
            <SCardBlock size="large" class="s-px-24">
              <SControl>
                <SControlRight>
                  <SControlButton label="Cancel" @click="open = false" />
                  <SControlButton mode="info" label="Submit" @click="open = false" />
                </SControlRight>
              </SControl>
            </SCardBlock>
          </SCard>
        </SModal>
      </Board>
    </template>
  </Story>
</template>
