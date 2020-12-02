<template>
  <SpecBase class="SpecProps" title="Props">
    <div v-for="(prop, index) in props" :key="index" class="specs-row">
      <div class="specs-record">
        <div class="specs-cell name">
          <p class="specs-label">NAME</p>
          <p class="specs-value">{{ prop.name }}</code></p>
        </div>
        <div class="specs-cell type">
          <p class="specs-label">TYPE</p>
          <p class="specs-value">{{ prop.type }}</p>
        </div>
        <div class="specs-cell required">
          <p class="specs-label">REQUIRED</p>
          <p class="specs-value">{{ prop.required ? 'true' : 'false' }}</p>
        </div>
        <div class="specs-cell default">
          <p class="specs-label">DEFAULT</p>
          <p class="specs-value">{{ prop.default }}</p>
        </div>
        <div class="specs-cell description">
          <p class="specs-label">DESCRIPTION</p>
          <p class="specs-value" v-html="prop.description" />
        </div>
      </div>
    </div>
  </SpecBase>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import SpecBase from './SpecBase.vue'

export interface Prop {
  name: string
  type: string
  required: boolean
  default: string
  description: string
}

export default defineComponent({
  components: {
    SpecBase
  },

  props: {
    props: { type: Array as PropType<Prop[]>, required: true }
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

  @media (min-width: 768px) {
    padding: 12px 16px;
  }
}

.specs-label {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-light-2);
}

.specs-value {
  margin: 0;
  line-height: 20px;
  font-size: 14px;
}

.specs-cell.name .specs-value,
.specs-cell.type .specs-value,
.specs-cell.required .specs-value
.specs-cell.default .specs-value {
  font-family: var(--font-family-mono);
  font-size: 13px;
}

.specs-cell.description .specs-value {
  line-height: 24px;
}

.specs-cell.name        { width: 144px; }
.specs-cell.type        { width: 144px; }
.specs-cell.required    { width: 144px; }
.specs-cell.default     { width: 144px; }
.specs-cell.description { width: 100%; max-width: 592px; }

@media (min-width: 768px) {
  .specs-cell.name        { width: 25%; }
  .specs-cell.type        { width: 25%; }
  .specs-cell.required    { width: 25%; }
  .specs-cell.default     { width: 25%; }
}
</style>
