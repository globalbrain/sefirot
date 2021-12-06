import { helpers, required as baseRequired } from '@vuelidate/validators'

const required = helpers.withMessage('The field is required.', baseRequired)

export { required }
