<template>
  <SButton
    class="SCardFooterAction"
    :tag="action.link ? 'nuxt-link' : 'button'"
    :size="size === 'wide' ? 'medium' : 'small'"
    :type="action.type"
    :mode="action.mode"
    :to="action.link"
    :label="action.label"
    block
    @click="() => { action.callback && action.callback() }"
  />
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Action } from '../composables/Card'
import SButton from './SButton.vue'

type Size = 'compact' | 'wide'

export default defineComponent({
  components: {
    SButton
  },

  props: {
    size: { type: String as PropType<Size>, default: 'compact' },
    action: { type: Object as PropType<Action>, required: true }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SCardFooterAction.small.has-label {
  padding: 0 16px;
}
</style>
