<template lang="md">
# HandlesValidationError

HandlesValidationError mixin will catch `ValidationError` and prevent the app from crashing.

## Description

The mixin is meant to be used with [Form](/mixins/form) mixin's `validate` method. You should apply HandlesValidationError mixin at the high-level component, probably most of the time on a layout component.

```html
<script>
import HandlesValidationError from '@globalbrain/sefirot/lib/mixins/HandlesValidationError'

export default {
  mixins: [HandlesValidationError()]
}
</script>
```

The mixin will add `errorCaptured` option to the Vue Component, which will catch `ValidationError`. And then, you could use [Form](/mixins/form) mixin at other component and use `validate` method to validate the form.

```html
<template>
  <div>
    <input :validation="$v.form.name" v-model="form.name">
    <input :validation="$v.form.age" v-model="form.age">

    <button @click="submit">SUBMIT</button>
  </div>
</template>

<script>
import Rules from '@globalbrain/sefirot/lib/validation/rules/Rules'
import Form from '@globalbrain/sefirot/lib/mixins/Form'

export default {
  mixins: [Form()],

  data () {
    return {
      form: {
        name: '',
        age: null
      }
    }
  },

  validations: {
    form: {
      name: {
        required: Rules.required('The name is required.')
      },
      age: {
        required: Rules.required('The age is required.')
      }
    }
  },

  methods: {
    submit () {
      // If validation fails, it will stop here.
      this.validate()

      // ...
    }
  }
}
</script>
```

See how `validate` method is used in `submit` method. If the validation fails, it will throw `ValidationError` and stop right there, then the component with `HandlesValidationError` applied will catch it.
</template>

<script>
export default {
  head: {
    title: 'HandlesValidationError'
  },

  scrollToTop: true
}
</script>
