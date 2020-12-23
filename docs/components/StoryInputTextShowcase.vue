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
        <SButton label="RESET" type="secondary" @click="validation.$reset" />
      </li>
      <li class="action">
        <SButton label="VALIDATE" @click="validation.$validate" />
      </li>
    </ul>
  </div>
</StoryBase>

```html
<template>
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
        <SButton label="RESET" type="secondary" @click="validation.$reset" />
      </li>
      <li class="action">
        <SButton label="VALIDATE" @click="validation.$validate" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { required } from '@globalbrain/sefirot/lib/validation/rules'
import { useData, useValidation } from '@globalbrain/sefirot/lib/composables/Form'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

export default defineComponent({
  components: {
    SButton,
    SInputText
  },

  setup () {
    const { data } = useData({
      name: ''
    })

    const validation = useValidation(data, {
      name: [required('Name is required.')]
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
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { required } from '@@/lib/validation/rules'
import { useData, useValidation } from '@@/lib/composables/Form'
import SButton from '@@/lib/components/SButton.vue'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    SInputText,
    StoryBase
  },

  setup () {
    const { data } = useData({
      name: ''
    })

    const validation = useValidation(data, {
      name: [required('Name is required.')]
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
