<script setup lang="ts">
import IconCheck from '~icons/ph/check-bold'
import IconInfo from '~icons/ph/info-bold'
import IconWarning from '~icons/ph/warning-bold'
import IconWarningOctagon from '~icons/ph/warning-octagon-bold'

withDefaults(defineProps<{
  mode?: 'info' | 'success' | 'warning' | 'danger'
}>(), {
  mode: 'info'
})
</script>

<template>
  <div class="SAlert" :class="[mode]">
    <div class="icon">
      <IconInfo v-if="mode === 'info'" class="icon-svg" />
      <IconCheck v-if="mode === 'success'" class="icon-svg" />
      <IconWarning v-if="mode === 'warning'" class="icon-svg" />
      <IconWarningOctagon v-if="mode === 'danger'" class="icon-svg" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SAlert {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 14px;
  border: 1px solid var(--alert-border-color);
  border-radius: 6px;
  padding: 16px;
  background-color: var(--alert-bg-color);
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
}

.icon-svg {
  width: 20px;
  height: 20px;
  color: var(--alert-icon-color);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content :slotted(p) {
  margin: 0;
  max-width: 65ch;
  line-height: 24px;
  font-size: 14px;
}

.content :slotted(a) {
  font-weight: 500;
  text-decoration: underline;
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-2);
  }
}

.SAlert.info {
  --alert-border-color: var(--c-border-info-1);
  --alert-bg-color: var(--c-bg-info-dimm-a1);
  --alert-icon-color: var(--c-text-info-1);
}

.SAlert.success {
  --alert-border-color: var(--c-border-success-1);
  --alert-bg-color: var(--c-bg-success-dimm-a1);
  --alert-icon-color: var(--c-text-success-1);
}

.SAlert.warning {
  --alert-border-color: var(--c-border-warning-1);
  --alert-bg-color: var(--c-bg-warning-dimm-a1);
  --alert-icon-color: var(--c-text-warning-1);
}

.SAlert.danger {
  --alert-border-color: var(--c-border-danger-1);
  --alert-bg-color: var(--c-bg-danger-dimm-a1);
  --alert-icon-color: var(--c-text-danger-1);
}
</style>
