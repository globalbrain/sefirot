<template>
  <div class="HandlesValidationErrorChildComponent">
    <button class="generic-error" @click="throwGenericError">GENERIC ERROR</button>
    <button class="validation-error" @click="throwValidationError">VALIDATION ERROR</button>
  </div>
</template>

<script>
import ValidationError from '@/errors/ValidationError'

export default {
  methods: {
    throwGenericError () {
      throw new Error('Generic Error')
    },

    throwValidationError () {
      throw new ValidationError('Validation Error')
    }
  }
}
</script>
