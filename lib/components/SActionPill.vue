<template>
  <div class="SActionPill" :class="[action.mode]">
    {{ action.label }}
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { PillAction } from '../composables/Action'

export default defineComponent({
  props: {
    action: { type: Object as PropType<PillAction>, required: true }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SActionPill {
  border-radius: 12px;
  padding: 0 12px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-dark-1);
}

.SActionPill.neutral { background-color: var(--c-black); }
.SActionPill.info    { background-color: var(--c-info); }
.SActionPill.success { background-color: var(--c-success); }
.SActionPill.warning { background-color: var(--c-warning); }
.SActionPill.danger  { background-color: var(--c-danger); }
</style>
