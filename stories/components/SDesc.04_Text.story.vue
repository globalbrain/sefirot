<script setup lang="ts">
import SDesc from 'sefirot/components/SDesc.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescText from 'sefirot/components/SDescText.vue'

const title = 'Components / SDesc / 04. Text'
const docs = '/components/desc'

function initState() {
  return {
    lineClamp: 10,
    preWrap: false,
    linkify: true
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstNumber
        v-model="state.lineClamp"
        title="lineClamp"
      />
      <HstCheckbox
        v-model="state.preWrap"
        title="preWrap"
      />
      <HstCheckbox
        v-model="state.linkify"
        title="linkify"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SDesc cols="2" gap="24">
          <SDescItem span="2">
            <SDescLabel>Label</SDescLabel>
            <SDescText
              :line-clamp="state.lineClamp"
              :pre-wrap="state.preWrap"
              :linkify="state.linkify"
              :value="'By specifying the `:linkify`, you can enable the automatic conversion of URLs such as https://globalbrains.com and emails such as noreply@globalbrains.com inside text to clickable links. It will only convert plain URLs and any other Markdown syntax such as [link](https://globalbrains.com) and **Strong Text** will not be parsed.\nWhen enabling `preWrap`, this sentence should have a line break.'"
            />
          </SDescItem>
        </SDesc>
      </Board>
    </template>
  </Story>
</template>
