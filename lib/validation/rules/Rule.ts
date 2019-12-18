export default abstract class Rule {
  /**
   * The message for the error.
   */
  message: string | null

  /**
   * Create a new rule instance.
   */
  constructor (message: string) {
    this.message = message
  }

  /**
   * Validate the given inuput.
   */
  abstract validate (value: any): boolean
}
