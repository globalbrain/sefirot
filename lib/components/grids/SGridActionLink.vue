<template>
  <div class="SGridActionLink">
    <div class="icon">
      <SIconChevronRight class="icon-svg" />
    </div>
  </div>
</template>

<script>
import SIconChevronRight from '../icons/SIconChevronRight'

export default {
  components: {
    SIconChevronRight
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGridActionLink {
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  transition: transform .25s;
}

.SGrid .row:hover .icon {
  transform: translateX(4px);

  .icon-svg {
    fill: var(--c-gray);
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
