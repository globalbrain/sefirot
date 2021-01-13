<template>
  <div class="SInputDropdownItem">
    <div v-for="(i, index) in arrayItem" :key="index" class="item">
      <component
        :is="component(i)"
        :mute="i.value === null"
        :item="i"
        @remove="$emit('remove', i)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { isArray } from '../support/Util'
import { Item } from '../composables/Dropdown'
import SInputDropdownItemText from './SInputDropdownItemText.vue'
import SInputDropdownItemTextTag from './SInputDropdownItemTextTag.vue'
import SInputDropdownItemUser from './SInputDropdownItemUser.vue'
import SInputDropdownItemUserTag from './SInputDropdownItemUserTag.vue'

export default defineComponent({
  props: {
    item: { type: [Object, Array] as PropType<Item | Item[]>, required: true }
  },

  setup(props) {
    const isItemArray = computed(() => isArray(props.item))

    const arrayItem = computed(() => {
      return isArray(props.item) ? props.item : [props.item]
    })

    function component(item: Item) {
      if (item.type === 'text') {
        return isItemArray.value ? SInputDropdownItemTextTag : SInputDropdownItemText
      }

      if (item.type === 'user') {
        return isItemArray.value ? SInputDropdownItemUserTag : SInputDropdownItemUser
      }

      throw new Error('Invalid item type.')
    }

    return {
      arrayItem,
      component
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputDropdownItem {
  display: flex;
  flex-wrap: wrap;
  margin: -2px -8px;
}

.item {
  padding: 2px;
}
</style>
