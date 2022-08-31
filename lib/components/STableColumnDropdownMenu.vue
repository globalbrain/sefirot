<script setup lang="ts">
export interface TableColumnDropdownItemMenuOption {
  label: string
  onClick(): void
}

defineProps<{
  options: TableColumnDropdownItemMenuOption[]
}>()
</script>

<template>
  <ul class="STableColumnDropdownMenu">
    <li v-for="option in options" :key="option.label" class="item">
      <button class="button" @click="option.onClick">
        {{ option.label }}
      </button>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.STableColumnDropdownMenu {
  padding: 8px;
}

.button {
  display: block;
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  text-align: left;
  line-height: 32px;
  font-size: 12px;
  font-weight: 500;
  transition: color 0.25s, background-color 0.25s;

  &:hover {
    background-color: var(--c-bg-mute);
  }

  .dark &:hover {
    background-color: var(--c-bg);
  }
}
</style>
