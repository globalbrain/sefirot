<template>
  <div class="SInputDropdownItemUserTag" :class="{ disabled }">
    <div class="user">
      <div class="avatar">
        <SAvatar size="nano" :avatar="item.avatar" :name="item.name" />
      </div>

      <p class="name">{{ item.name }}</p>
    </div>

    <div v-if="!disabled" class="remove" role="button" @click="$emit('remove')">
      <div class="remove-box">
        <SIconX class="remove-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { UserItem } from '../composables/Dropdown'
import SIconX from './icons/SIconX.vue'
import SAvatar from './SAvatar.vue'

export default defineComponent({
  components: {
    SIconX,
    SAvatar
  },

  props: {
    item: { type: Object as PropType<UserItem>, required: true },
    disabled: { type: Boolean, default: false }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputDropdownItemUserTag {
  display: flex;
  border-radius: 12px;
  padding: 0 0 0 0;
  background-color: var(--c-white-mute);
}

.SInputDropdownItemUserTag.disabled {
  padding: 0 10px 0 0;
  background-color: var(--c-gray-light-4);
}

.user {
  display: flex;
}

.avatar {
  padding: 2px 0 0 2px;
}

.name {
  padding-left: 6px;
  font-size: 12px;
  font-weight: 500;
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
