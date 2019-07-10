import ValidationError from '../errors/ValidationError'

export default function HandlesValidationError () {
  return {
    errorCaptured (err) {
      if (err instanceof ValidationError) {
        return false
      }
    }
  }
}
