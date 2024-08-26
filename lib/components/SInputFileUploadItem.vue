<script setup lang="ts">
import { computed } from 'vue'
import { formatSize } from '../support/File'
import SButton from './SButton.vue'
import SCardBlock from './SCardBlock.vue'
import IconFileText from '~icons/ph/file-text'
import IconTrash from '~icons/ph/trash'

const props = defineProps<{
  file: File
}>()

defineEmits<{
  'remove': []
}>()

const fileSize = computed(() => {
  return formatSize(props.file)
})
</script>

<template>
  <SCardBlock class="SInputFileUploadItem">
    <p class="name">
      <IconFileText class="name-icon" />
      <span class="name-text">{{ file.name }}</span>
    </p>
    <div class="size">{{ fileSize }}</div>
    <SButton
      size="small"
      type="text"
      mode="mute"
      :icon="IconTrash"
      @click="$emit('remove')"
    />
  </SCardBlock>
</template>

<style lang="postcss" scoped>
.SInputFileUploadItem {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 8px 0 16px;
}

.name {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name-icon {
  width: 16px;
  height: 16px;
  color: var(--c-text-2);
}

.name-text {
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.size {
  line-height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
}
</style>
