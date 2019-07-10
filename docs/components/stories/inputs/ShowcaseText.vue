<template lang="md">
<StoryBase>
  <SInputText
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    placeholder="Placeholder text."
    :validation="$v.form.input"
    :actions="actions"
    v-model="form.input"
  />
</StoryBase>

```html
<template>
  <SInputText
    name="input"
    label="Label"
    note="Note text"
    help="This is a help text."
    placeholder="Placeholder text."
    :validation="$v.form.input"
    :actions="actions"
    v-model="form.input"
  />
</template>

<script>
import Rules from '@globalbrain/sefirot/lib/validation/rules/Rules'
import Form from '@globalbrain/sefirot/lib/mixins/Form'
import SInputText from '@globalbrain/sefirot/lib/components/inputs/SInputText'

export default {
  components: {
    SInputText
  },

  mixins: [Form()],

  data () {
    return {
      form: {
        input: ''
      },

      actions: [
        { type: 'secondary', label: 'RESET', callback: this.reset },
        { type: 'primary', label: 'VALIDATE', callback: this.submit }
      ]
    }
  },

  validations: {
    form: {
      input: {
        required: Rules.required('The field is required.')
      }
    }
  },

  methods: {
    submit () {
      this.validate()
    }
  }
}
</script>
```
</template>

<script>
import Rules from '@@/lib/validation/rules/Rules'
import Form from '@@/lib/mixins/Form'
import SInputText from '@@/lib/components/inputs/SInputText'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputText,
    StoryBase
  },

  mixins: [Form()],

  data () {
    return {
      form: {
        input: ''
      },

      actions: [
        { type: 'secondary', label: 'RESET', callback: this.reset },
        { type: 'primary', label: 'VALIDATE', callback: this.submit }
      ]
    }
  },

  validations: {
    form: {
      input: {
        required: Rules.required('The field is required.')
      }
    }
  },

  methods: {
    submit () {
      this.validate()
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}
</style>
