<template lang="md">
# Form

Form mixin adds various convenience methods and properties to handle form inputs, such as resetting form data and executing validation.

## Description

First of all, Form mixin depends on [Vuelidate](https://vuelidate.netlify.com). Please install Vuelidate to your app if you haven't yet. Once that's done, you may apply Form mixin to your Vue Component.

```html
<script>
import Form from '@globalbrain/sefirot/lib/mixins/Form'

export default {
  mixins: [Form()]
}
</script>
```

Form mixin provides 2 methods, `reset` and `validate`. `reset` is going to reset all form fields to its default (initial) values. `validate` method will validate all Vuelidate validation states.

### Resetting Form Values

To use `reset` feature, all form data must be defined under `form` property at Vue Component. A "form-data" is typically data that might change depending on users action.

Form mixin will copy initial form-data to its own special `$initialForm` property when Vue Component is created. Then, use that value to reset the form data.

```html
<template>
  <div>
    <input v-model="form.name">
    <input v-model="form.age">

    <button @click="reset">RESET</button>
  </div>
</template>

<script>
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
  }
}
</script>
```

### Validate Form

You may use `validate` method to validate all Vuelidate validations. The method will throw `ValidationError` when the form is invalid. It's advised to use the method in conjunction with [HandlesValidationError](/mixins/handles-validation-error) mixin so that the error can be caught in higher component and prevent crashing the app.

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
      this.validate()

      // ...
    }
  }
}
</script>
```
</template>

<script>
export default {
  head: {
    title: 'Form'
  },

  scrollToTop: true
}
</script>
