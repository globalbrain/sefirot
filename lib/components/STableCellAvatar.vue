<script setup lang="ts">
import { computed } from 'vue'
import SAvatar from './SAvatar.vue'
import SLink from './SLink.vue'

const props = defineProps<{
  value?: any
  record?: any
  image?: string | null | ((value: any, record: any) => string | null | undefined)
  name?: string | null | ((value: any, record: any) => string | null | undefined)
  link?: string | null | ((value: any, record: any) => string | null | undefined)
  color?: 'neutral' | 'soft' | 'mute'
  onClick?(value: any, record: any): void
}>()

const _image = computed(() => resolve(props.image))
const _name = computed(() => resolve(props.name))
const _link = computed(() => resolve(props.link))

function resolve(
  value?: string | null | ((value: any, record: any) => string | null | undefined)
) {
  if (value == null || value === '') {
    return null
  }

  return typeof value === 'function'
    ? value(props.value, props.record)
    : value
}
</script>

<template>
  <div class="STableCellAvatar" :class="[{ link: link || onClick }, color]">
    <SLink
      class="container"
      :href="_link ?? undefined"
      :role="onClick ? 'button' : null"
      @click="() => onClick?.(value, record)"
    >
      <div v-if="_image || _name" class="avatar">
        <SAvatar size="mini" :avatar="_image" :name="_name" />
      </div>
      <span v-if="_name" class="name">
        {{ _name }}
      </span>
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
  margin-left: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  .STableCellAvatar.soft & { color: var(--c-text-2); }
  .STableCellAvatar.mute & { color: var(--c-text-3); }

  .STableCellAvatar.neutral.link & { color: var(--c-tex-1); }
  .STableCellAvatar.soft.link &    { color: var(--c-text-2); }
  .STableCellAvatar.mute.link &    { color: var(--c-text-3); }

  .STableCellAvatar.link &       { color: var(--c-text-info-1); }
  .STableCellAvatar.link:hover & { color: var(--c-text-info-2); }

  .STableCellAvatar.neutral.link:hover & { color: var(--c-text-info-1); }
  .STableCellAvatar.soft.link:hover &    { color: var(--c-text-info-1); }
  .STableCellAvatar.mute.link:hover &    { color: var(--c-text-info-1); }
}
</style>
