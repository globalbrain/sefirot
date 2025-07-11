<script setup lang="ts">
import SDataList from 'sefirot/components/SDataList.vue'
import SDataListItem from 'sefirot/components/SDataListItem.vue'
import SPill from 'sefirot/components/SPill.vue'
import SState from 'sefirot/components/SState.vue'

const title = 'Components / SDataList / 01. Playground'

const actions = [
  // { icon: IconNotePencil, onClick: () => {} },
  // {
  //   type: 'menu' as const,
  //   icon: IconDotsThree,
  //   options: [
  //     { label: 'Inspect', onClick: () => {} },
  //     { label: 'Preview', onClick: () => {} },
  //     { label: 'Delete', onClick: () => {} }
  //   ]
  // }
]

function initState() {
  return {
    labelWidth: '160px'
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstText
        title="SDataList.labelWidth"
        v-model="state.labelWidth"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <SDataList :label-width="state.labelWidth">
          <SDataListItem>
            <template #label>Company</template>
            <template #value>ABC Data Studio</template>
          </SDataListItem>
          <SDataListItem>
            <template #label>Status</template>
            <template #value>
              <SState mode="info" label="Active" />
            </template>
          </SDataListItem>
          <SDataListItem tnum>
            <template #label>Num. of employees</template>
            <template #value>12,000</template>
          </SDataListItem>
          <SDataListItem>
            <template #label>Sectors</template>
            <template #value>
              <div class="s-flex s-gap-8">
                <SPill label="AI" />
                <SPill label="Data Science" />
              </div>
            </template>
          </SDataListItem>
          <SDataListItem>
            <template #label>Optional field</template>
          </SDataListItem>
          <SDataListItem dir="column" max-width="640px">
            <template #label>Description</template>
            <template #value>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </template>
          </SDataListItem>
        </SDataList>
      </Board>
    </template>
  </Story>
</template>
