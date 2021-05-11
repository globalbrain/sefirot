<template>
  <SpecBase class="SpecProps" title="Props">
    <div v-for="(prop, index) in props" :key="index" class="specs-row">
      <div class="specs-record">
        <div class="specs-cell name">
          <p class="specs-label">Name</p>
          <p class="specs-value">{{ prop.name }}</code></p>
        </div>
        <div class="specs-cell type">
          <p class="specs-label">Type</p>
          <p class="specs-value">{{ prop.type }}</p>
        </div>
        <div class="specs-cell required">
          <p class="specs-label">Required</p>
          <p class="specs-value">{{ prop.required ? 'true' : 'false' }}</p>
        </div>
        <div class="specs-cell default">
          <p class="specs-label">Default</p>
          <p class="specs-value">{{ prop.default }}</p>
        </div>
        <div class="specs-cell description">
          <p class="specs-label">Description</p>
          <p class="specs-value" v-html="$md.renderInline(prop.description)" />
        </div>
      </div>
    </div>
  </SpecBase>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Prop } from '../composables/Spec'
import SpecBase from './SpecBase.vue'

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
  margin: 0;
  line-height: 20px;
  font-size: 14px;
}

.specs-cell.name .specs-value,
.specs-cell.type .specs-value,
.specs-cell.required .specs-value,
.specs-cell.default .specs-value {
  font-family: var(--font-family-mono);
  font-size: 13px;
}

.specs-cell.type .specs-value,
.specs-cell.required .specs-value,
.specs-cell.default .specs-value {
  display: inline-block;
  border-radius: 4px;
  padding: 0 6px;
  font-family: var(--font-family-mono);
  font-weight: 500;
  color: var(--c-info-light);
  background-color: var(--c-white-mute);
  word-break: break-all;
}

.specs-cell.name .specs-value {
  font-weight: 700;
}

.specs-cell.description .specs-value {
  & >>> code {
    font-size: 13px;
  }
}
</style>
