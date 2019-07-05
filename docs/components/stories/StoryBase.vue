<template>
  <article class="StoryBase">
    <div class="header">
      <h1 class="name">{{ name }}</h1>
      <p class="path" v-if="path">{{ path }}</p>
    </div>

    <div class="component">
      <slot name="component" />
    </div>

    <section class="specs" v-if="description">
      <h2 class="specs-title">Description</h2>

      <div class="desc" v-html="description" />
    </section>

    <section class="specs" v-if="props">
      <h2 class="specs-title">Props</h2>

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
            <p class="specs-value">{{ prop.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="specs" v-if="events">
      <h2 class="specs-title">Events</h2>

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
            <p class="specs-value">{{ event.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    path: { type: String, default: null },
    description: { type: String, default: null },
    props: { type: Array, default: null },
    events: { type: Array, default: null }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.StoryBase {
  margin: 48px -12px;
  border: 1px solid var(--c-divider);

  @media (min-width: 375px) {
    margin: 48px -16px;
  }

  @media (min-width: 768px) {
    margin: 48px -24px;
  }
}

.header {
  padding: 24px 12px 0;

  @media (min-width: 375px) {
    padding: 24px 16px 0;
  }

  @media (min-width: 768px) {
    padding: 24px 32px 0;
  }

  @media (min-width: 1056px) {
    padding: 24px 48px 0;
  }
}

.name {
  line-height: 24px;
  font-size: 16px;
}

.path {
  padding-top: 4px;
  line-height: 20px;
  font-family: var(--font-family-mono);
  font-size: 14px;
  color: var(--c-gray);
  word-break: break-all;
}

.component {
  section {
    margin: 48px 12px;
    border: 0;
    padding: 0;

    @media (min-width: 375px) {
      margin: 48px 16px;
    }

    @media (min-width: 768px) {
      margin: 48px 32px;
    }

    @media (min-width: 1056px) {
      margin: 48px;
    }
  }

  section.dark {
    margin: 0;
    padding: 48px 12px;
    background-color: var(--c-black);

    @media (min-width: 375px) {
      padding: 48px 16px;
    }

    @media (min-width: 768px) {
      padding: 48px 32px;
    }

    @media (min-width: 1056px) {
      padding: 48px;
    }
  }

  h3 {
    padding-bottom: 16px;
    color: var(--c-gray);
  }
}

.specs {
  margin: 0;
  border: 0;
  padding: 48px 12px 64px;
  background-color: var(--c-white-soft);

  & + & {
    border-top: 1px solid var(--c-divider);
    padding-top: 48px;
  }

  @media (min-width: 375px) {
    padding: 48px 16px 64px;
  }

  @media (min-width: 768px) {
    padding: 48px 32px 64px;
  }

  @media (min-width: 1056px) {
    padding: 48px 48px 64px;
  }
}

.specs-title {
  margin: 0;
  line-height: 24px;
  font-size: 16px;
}

.specs-columns {
  display: none;

  @media (min-width: 768px) {
    display: flex;
    border-bottom: 1px solid var(--c-divider);
    padding-top: 24px;
    padding-bottom: 12px;
  }
}

.specs-column {
  font-size: 12px;
  color: var(--c-gray);
}

.specs-row {
  padding-top: 16px;

  & + & {
    border-top: 1px solid var(--c-divider);
    margin-top: 24px;
  }

  @media (min-width: 768px) {
    padding-top: 16px;

    & + & {
      margin-top: 16px;
    }

    .specs-record .specs-cell .specs-label {
      display: none;
    }
  }
}

.specs-record {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;

  & + & {
    border-top: 1px solid var(--c-divider);
  }

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
  font-size: 12px;
  color: var(--c-gray);
}

.specs-value {
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

.desc {
  padding-top: 24px;

  & >>> section {
    margin: 0;
    border: 0;
    padding: 0;
  }

  & >>> p {
    margin: 24px 0;

    &:first-child {
      margin: 0 0 24px;
    }
  }

  & >>> pre {
    margin: 24px 0;
    border-radius: 2px;
    padding: 12px 16px;
    font-size: 14px;
    color: var(--c-white);
    background-color: var(--c-black);
  }

  @media (min-width: 768px) {
    & >>> pre {
      margin: 0 -24px;
      padding: 20px 24px;
    }
  }
}
</style>
