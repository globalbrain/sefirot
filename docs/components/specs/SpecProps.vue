<template>
  <SpecBase class="SpecProps" title="Props">
    <div class="specs-columns">
      <p class="specs-column name">NAME</p>
      <p class="specs-column type">TYPE</p>
      <p class="specs-column required">REQUIRED</p>
      <p class="specs-column default">DEFAULT</p>
      <p class="specs-column description">DESCRIPTION</p>
    </div>

    <div class="specs-row" :key="index" v-for="(prop, index) in props">
      <div class="specs-record">
        <div class="specs-cell name">
          <p class="specs-label">NAME</p>
          <p class="specs-value">{{ prop.name }}</p>
        </div>
        <div class="specs-cell type">
          <p class="specs-label">TYPE</p>
          <p class="specs-value">{{ prop.type }}</p>
        </div>
        <div class="specs-cell required">
          <p class="specs-label">REQUIRED</p>
          <p class="specs-value">{{ prop.required ? 'Yes' : 'No' }}</p>
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

<script>
import SpecBase from './SpecBase'

export default {
  components: {
    SpecBase
  },

  props: {
    props: { type: Array, required: true }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.specs-columns {
  display: none;

  @media (min-width: 768px) {
    display: flex;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--c-divider);
    padding-top: 12px;
    padding-bottom: 12px;
  }
}

.specs-column {
  margin: 0;
  font-size: 12px;
  color: var(--c-gray);
}

.specs-row {
  border-bottom: 1px solid var(--c-divider);
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
  color: var(--c-gray);
}

.specs-value {
  margin: 0;
  font-size: 14px;
}

.specs-cell.name        { width: 96px; }
.specs-cell.type        { width: 96px; }
.specs-cell.required    { width: 96px; }
.specs-cell.default     { width: 96px; }
.specs-cell.description { width: 100%; }

@media (min-width: 768px) {
  .specs-column.name        { width: 96px; }
  .specs-column.type        { width: 96px; }
  .specs-column.required    { width: 80px; }
  .specs-column.default     { width: 96px; }
  .specs-column.description { flex-shrink: 1; flex-grow: 1; width: auto; }

  .specs-cell.name        { width: 96px; }
  .specs-cell.type        { width: 96px; }
  .specs-cell.required    { width: 80px; }
  .specs-cell.default     { width: 96px; }
  .specs-cell.description { flex-shrink: 1; flex-grow: 1; width: auto; }
}
</style>
