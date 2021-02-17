<template>
  <div class="SActionAvatar">
    <div v-for="(avatar, index) in action.avatars" :key="index" class="avatars">
      <div class="avatar">
        <SAvatar :avatar="avatar.avatar" :name="avatar.name" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { AvatarAction } from '../composables/Action'
import SAvatar from './SAvatar.vue'

export default defineComponent({
  components: {
    SAvatar
  },

  props: {
    action: { type: Object as PropType<AvatarAction>, required: true }
  }
})
</script>
