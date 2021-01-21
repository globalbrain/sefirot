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
  border-bottom: 1px solid var(--c-divider-light);
  padding-bottom: 24px;

  & + & {
    padding-top: 20px;
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
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-light-2);

  @media (min-width: 512px) {
    width: 128px;
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
  line-height: 24px;
}
</style>
