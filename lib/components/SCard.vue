<template>
  <div class="SCard" :class="classes">
    <div class="SCard-container">
      <div v-if="header" class="header">
        <SCardHeader
          :is-collapsed="isCollapsed"
          :size="size"
          :title="header.title"
          :search="header.search"
          :actions="header.actions"
          :collapsable="collapsable"
          @collapse="toggleCollapse"
        />
      </div>

      <div class="SCard-content">
        <slot />

        <template v-for="(module, index) in modules">
          <component :is="module.component" :key="index" v-bind="module.data" />
        </template>

        <div v-if="footer" class="footer">
          <SCardFooter :size="size" :actions="footer.actions" />
        </div>

        <div v-if="loading" class="SCard-loader">
          <div class="SCard-loader-icon">
            <SIconPreloaderDark class="SCard-loader-svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from '@vue/composition-api'
import { Header, Module, Footer, Size, Mode } from '../composables/Card'
import SIconPreloaderDark from './icons/SIconPreloaderDark.vue'
import SCardHeader from './SCardHeader.vue'
import SCardFooter from './SCardFooter.vue'

export default defineComponent({
  components: {
    SIconPreloaderDark,
    SCardHeader,
    SCardFooter
  },

  props: {
    size: { type: String as PropType<Size>, default: 'compact' },
    border: { type: String as PropType<Mode>, default: 'default' },
    header: { type: Object as PropType<Header>, default: null },
    modules: { type: Array as PropType<Module[]>, default: () => [] },
    footer: { type: Object as PropType<Footer>, default: null },
    round: { type: Number, default: 8 },
    depth: { type: Number, default: 1 },
    collapsable: { type: Boolean, default: true },
    loading: { type: Boolean, default: false }
  },

  setup(props) {
    const isCollapsed = ref(false)

    const classes = computed(() => [
      { collapsed: isCollapsed.value },
      { loading: props.loading },
      props.size,
      `border-${props.border}`,
      `round${props.round}`,
      `depth${props.depth}`
    ])

    function toggleCollapse(): void {
      isCollapsed.value = !isCollapsed.value
    }

    return {
      isCollapsed,
      classes,
      toggleCollapse
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SCard {
  background-color: var(--card-bg);
}

.SCard.collapsed .SCard-container {
  height: 48px;
  overflow: hidden;
}

.SCard.loading .SCard-content {
  height: 128px;
  overflow: hidden;
}

.SCard.round4 { border-radius: 4px; }
.SCard.round8 { border-radius: 8px; }

.SCard.round4 .SCard-container { border-radius: 4px; }
.SCard.round8 .SCard-container { border-radius: 8px; }

.SCard.round4 .SCard-content { border-radius: 4px; }
.SCard.round8 .SCard-content { border-radius: 8px; }

.SCard.round4 .footer { border-radius: 0 0 4px 4px; }
.SCard.round8 .footer { border-radius: 0 0 8px 8px; }

.SCard.depth1 { box-shadow: var(--card-shadow-depth-1); }
.SCard.depth2 { box-shadow: var(--card-shadow-depth-2); }
.SCard.depth3 { box-shadow: var(--card-shadow-depth-3); }
.SCard.depth4 { box-shadow: var(--card-shadow-depth-4); }
.SCard.depth5 { box-shadow: var(--card-shadow-depth-5); }

.SCard.border-danger .SCard-container { box-shadow: inset 0 0 0 1px var(--c-danger); }

.SCard-content {
  position: relative;
}

.footer {
  overflow: hidden;
}

.SCard-loader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--c-white);
}

.SCard-loader-icon {
  width: 48px;
  height: 48px;
}

.SCard-loader-svg {
  width: 48px;
  height: 48px;
}

.SCard >>> .SCard {
  border: 1px solid var(--c-divider-light);

  &.depth1 { box-shadow: none; }
  &.depth2 { box-shadow: none; }
  &.depth3 { box-shadow: none; }
  &.depth4 { box-shadow: none; }
  &.depth5 { box-shadow: none; }
}
</style>
