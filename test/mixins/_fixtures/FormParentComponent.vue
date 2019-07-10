<template>
  <div class="FormParentComponent">
    <FormChildComponent />
  </div>
</template>

<script>
import HandlesValidationError from '@/mixins/HandlesValidationError'
import FormChildComponent from './FormChildComponent'

export default {
  components: {
    FormChildComponent
  },

  mixins: [HandlesValidationError()]
}
</script>
