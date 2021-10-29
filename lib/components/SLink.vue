<template>
  <component
    :is="component"
    class="SLink"
    :class="{ link: href }"
    :href="href"
    :to="href"
    :target="target"
    :rel="rel"
  >
    <slot /><SIconExternalLink v-if="showExternal" class="SLink-icon" />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import SIconExternalLink from './icons/SIconExternalLink.vue'

const OUTBOUND_REGEX = /^[a-z]+:/i

export default defineComponent({
  components: {
    SIconExternalLink
  },

  props: {
    href: { type: String, default: null },
    icon: { type: Boolean, default: false }
  },

  setup(props) {
    const isExternal = computed(() => OUTBOUND_REGEX.test(props.href))

    const component = computed(() => {
      if (!props.href) {
        return 'span'
      }

      return isExternal.value ? 'a' : 'nuxt-link'
    })

    const target = computed(() => isExternal.value ? '_blank' : null)
    const rel = computed(() => isExternal.value ? 'noopener noreferrer' : null)

    const showExternal = computed(() => isExternal.value && props.icon)

    return {
      component,
      target,
      rel,
      showExternal
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SLink {
  display: inline-flex;
  align-items: center;
}

.SLink-icon {
  display: inline-block;
  margin-left: .3em;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
