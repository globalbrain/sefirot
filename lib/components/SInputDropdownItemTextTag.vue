<template>
  <div class="SInputDropdownItemTextTag" :class="{ disabled }">
    <p class="text">{{ item.text }}</p>

    <div v-if="!disabled" class="remove" role="button" @click="$emit('remove')">
      <div class="remove-box">
        <SIconX class="remove-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Item } from '../composables/Dropdown'
import SIconX from './icons/SIconX.vue'

export default defineComponent({
  components: {
    SIconX
  },

  props: {
    item: { type: Object as PropType<Item>, required: true },
    disabled: { type: Boolean, default: false }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputDropdownItemTextTag {
  display: flex;
  border-radius: 12px;
  padding: 0 0 0 10px;
  background-color: var(--c-white-mute);
}

.SInputDropdownItemTextTag.disabled {
  padding: 0 10px 0;
  background-color: var(--c-gray-light-4);
}

.text {
  margin: 0;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.remove {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  width: 24px;
  height: 24px;

  &:hover .remove-box {
    color: var(--c-text-1);
    background-color: var(--c-gray-light-4)
  }
}

.remove-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: var(--c-text-2);
  transition: color .25s, background-color .25s;
}

.remove-icon {
  width: 12px;
  height: 12px;
  fill: currentColor;
}
</style>
