<template lang="md">
<StoryBase>
  <SResponsive v-slot="{ el }" :bp="bp">
    <p class="text" :class="{ red: el.is.sm }">Turn red on >= 320px</p>
    <p class="text" :class="{ green: el.is.md }">Turn green on >= 480px</p>
    <p class="text" :class="{ blue: el.is.lg }">Turn blue on >= 640px</p>
  </SResponsive>
</StoryBase>

```html
<template>
  <SResponsive v-slot="{ el }" :bp="bp">
    <p class="text" :class="{ red: el.is.sm }">Turn red on >= 320px</p>
    <p class="text" :class="{ green: el.is.md }">Turn green on >= 480px</p>
    <p class="text" :class="{ blue: el.is.lg }">Turn blue on >= 640px</p>
  </SResponsive>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SResponsive, { BP } from '@@/lib/components/SResponsive.vue'

export default defineComponent({
  components: {
    SResponsive
  },

  setup () {
    const bp: BP = {
      sm: ({ w }) => w >= 320,
      md: ({ w }) => w >= 480,
      lg: ({ w }) => w >= 640
    }

    return {
      bp
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.text + .text {
  padding-top: 12px;
}

.text.red   { color: var(--c-danger); }
.text.green { color: var(--c-success); }
.text.blue  { color: var(--c-info-light); }
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SResponsive, { BP } from '@@/lib/components/SResponsive.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SResponsive,
    StoryBase
  },

  setup () {
    const bp: BP = {
      sm: ({ w }) => w >= 320,
      md: ({ w }) => w >= 480,
      lg: ({ w }) => w >= 640
    }

    return {
      bp
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.text {
  margin: 0;

  & + & {
    padding-top: 12px;
  }
}

.text.red   { color: var(--c-danger); }
.text.green { color: var(--c-success); }
.text.blue  { color: var(--c-info-light); }
</style>
