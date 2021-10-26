<template lang="md">
<StoryBase title="Disabled options">
  <div class="input">
    <SInputDropdown
      v-model="value"
      name="dropdown-input"
      label="Disabling options"
      placeholder="Please select items"
      search
      :options="options"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="input">
    <SInputDropdown
      v-model="value"
      name="dropdown-input"
      label="Disabling options"
      placeholder="Please select items"
      search
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SInputDropdown from '@globalbrain/sefirot/lib/components/SInputDropdown.vue'

export default defineComponent({
  components: {
    SInputDropdown
  },

  setup() {
    const value = ref(['disabled-option', 'vuejs'])

    const options = [
      { text: 'Vue.js', value: 'vuejs' },
      { text: 'Adonis', value: 'adonis' },
      { text: 'Rails', value: 'rails' },
      { text: 'Sinatra', value: 'sinatra' },
      { text: 'Laravel', value: 'laravel' },
      { text: 'Phoenix', value: 'phoenix' },
      { text: 'Disabled option', value: 'disabled-option', disabled: true }
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
  max-width: 320px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputDropdown from '@@/lib/components/SInputDropdown.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputDropdown,
    StoryBase
  },

  setup() {
    const value = ref(['disabled-option', 'vuejs'])

    const options = [
      { type: 'text', text: 'Vue.js', value: 'vuejs' },
      { type: 'text', text: 'Adonis', value: 'adonis' },
      { type: 'text', text: 'Rails', value: 'rails' },
      { type: 'text', text: 'Sinatra', value: 'sinatra' },
      { type: 'text', text: 'Laravel', value: 'laravel' },
      { type: 'text', text: 'Phoenix', value: 'phoenix' },
      { type: 'text', text: 'Disabled option', value: 'disabled-option', disabled: true }
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
  max-width: 320px;
}
</style>
