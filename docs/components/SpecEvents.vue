<template>
  <SpecBase class="SpecEvents" title="Events">
    <div v-for="(event, index) in events" :key="index" class="specs-row">
      <div class="specs-record">
        <div class="specs-cell name">
          <p class="specs-label">NAME</p>
          <p class="specs-value">{{ event.name }}</p>
        </div>
        <div class="specs-cell description">
          <p class="specs-label">DESCRIPTION</p>
          <p class="specs-value" v-html="event.description" />
        </div>
      </div>
    </div>
  </SpecBase>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import SpecBase from './SpecBase.vue'

export interface Event {
  name: string
  description: string
}

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
  border-bottom: 1px solid var(--c-divider-lighter);
  padding-bottom: 24px;

  & + & {
    padding-top: 24px;
  }
}

.specs-record {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;

  @media (min-width: 375px) {
    margin: 0 -16px;
  }
}

.specs-cell {
  flex-shrink: 0;
  padding: 12px;

  @media (min-width: 375px) {
    padding: 12px 16px;
  }
}

.specs-label {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-gray);
}

.specs-value {
  margin: 0;
  font-size: 14px;
}

.specs-cell.name .specs-value {
  font-family: var(--font-family-mono);
  font-size: 13px;
}

.specs-cell.name        { width: 100%; }
.specs-cell.description { width: 100%; }
</style>
