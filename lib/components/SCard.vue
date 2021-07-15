<template>
  <div class="SCard" :class="classes">
    <div v-if="header" class="header">
      <SCardHeader
        :is-collapsed="isCollapsed"
        :title="header.title"
        :actions="header.actions"
        :mode="header.mode"
        :collapsable="collapsable"
        @collapse="toggleCollapse"
      />
    </div>

    <div class="content">
      <slot />
    </div>

    <div v-if="showFooter" class="footer">
      <SCardFooter :actions="footer.actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from '@vue/composition-api'
import { Header, Footer, Mode } from '../composables/Card'
import { get } from '../composables/Utils'
import SCardHeader from './SCardHeader.vue'
import SCardFooter from './SCardFooter.vue'

export default defineComponent({
  components: {
    SCardHeader,
    SCardFooter
  },

  props: {
    header: { type: Object as PropType<Header>, default: null },
    footer: { type: Object as PropType<Footer>, default: null },
    mode: { type: String as PropType<Mode>, default: 'neutral' },
    round: { type: Number, default: 8 },
    depth: { type: Number, default: 0 },
    collapsable: { type: Boolean, default: true }
  },

  setup(props) {
    const isCollapsed = ref(false)
    const showFooter = computed(() => get(props.footer?.actions ?? []).length > 0)

    const classes = computed(() => [
      { collapsed: isCollapsed.value },
      props.mode,
      `round-${props.round}`,
      `depth-${props.depth}`
    ])

    function toggleCollapse(): void {
      isCollapsed.value = !isCollapsed.value
    }

    return {
      isCollapsed,
      showFooter,
      classes,
      toggleCollapse
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SCard {
  border: 1px solid transparent;
  background-color: var(--card-bg);
}

.SCard.neutral { border-color: var(--c-divider-light); }
.SCard.info    { border-color: var(--c-info); }
.SCard.success { border-color: var(--c-success); }
.SCard.warning { border-color: var(--c-warning); }
.SCard.danger  { border-color: var(--c-danger); }

.SCard.collapsed {
  height: 48px;
  overflow: hidden;
}

.SCard.round-4 { border-radius: 4px; }
.SCard.round-8 { border-radius: 8px; }

.SCard.depth-0 { box-shadow: none; }
.SCard.depth-1 { box-shadow: var(--card-shadow-depth-1); }
.SCard.depth-2 { box-shadow: var(--card-shadow-depth-2); }
.SCard.depth-3 { box-shadow: var(--card-shadow-depth-3); }
.SCard.depth-4 { box-shadow: var(--card-shadow-depth-4); }
.SCard.depth-5 { box-shadow: var(--card-shadow-depth-5); }

.content {
  position: relative;
}

.footer {
  overflow: hidden;
}
</style>
