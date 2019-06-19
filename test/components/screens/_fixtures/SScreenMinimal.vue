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

<script>
import SPortalScreens from '@/components/portals/SPortalScreens'
import SScreen from '@/components/screens/SScreen'

export default {
  components: {
    SPortalScreens,
    SScreen
  }
}
</script>
