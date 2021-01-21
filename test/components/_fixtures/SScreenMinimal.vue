<template>
  <div>
    <SPortalScreens />

    <SScreen
      name="s-screen-minimal"
      title="The title for the screen."
    >
      <p>This is the content for the window.</p>
    </SScreen>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SPortalScreens from 'sefirot/components/SPortalScreens.vue'
import SScreen from 'sefirot/components/SScreen.vue'

export default defineComponent({
  components: {
    SPortalScreens,
    SScreen
  }
})
</script>
