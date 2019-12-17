<template>
  <div class="FormParentComponent">
    <FormChildComponent />
  </div>
</template>

<script>
import FormChildComponent from './FormChildComponent'
import HandlesValidationError from '@/mixins/HandlesValidationError'

export default {
  components: {
    FormChildComponent
  },

  mixins: [HandlesValidationError()]
}
</script>
