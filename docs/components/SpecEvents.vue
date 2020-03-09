<template>
  <SpecBase class="SpecEvents" title="Events">
    <div class="specs-columns">
      <p class="specs-column name">NAME</p>
      <p class="specs-column description">DESCRIPTION</p>
    </div>

    <div class="specs-row" :key="index" v-for="(event, index) in events">
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
import { defineComponent, PropType } from '@vue/composition-api'
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

.specs-columns {
  display: none;

  @media (min-width: 768px) {
    display: flex;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--c-divider-lighter);
    padding-top: 12px;
    padding-bottom: 12px;
  }
}

.specs-column {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-gray);
}

.specs-row {
  border-bottom: 1px solid var(--c-divider-lighter);
  padding-bottom: 24px;

  & + & {
    padding-top: 24px;
  }

  @media (min-width: 768px) {
    .specs-record .specs-cell .specs-label {
      display: none;
    }
  }
}

.specs-record {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;

  @media (min-width: 375px) {
    margin: 0 -16px;
  }

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    margin: 0 -12px;
  }
}

.specs-cell {
  flex-shrink: 0;
  padding: 12px;

  @media (min-width: 375px) {
    padding: 12px 16px;
  }

  @media (min-width: 768px) {
    padding: 0 12px;
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

.specs-cell.name        { width: 96px; }
.specs-cell.description { width: 100%; }

@media (min-width: 768px) {
  .specs-column.name        { width: 160px; }
  .specs-column.description { flex-shrink: 1; flex-grow: 1; width: auto; }

  .specs-cell.name        { width: 160px; }
  .specs-cell.description { flex-shrink: 1; flex-grow: 1; width: auto; }
}
</style>
