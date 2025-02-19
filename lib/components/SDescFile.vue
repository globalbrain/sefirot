<script setup lang="ts">
import IconDownloadSimple from '~icons/ph/download-simple-bold'
import IconFileText from '~icons/ph/file-text-bold'
import { computed } from 'vue'
import SButton from './SButton.vue'
import SDescEmpty from './SDescEmpty.vue'

export interface Item {
  name: string
  onDownload(): void
}

const props = defineProps<{
  item?: Item | Item[] | null
}>()

const items = computed(() => {
  return props.item
    ? Array.isArray(props.item) ? props.item : [props.item]
    : null
})
</script>

<template>
  <div v-if="items && items.length" class="SDescFile">
    <div class="value">
      <div v-for="item, index in items" :key="index" class="item">
        <div class="data">
          <div class="icon"><IconFileText class="icon-svg" /></div>
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="actions">
          <SButton
            size="small"
            type="text"
            mode="info"
            :icon="IconDownloadSimple"
            label="Download"
            @click="item.onDownload"
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
  margin-top: 4px;
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
