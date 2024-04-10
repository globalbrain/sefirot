<script setup lang="ts">
import IconActivity from '@iconify-icons/ph/activity-bold'
import IconEye from '@iconify-icons/ph/eye-bold'
import IconTrash from '@iconify-icons/ph/trash-bold'
import SActionList, { type ActionList } from 'sefirot/components/SActionList.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'

const title = 'Components / SActionList / 02. In Card'
const docs = '/components/action-list'

const list: ActionList = [
  { leadIcon: IconActivity, label: 'Show activity', tooltip: { text: 'hey there' } },
  { leadIcon: IconEye, label: 'Preview' },
  {
    leadIcon: IconTrash,
    label: 'Delete item',
    disabled: true,
    onClick: () => alert('Delete item'),
    tooltip: { text: 'Disabled action' }
  }
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <SCard class="max-w-256">
        <SCardBlock>
          <div class="p-12">
            <SActionList :list="list" />
          </div>
        </SCardBlock>
      </SCard>
    </Board>
  </Story>
</template>
