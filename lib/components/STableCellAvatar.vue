<script setup lang="ts">
import { computed } from 'vue'
import SAvatar from './SAvatar.vue'
import SLink from './SLink.vue'

const props = defineProps<{
  value?: any
  record?: any
  image?(value: any, record: any): string | undefined
  name?(value: any, record: any): string
  link?(value: any, record: any): string
  color?: 'neutral' | 'soft' | 'mute'
}>()

const _image = computed(() => props.image?.(props.value, props.record))
const _name = computed(() => props.name?.(props.value, props.record))
</script>

<template>
  <div class="STableCellAvatar" :class="[{ link}, color]">
    <SLink class="container" :href="link?.(value, record)">
      <div v-if="_image" class="avatar">
        <SAvatar size="mini" :avatar="_image" :name="_name" />
      </div>
      <span v-if="_name" class="name">{{ _name }}</span>
    </SLink>
  </div>
</template>

<style scoped lang="postcss">
.STableCellAvatar {
  min-height: 40px;
}

.container {
  display: flex;
  padding: 8px 16px;
}

.avatar {
  flex-shrink: 0;
}

.name {
  display: inline-block;
  margin-left: 12px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  .STableCellAvatar.soft & { color: var(--c-text-2); }
  .STableCellAvatar.mute & { color: var(--c-text-3); }

  .STableCellAvatar.neutral.link & { color: var(--c-tex-1); }
  .STableCellAvatar.soft.link &    { color: var(--c-text-2); }
  .STableCellAvatar.mute.link &    { color: var(--c-text-3); }

  .STableCellAvatar.link &       { color: var(--c-info); }
  .STableCellAvatar.link:hover & { color: var(--c-info-dark); }

  .STableCellAvatar.neutral.link:hover & { color: var(--c-info); }
  .STableCellAvatar.soft.link:hover &    { color: var(--c-info); }
  .STableCellAvatar.mute.link:hover &    { color: var(--c-info); }
}
</style>
