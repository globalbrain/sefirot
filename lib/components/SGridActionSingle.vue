<template>
  <div class="SGridActionSingle">
    <button class="icon" @click.stop="action.callback">
      <component :is="action.icon" class="icon-svg" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    action: { type: Object, required: true }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGridActionSingle {
  display: flex;
  justify-content: flex-end;
  margin: -6px 0;
  padding-right: 8px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: background-color .25s;
}

.SGrid .row:hover .icon {
  .icon-svg {
    fill: var(--c-gray);
  }

  &:hover {
    background-color: var(--c-gray-light-2);
  }

  &:hover .icon-svg {
    fill: var(--c-black);
  }

  &:active {
    background-color: var(--c-gray-light-1);
  }
}

.icon-svg {
  display: block;
  width: 12px;
  height: 12px;
  fill: var(--c-gray-light-1);
  transition: fill .25s;
}
</style>
