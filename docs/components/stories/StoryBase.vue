<template>
  <article class="StoryBase">
    <div class="header">
      <h1 class="name">{{ name }}</h1>
      <p class="path" v-if="path">{{ path }}</p>
    </div>

    <div class="component">
      <slot name="component" />
    </div>

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
        <p class="specs-cell name">{{ prop.name }}</p>
        <p class="specs-cell type">{{ prop.type }}</p>
        <p class="specs-cell required">{{ prop.required ? 'Yes' : 'No' }}</p>
        <p class="specs-cell default">{{ prop.default }}</p>
        <p class="specs-cell description">{{ prop.description }}</p>
      </div>
    </section>

    <section class="specs" v-if="events">
      <h2 class="specs-title">Events</h2>

      <div class="specs-columns">
        <p class="specs-column name">NAME</p>
        <p class="specs-column description">DESCRIPTION</p>
      </div>

      <div class="specs-row" :key="index" v-for="(event, index) in events">
        <p class="specs-cell name">{{ event.name }}</p>
        <p class="specs-cell description">{{ event.description }}</p>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    path: { type: String, default: null },
    props: { type: Array, default: null },
    events: { type: Array, default: null }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.StoryBase {
  margin: 48px 0;
  border: 1px solid var(--c-divider);
}

.header {
  padding: 24px 32px 0;
}

.name {
  line-height: 24px;
  font-size: 16px;
}

.path {
  padding-top: 0;
  font-family: var(--font-family-mono);
  font-size: 14px;
  color: var(--c-gray);
}

.component {
  section {
    margin: 48px 32px 48px;
    border: 0;
    padding: 0;
  }

  section.dark {
    margin: 0;
    padding: 48px 32px 48px;
    background-color: var(--c-black);
  }

  h3 {
    padding-bottom: 16px;
    color: var(--c-gray);
  }
}

.specs {
  margin: 0;
  border: 0;
  padding: 48px 32px 64px;
  background-color: var(--c-white-soft);

  & + & {
    border-top: 1px solid var(--c-divider);
    padding-top: 48px;
  }
}

.specs-title {
  margin: 0;
  padding-bottom: 24px;
  line-height: 24px;
  font-size: 16px;
}

.specs-columns {
  display: flex;
  padding-bottom: 12px;
}

.specs-column {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--c-gray);

  & + & {
    margin-left: 24px;
  }
}

.specs-column.name        { width: 72px; }
.specs-column.type        { width: 64px; }
.specs-column.required    { width: 64px; }
.specs-column.default     { width: 80px; }
.specs-column.description { flex-grow: 1; }

.specs-row {
  display: flex;
  border-top: 1px solid var(--c-divider);
  padding-top: 16px;

  & + & {
    margin-top: 16px;
  }
}

.specs-cell {
  flex-shrink: 0;
  font-size: 14px;

  & + & {
    margin-left: 24px;
  }
}

.specs-cell.name        { width: 72px; }
.specs-cell.type        { width: 64px; }
.specs-cell.required    { width: 64px; }
.specs-cell.default     { width: 80px; }
.specs-cell.description { flex-shrink: 1; flex-grow: 1; }
</style>
