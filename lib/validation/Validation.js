import ValidationError from '../errors/ValidationError'

export default class validation {
  /**
   * Touch the given field.
   *
   * @param {Vuelidate | null} v
   * @return {void}
   */
  static touch (v) {
    v && v.$touch()
  }

  /**
   * Touch the given field.
   *
   * @param {Vuelidate} v
   * @return {void}
   */
  static validate (v) {
    this.touch(v)

    if (v.$invalid) {
      throw new ValidationError('Form is invalid')
    }
  }

  /**
   * Get name of rule which has error in given validation object.
   *
   * @param {Vuelidate | null} v
   * @return {string | null}
   */
  static getError (v) {
    if (!v || !v.$error) {
      return null
    }

    for (const name in v.$params) {
      if (v[name]) {
        continue
      }

      return name
    }

    return null
  }

  /**
   * Get the current error message from the given validation object.
   *
   * @param {Vuelidate} v
   * @return {string | null}
   */
  static getErrorMsg (v) {
    const error = this.getError(v)

    return error ? v.$params[error].msg : null
  }

  /**
   * Check if the given field has an error.
   *
   * @param {Vuelidate | null} v
   * @return {boolean}
   */
  static hasError (v) {
    return !!this.getError(v)
  }
}
