<template>
  <SCard class="SDropdown" :round="round" :depth="3">
    <div v-if="options.title" class="header">
      <p class="title">{{ options.title }}</p>
      <button class="close" @click="$emit('close')">
        <SIconX class="close-icon" />
      </button>
    </div>

    <div v-if="options.search" class="search">
      <SInputText
        size="mini"
        mode="filled"
        :placeholder="options.search.placeholder"
        :value="options.search.value.value"
        @input="v => options.search.onInput(v)"
      />
    </div>

    <div class="container">
      <ul v-if="options.items.value.length > 0" class="list">
        <li v-for="(item, index) in options.items.value" :key="index" class="item">
          <SDropdownItem :selected="options.selected" :item="item" @click="onClick(item)" />
        </li>
      </ul>

      <p v-else class="item-missing">{{ options.search.missing }}</p>
    </div>
  </SCard>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Dropdown, Item } from '../composables/Dropdown'
import SIconX from './icons/SIconX.vue'
import SInputText from './SInputText.vue'
import SCard from './SCard.vue'
import SDropdownItem from './SDropdownItem.vue'

export default defineComponent({
  components: {
    SIconX,
    SInputText,
    SCard,
    SDropdownItem
  },

  props: {
    round: { type: Number, default: 8 },
    options: { type: Object as PropType<Dropdown>, required: true }
  },

  setup (props, { emit }) {
    function onClick (item: Item): void {
      if (item.callback) {
        item.callback()
      } else if (props.options.callback) {
        props.options.callback(item)
      }

      if (props.options.closeOnClick) {
        emit('close')
      }
    }

    return {
      onClick
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SDropdown {
  display: inline-block;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--c-divider-light);
  padding: 0 0 0 16px;
}

.title {
  padding: 4px 0 3px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 31px;
  color: var(--c-text-2);

  &:hover {
    color: var(--c-text-1);
  }
}

.close-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.search {
  padding: 8px 8px 7px;
  border-bottom: 1px solid var(--c-divider-light);
}

.container {
  max-height: 304px;
  overflow-y: auto;
}

.item {
  &:hover {
    background-color: var(--dropdown-item-hover-bg);
  }
}

.item:first-child {
  padding-top: 1px;
}

.item + .item {
  border-top: 1px solid var(--c-divider-light);
}

.item-missing {
  margin: 0;
  padding: 8px 16px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}
</style>
