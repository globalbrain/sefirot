<template lang="md">
<StoryBase>
  <div class="form">
    <div class="input">
      <SInputTime
        v-model="data.time"
        label="Time"
        name="time"
        :validation="validation.time"
      />
    </div>
    <ul class="actions">
      <li class="action">
        <SButton label="RESET" type="secondary" @click="validation.$reset" />
      </li>
      <li class="action">
        <SButton label="VALIDATE" @click="validation.$validate" />
      </li>
    </ul>
  </div>
</StoryBase>

```html
Coming soon...
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { required } from '@@/lib/validation/rules'
import useForm from '@@/lib/compositions/useForm'
import SButton from '@@/lib/components/SButton.vue'
import SInputTime from '@@/lib/components/SInputTime.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    SInputTime,
    StoryBase
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        time: null
      },
      rules: {
        time: [required('The field is required.')]
      }
    })

    return {
      data,
      validation
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 140px;
}

.actions {
  display: flex;
  padding-top: 32px;
}

.action + .action {
  padding-left: 8px;
}
</style>
