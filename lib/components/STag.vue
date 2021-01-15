<template>
  <div class="STag" :class="[size, mode]">
    <SLink class="text" :href="link">
      <component :is="icon" class="icon" /> {{ text }}
    </SLink>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Size, Mode } from '../composables/Tag'
import SLink from './SLink.vue'

export default defineComponent({
  components: {
    SLink
  },

  props: {
    size: { type: String as PropType<Size>, default: 'small' },
    mode: { type: String as PropType<Mode>, default: 'neutral' },
    icon: { type: Object, default: null },
    text: { type: String, default: null },
    link: { type: String, default: null }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.STag.small {
  .text {
    line-height: 20px;
    font-size: 12px;
  }

  .icon {
    margin-right: 6px;
    width: 12px;
    height: 12px;
  }
}

.STag.info .text    { color: var(--c-info); }
.STag.success .text { color: var(--c-success); }
.STag.warning .text { color: var(--c-warning); }
.STag.danger .text  { color: var(--c-danger); }
.STag.mute .text    { color: var(--c-text-2); }

.STag.info .text.link:hover    { color: var(--c-info-dark); }
.STag.success .text.link:hover { color: var(--c-success-dark); }
.STag.warning .text.link:hover { color: var(--c-warning-dark); }
.STag.danger .text.link:hover  { color: var(--c-danger-dark); }
.STag.mute .text.link:hover    { color: var(--c-info); }

.text {
  display: flex;
  align-items: center;
  transition: color .25s;
}

.icon {
  fill: currentColor;
}
</style>
