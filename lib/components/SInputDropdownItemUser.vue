<template>
  <div class="SInputDropdownItemUser" :class="{ disabled }">
    <div class="avatar">
      <SAvatar size="mini" :avatar="item.avatar" :name="item.name" />
    </div>

    <p class="name">{{ item.name }}</p>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { UserItem } from '../composables/Dropdown'
import SAvatar from './SAvatar.vue'

export default defineComponent({
  components: {
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

.SInputDropdownItemUser {
  position: relative;
}

.avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
}

.name {
  padding-left: 32px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
}
</style>
