<template>
  <SModalBase :name="name" :closable="false">
    <div class="SAlert">
      <SCard
        size="wide"
        :header="header"
        :footer="footer"
        :collapsable="false"
        :depth="3"
      >
        <div class="SAlert-content">
          <p class="SAlert-text">{{ text }}</p>
        </div>
      </SCard>
    </div>
  </SModalBase>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useHeader, useFooter, useButtonAction } from '../composables/Card'
import SIconInfo from './icons/SIconInfo.vue'
import SIconCheckCircle from './icons/SIconCheckCircle.vue'
import SIconWarning from './icons/SIconWarning.vue'
import SIconXCircle from './icons/SIconXCircle.vue'
import SCard from './SCard.vue'
import SModalBase from './SModalBase'

export default defineComponent({
  components: {
    SCard,
    SModalBase
  },

  props: {
    type: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, default: null },
    text: { type: String, default: null },
    actions: { type: Array, default: () => [] }
  },

  setup(props) {
    const header = useHeader({
      mode: props.type,
      icon: getIcon(),
      title: props.title
    })

    const footer = useFooter({
      actions: props.actions.map((action) => {
        return useButtonAction({
          kind: action.type,
          mode: action.mode,
          label: action.label,
          callback: action.callback
        })
      })
    })

    function getIcon() {
      switch (props.type) {
        case 'info':
          return SIconInfo
        case 'success':
          return SIconCheckCircle
        case 'warning':
          return SIconWarning
        case 'danger':
          return SIconXCircle
      }
    }

    return {
      header,
      footer
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SAlert {
  margin: 64px 16px;
  border-radius: 8px;
  max-width: 512px;

  @media (min-width: 544px) {
    margin: 96px auto;
  }
}

.SAlert-content {
  padding: 16px 24px;
}

.SAlert-text {
  font-size: 14px;
}
</style>
