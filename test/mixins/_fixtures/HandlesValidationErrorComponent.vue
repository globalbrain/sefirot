<template>
  <div class="HandlesValidationErrorComponent">
    <HandlesValidationErrorChildComponent />
  </div>
</template>

<script>
import HandlesValidationErrorChildComponent from './HandlesValidationErrorChildComponent'
import HandlesValidationError from '@/mixins/HandlesValidationError'

export default {
  components: {
    HandlesValidationErrorChildComponent
  },

  mixins: [HandlesValidationError()]
}
</script>
