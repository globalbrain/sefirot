<script setup lang="ts">
import IconActivity from '~icons/ph/activity-bold'
import IconEye from '~icons/ph/eye-bold'
import IconTrash from '~icons/ph/trash-bold'
import SActionList, { type ActionList } from 'sefirot/components/SActionList.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'

const title = 'Components / SActionList / 02. In Card'
const docs = '/components/action-list'

const list: ActionList = [
  { leadIcon: IconActivity, label: 'Show activity' },
  { leadIcon: IconEye, label: 'Preview' },
  { leadIcon: IconTrash, label: 'Delete item' }
]
</script>

<template>
  <Board :title="title" :docs="docs">
    <SCard class="max-w-256">
      <SCardBlock>
        <div class="p-12">
          <SActionList :list="list" />
        </div>
      </SCardBlock>
    </SCard>
  </Board>
</template>
