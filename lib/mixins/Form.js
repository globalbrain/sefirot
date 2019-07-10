import Validation from '../validation/Validation'

export default function Form () {
  return {
    data () {
      return {
        $initialForm: {}
      }
    },

    created () {
      this.$initialForm = JSON.parse(JSON.stringify(this.form))
    },

    methods: {
      reset () {
        this.form = JSON.parse(JSON.stringify(this.$initialForm))
      },

      validate () {
        Validation.validate(this.$v)
      }
    }
  }
}
