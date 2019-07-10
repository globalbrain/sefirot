<template>
  <div class="FormChildComponent">
    <input class="name" :validation="$v.form.name" v-model="form.name">
    <input class="age" :validation="$v.form.age" v-model.number="form.age">

    <button class="reset" @click="reset">RESET</button>
    <button class="submit" @click="submit">SUBMIT</button>
  </div>
</template>

<script>
import Rules from '@/validation/rules/Rules'
import Form from '@/mixins/Form'

export default {
  mixins: [Form()],

  data () {
    return {
      valid: false,

      form: {
        name: '',
        age: null
      }
    }
  },

  validations: {
    form: {
      name: {
        required: Rules.required()
      },
      age: {
        required: Rules.required()
      }
    }
  },

  methods: {
    submit () {
      this.validate()

      this.valid = true
    }
  }
}
</script>
