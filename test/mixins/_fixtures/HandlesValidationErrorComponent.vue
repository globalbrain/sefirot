<template>
  <div class="HandlesValidationErrorComponent">
    <HandlesValidationErrorChildComponent />
  </div>
</template>

<script>
import HandlesValidationError from '@/mixins/HandlesValidationError'
import HandlesValidationErrorChildComponent from './HandlesValidationErrorChildComponent'

export default {
  components: {
    HandlesValidationErrorChildComponent
  },

  mixins: [HandlesValidationError()]
}
</script>
