<script setup lang="ts">
import SInputDropdownItemAvatar from './SInputDropdownItemAvatar.vue'
import SInputDropdownItemText from './SInputDropdownItemText.vue'

export type Item = ItemText | ItemAvatar

export interface ItemBase {
  type?: 'text' | 'avatar'
  value: string | number | boolean
}

export interface ItemText extends ItemBase {
  type?: 'text'
  label: string
}

export interface ItemAvatar extends ItemBase {
  type: 'avatar'
  label: string
  image?: string | null
}

defineProps<{
  items: Item[]
  disabled: boolean
}>()

defineEmits<{
  (e: 'remove', value: string | number | boolean): void
}>()
</script>

<template>
  <div class="SInputDropdownItem">
    <div v-for="(item, index) in items" :key="index" class="item">
      <SInputDropdownItemText
        v-if="item.type === 'text' || item.type === undefined"
        :label="item.label"
        :value="item.value"
        :disabled="disabled"
        @remove="(v) => $emit('remove', v)"
      />
      <SInputDropdownItemAvatar
        v-if="item.type === 'avatar'"
        :label="item.label"
        :image="item.image"
        :value="item.value"
        :disabled="disabled"
        @remove="(v) => $emit('remove', v)"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SInputDropdownItem {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
