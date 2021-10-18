<template>
  <div class="SSheetFooterAction">
    <SButton
      size="medium"
      :type="type"
      :mode="mode"
      :label="label"
      block
      @click="$emit('click')"
    />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import SButton from './SButton.vue'

type Type = 'primary' | 'secondary' | 'tertiary' | 'text' | 'mute'
type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export default defineComponent({
  components: {
    SButton
  },

  props: {
    type: { type: String as PropType<Type>, default: 'primary' },
    mode: { type: String as PropType<Mode>, default: 'neutral' },
    label: { type: String, default: null }
  }
})
</script>
