<template>
  <div class="SpecBase">
    <h3 class="title">{{ title }}</h3>

    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: { type: String, required: true }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SpecBase {
  margin-top: 48px;

  & + & {
    margin-top: 64px;
  }
}

.title {
  margin: 0;
  border: 0;
  padding: 0 0 12px;
  line-height: 24px;
  font-size: 20px;
  font-weight: 500;
}
</style>
