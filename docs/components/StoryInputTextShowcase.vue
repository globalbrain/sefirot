<template lang="md">
<StoryBase>
  <div class="form">
    <div class="input">
      <SInputText
        v-model="data.name"
        name="name"
        label="Label"
        note="Required"
        help="Please fill in your name."
        placeholder="John Doe"
        :validation="validation.name"
      />
    </div>
    <ul class="actions">
      <li class="action">
        <SButton label="INIT" type="secondary" @click="validation.$init" />
      </li>
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
import { createComponent } from '@vue/composition-api'
import { required } from '@@/lib/validation/rules'
import useForm from '@@/lib/compositions/useForm'
import SButton from '@@/lib/components/SButton.vue'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default createComponent({
  components: {
    SButton,
    SInputText,
    StoryBase
  },

  setup () {
    const { data, validation } = useForm({
      data: {
        name: 'Kia Ishii'
      },
      rules: {
        name: [required('Name is required.')]
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
  max-width: 320px;
}

.actions {
  display: flex;
  padding-top: 32px;
}

.action + .action {
  padding-left: 8px;
}
</style>
