<template>
  <div class="Hamburger" :class="{ active }" role="button" @click="$emit('click')">
    <div class="container">
      <div class="top" />
      <div class="middle" />
      <div class="bottom" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    active: { type: Boolean, required: true }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.Hamburger {
  position: relative;
  width: 64px;
  height: 56px;

  &:hover {
    .top    { top: 4px; left: 0; transform: translateX(10px); }
    .middle { top: 11px; left: 0; transform: translateX(0px); }
    .bottom { top: 18px; left: 0; transform: translateX(8px); }
  }
}

.Hamburger.active {
  .top,
  .middle,
  .bottom {
    background-color: var(--c-text-2);
  }

  .top    { top: 11px; transform: translateX(0) rotate(225deg); }
  .middle { top: 11px; transform: translateX(24px); }
  .bottom { top: 11px; transform: translateX(0) rotate(135deg); }
}

.container {
  position: absolute;
  top: 17px;
  left: 20px;
  width: 20px;
  height: 24px;
  overflow: hidden;
}

.top,
.middle,
.bottom {
  position: absolute;
  width: 20px;
  height: 2px;
  background-color: var(--c-text-1);
  transition: all .25s;
}

.top    { top: 4px; left: 0; transform: translateX(0); }
.middle { top: 11px; left: 0; transform: translateX(10px); }
.bottom { top: 18px; left: 0; transform: translateX(6px); }
</style>
