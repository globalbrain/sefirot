<script setup lang="ts">
import IconDownloadSimple from '@iconify-icons/ph/download-simple-bold'
import IconFileText from '@iconify-icons/ph/file-text-bold'
import { computed } from 'vue'
import { isArray } from '../support/Utils'
import SButton from './SButton.vue'
import SDescEmpty from './SDescEmpty.vue'
import SIcon from './SIcon.vue'

export interface File {
  name: string
  onDownload(): void
}

const props = defineProps<{
  file?: File | File[] | null
}>()

const files = computed(() => {
  return props.file
    ? isArray(props.file) ? props.file : [props.file]
    : null
})
</script>

<template>
  <div v-if="files && files.length" class="SDescFile">
    <div class="value">
      <div v-for="file, index in files" :key="index" class="item">
        <div class="data">
          <div class="icon"><SIcon class="icon-svg" :icon="IconFileText" /></div>
          <div class="name">{{ file.name }}</div>
        </div>
        <div class="actions">
          <SButton
            size="small"
            type="text"
            mode="info"
            :icon="IconDownloadSimple"
            label="Download"
            @click="file.onDownload"
          />
        </div>
      </div>
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.value {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  margin-top: 2px;
  background-color: var(--c-gutter);
  overflow: hidden;
}

.item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 0 12px;
  width: 100%;
  height: 48px;
  background-color: var(--c-bg-elv-4);
}

.data {
  display: flex;
  gap: 8px;
  flex-grow: 1;
  align-items: center;
  overflow: hidden;
}

.icon-svg {
  width: 18px;
  height: 18px;
  color: var(--c-text-2);
}

.name {
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  flex-shrink: 0;
}
</style>
