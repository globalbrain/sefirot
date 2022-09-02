<template>
  <td class="STableCell">
    <slot />
  </td>
</template>

<style scoped lang="postcss">
.STableCell {
  border-top: 1px solid var(--c-divider-light);

  & + & {
    border-left: 1px solid var(--c-divider-light);
  }

  .STableRow:first-child &:first-child { border-radius: 12px 0 0 0; }
  .STableRow:first-child &:last-child  { border-radius: 0 12px 0 0; }
  .STableRow:last-child &:first-child  { border-radius: 0 0 0 12px; }
  .STableRow:last-child &:last-child   { border-radius: 0 0 12px 0; }
}
</style>
