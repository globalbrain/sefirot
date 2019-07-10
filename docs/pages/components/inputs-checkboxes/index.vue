<template lang="md">
# Inputs: Checkboxes

Checkboxes allow the user to select one or more items from a set. Checkboxes can be used to turn an option on or off.

<SInputCheckboxes />
<SInputCheckbox />
</template>

<script>
import SInputCheckbox from '@/components/stories/inputs/SInputCheckbox'
import SInputCheckboxes from '@/components/stories/inputs/SInputCheckboxes'

export default {
  components: {
    SInputCheckbox,
    SInputCheckboxes
  },

  head: {
    title: 'Inputs: Checkboxes'
  },

  scrollToTop: true
}
</script>
