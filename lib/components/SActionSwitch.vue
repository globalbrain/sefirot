<template>
  <div class="SActionSwitch">
    <SInputSwitch
      :value="action.value"
      :mode="action.mode"
      :text="action.text"
      :text-mode="action.textMode"
      @change="emitCallback"
    />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { SwitchAction } from '../composables/Action'
import SInputSwitch from './SInputSwitch.vue'

export default defineComponent({
  components: {
    SInputSwitch
  },

  props: {
    action: { type: Object as PropType<SwitchAction>, required: true }
  },

  setup(props) {
    function emitCallback(value: boolean) {
      props.action.callback && props.action.callback(value)
    }

    return {
      emitCallback
    }
  }
})
</script>
