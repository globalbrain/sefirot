<template>
  <li class="SDropdownItem" role="button" @click="$emit('click')">
    <div v-if="item" class="content">
      <component :is="component" :item="item" />
    </div>

    <div class="status">
      <SIconCheck v-if="isActive" class="status-icon" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ComputedRef, PropType, computed } from 'vue'
import { isArray, isEqual } from '../support/Utils'
import SIconCheck from './icons/SIconCheck.vue'
import SDropdownItemText from './SDropdownItemText.vue'
import SDropdownItemUser from './SDropdownItemUser.vue'

const props = defineProps({
  selected: { type: Object as PropType<ComputedRef<any>>, default: null },
  item: { type: Object as PropType<any>, default: null }
})

defineEmits(['click'])

const component = computed(() => {
  if (props.item.type === 'text') {
    return SDropdownItemText
  }

  if (props.item.type === 'user') {
    return SDropdownItemUser
  }

  throw new Error('Invalid item type.')
})

const isActive = computed(() => {
  if (!props.selected) {
    return false
  }

  const selected = props.selected.value
  const value = props.item.value

  return isArray(selected)
    ? !!selected.find(s => isEqual(s, value))
    : isEqual(selected, value)
})
</script>

<style lang="postcss" scoped>
.SDropdownItem {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px 8px 16px;
}

.status {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  width: 16px;
  height: 16px;
}

.status-icon {
  width: 16px;
  height: 16px;
  transform: translateY(1px);
  fill: var(--c-text-1);
  transition: fill .25s;
}
</style>
