<script setup lang="ts">
import IconLink from '~icons/ph/arrow-square-out-bold'
import IconPlus from '~icons/ph/plus-bold'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlActionBar from 'sefirot/components/SControlActionBar.vue'
import SControlActionBarButton from 'sefirot/components/SControlActionBarButton.vue'
import SControlActionBarCollapse from 'sefirot/components/SControlActionBarCollapse.vue'
import SControlButton from 'sefirot/components/SControlButton.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import SControlText from 'sefirot/components/SControlText.vue'

const title = 'Components / SCard / 01. Playground'
const docs = '/components/card'

function initState() {
  return {
    cardMode: 'neutral',
    titleMode: 'neutral'
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
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
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <div class="s-max-w-512">
          <SCard :mode="state.cardMode">
            <SCardBlock size="small" class="s-pl-24 s-pr-8">
              <SControl>
                <SControlLeft>
                  <SControlText class="s-font-w-500">
                    Header title
                  </SControlText>
                </SControlLeft>
                <SControlRight>
                  <SControlActionBar>
                    <SControlActionBarButton :icon="IconPlus" />
                    <SControlActionBarButton :icon="IconLink" href="https://sefirot.globalbrains.com/" />
                    <SControlActionBarCollapse />
                  </SControlActionBar>
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
                  <SControlButton label="Cancel" />
                  <SControlButton mode="info" label="Submit" />
                </SControlRight>
              </SControl>
            </SCardBlock>
          </SCard>
        </div>
      </Board>
    </template>
  </Story>
</template>
