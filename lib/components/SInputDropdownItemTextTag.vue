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

<script setup lang="ts">
import { PropType } from 'vue'
import SIconX from './icons/SIconX.vue'

defineProps({
  item: { type: Object as PropType<any>, required: true },
  disabled: { type: Boolean, default: false }
})

defineEmits(['remove'])
</script>

<style lang="postcss" scoped>
.SInputDropdownItemTextTag {
  display: flex;
  border-radius: 12px;
  padding: 0 0 0 10px;
  background-color: var(--c-white-mute);
}

.dark-mode .SInputDropdownItemTextTag {
  background-color: var(--c-black-mute);
}

.SInputDropdownItemTextTag.disabled {
  padding: 0 10px 0;
  background-color: var(--c-gray-light-4);

  .text {
    color: var(--c-text-2);
  }
}

.dark-mode .SInputDropdownItemTextTag.disabled {
  background-color: var(--c-gray-dark-2);
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

.dark-mode .remove {
  &:hover .remove-box {
    background-color: var(--c-gray-dark-2)
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
