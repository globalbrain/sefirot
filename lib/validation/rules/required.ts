import { helpers, required as baseRequired } from '@vuelidate/validators'

export const required = helpers.withMessage('The field is required.', baseRequired)
