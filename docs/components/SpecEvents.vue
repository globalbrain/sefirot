<template>
  <SpecBase class="SpecEvents" title="Events">
    <div v-for="(event, index) in events" :key="index" class="specs-row">
      <div class="specs-record">
        <div class="specs-cell name">
          <p class="specs-label">Name</p>
          <p class="specs-value">{{ event.name }}</p>
        </div>
        <div class="specs-cell description">
          <p class="specs-label">Description</p>
          <p class="specs-value" v-html="$md.renderInline(event.description)" />
        </div>
      </div>
    </div>
  </SpecBase>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Event } from '../composables/Spec'
import SpecBase from './SpecBase.vue'

export default defineComponent({
  components: {
    SpecBase
  },

  props: {
    events: { type: Array as PropType<Event[]>, required: true }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.specs-row {
  border-bottom: 1px solid var(--c-divider-light);
  padding-bottom: 20px;

  & + & {
    padding-top: 19px;
  }
}

.specs-cell {
  flex-shrink: 0;

  & + & {
    padding-top: 12px;
  }

  @media (min-width: 512px) {
    display: flex;
  }
}

.specs-label {
  flex-shrink: 0;
  margin: 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-light-2);

  @media (min-width: 512px) {
    width: 96px;
  }
}

.specs-value {
  flex-grow: 1;
  margin: 0;
  line-height: 20px;
  font-size: 14px;
}

.specs-cell.name .specs-value {
  font-family: var(--font-family-mono);
  font-size: 13px;
  font-weight: 700;
}

.specs-cell.description .specs-value {
  & >>> code {
    font-size: 13px;
  }
}
</style>
