<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SCard, { type Mode } from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SContent from 'sefirot/components/SContent.vue'

const title = 'Components / SCard / 01. Playground'
const docs = '/components/card'

function initState() {
  return {
    mode: 'neutral',
    muted: false
  } satisfies {
    mode: Mode
    muted: boolean
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.mode"
        title="mode"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
      />
      <HstCheckbox
        v-model="state.muted"
        title="muted"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <div class="s-max-w-512">
          <SCard :mode="state.mode" :muted="state.muted">
            <SCardBlock class="s-py-20 s-px-24">
              <SContent>
                <h2>Consectetur adipisicing</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </SContent>
            </SCardBlock>
            <SCardFooter class="s-py-16 s-px-24">
              <SButton size="md" label="Cancel" />
              <SButton size="md" mode="info" label="Save changes" />
            </SCardFooter>
          </SCard>
        </div>
      </Board>
    </template>
  </Story>
</template>
