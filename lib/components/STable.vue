<script setup lang="ts">
defineProps<{
  records: any[]
}>()
</script>

<template>
  <div class="STable">
    <table class="table" role="grid">
      <thead class="header">
        <slot name="header" />
      </thead>

      <tbody>
        <tr
          v-for="record in records"
          :key="record"
          class="row"
        >
          <slot name="body" :record="record" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="postcss">
.table {
  border: 1px solid var(--c-divider-light);
  border-collapse: separate;
  border-spacing: 0;
}

.row {
  border-top: 1px solid var(--c-divider-light);
  background-color: var(--c-bg);
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--c-bg-soft);
  }

  &:first-child {
    border-top: 0;
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }

  .dark & {
    background-color: var(--c-bg-mute);
  }

  .dark &:hover {
    background-color: var(--c-bg-soft);
  }
}
</style>
