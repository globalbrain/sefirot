<template>
  <div class="SInputDropdownItem">
    <div v-for="(i, index) in arrayItem" :key="index" class="item">
      <component
        :is="component(i)"
        :mute="shouldMute(i)"
        :item="i"
        :disabled="disabled"
        @remove="$emit('remove', i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { isArray } from '../support/Utils'
import SInputDropdownItemText from './SInputDropdownItemText.vue'
import SInputDropdownItemTextTag from './SInputDropdownItemTextTag.vue'
import SInputDropdownItemUser from './SInputDropdownItemUser.vue'
import SInputDropdownItemUserTag from './SInputDropdownItemUserTag.vue'

const props = defineProps({
  item: { type: [Object, Array] as PropType<any>, default: null },
  disabled: { type: Boolean, default: false }
})

defineEmits(['remove'])

const isItemArray = computed(() => isArray(props.item))

const arrayItem = computed(() => {
  return isArray(props.item) ? props.item : [props.item]
})

function component(item: any): any {
  if (item.type === 'text') {
    return isItemArray.value ? SInputDropdownItemTextTag : SInputDropdownItemText
  }

  if (item.type === 'user') {
    return isItemArray.value ? SInputDropdownItemUserTag : SInputDropdownItemUser
  }

  throw new Error('Invalid item type.')
}

function shouldMute(item: any) {
  return item.value === null
}
</script>

<style lang="postcss" scoped>
.SInputDropdownItem {
  display: flex;
  flex-wrap: wrap;
  margin: -2px -8px;
}

.item {
  padding: 2px;
}
</style>
