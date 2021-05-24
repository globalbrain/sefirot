<template lang="md">
<StoryBase title="Disabled">
  <div class="input">
    <SInputDropdown
      v-model="value"
      size="mini"
      mode="outlined"
      name="dropdown-input-disabled"
      label="Disabled input"
      :options="options"
      disabled
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="input">
    <SInputDropdown
      v-model="value"
      size="mini"
      mode="outlined"
      name="dropdown-input-disabled"
      label="Disabled input"
      :options="options"
      disabled
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useTextOption } from '@globalbrain/sefirot/lib/composables/InputDropdown'
import SInputDropdown from '@globalbrain/sefirot/lib/components/SInputDropdown.vue'

export default defineComponent({
  components: {
    SInputDropdown
  },

  setup() {
    const value = ref(['vuejs', 'laravel'])

    const options = [
      useTextOption({ text: 'Vue.js', value: 'vuejs' }),
      useTextOption({ text: 'Adonis', value: 'adonis' }),
      useTextOption({ text: 'Rails', value: 'rails' }),
      useTextOption({ text: 'Sinatra', value: 'sinatra' }),
      useTextOption({ text: 'Laravel', value: 'laravel' }),
      useTextOption({ text: 'Phoenix', value: 'phoenix' })
    ]

    return {
      value,
      options
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  position: relative;
  max-width: 320px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useSearch, useTextOption } from '@@/lib/composables/InputDropdown'
import SInputDropdown from '@@/lib/components/SInputDropdown.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputDropdown,
    StoryBase
  },

  setup() {
    const value = ref(['vuejs', 'laravel'])

    const options = [
      useTextOption({ text: 'Vue.js', value: 'vuejs' }),
      useTextOption({ text: 'Adonis', value: 'adonis' }),
      useTextOption({ text: 'Rails', value: 'rails' }),
      useTextOption({ text: 'Sinatra', value: 'sinatra' }),
      useTextOption({ text: 'Laravel', value: 'laravel' }),
      useTextOption({ text: 'Phoenix', value: 'phoenix' })
    ]

    return {
      value,
      options
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  position: relative;
  max-width: 320px;
}
</style>
