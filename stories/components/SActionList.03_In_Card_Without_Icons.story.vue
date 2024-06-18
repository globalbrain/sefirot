<script setup lang="ts">
import SActionList, { type ActionList } from 'sefirot/components/SActionList.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'

const title = 'Components / SActionList / 03. In Card Without Icons'
const docs = '/components/action-list'

const list: ActionList = [
  { label: 'Show activity' },
  { label: 'Preview' },
  { label: 'Delete item' }
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <SCard class="max-w-256">
        <SCardBlock>
          <div class="s-p-12">
            <SActionList :list="list" />
          </div>
        </SCardBlock>
      </SCard>
    </Board>
  </Story>
</template>
