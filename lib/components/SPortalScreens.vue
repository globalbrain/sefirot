<template>
  <div class="SPortalScreens">
    <portal-target name="screen" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from '@vue/composition-api'
import { useRoute } from '../composables/Router'
import { useStore } from '../composables/Store'

type Styles = Record<'paddingRight' | 'top' | 'position', string | null>

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    const screenName = computed(() => store.state.screen.name)

    watch(screenName, (value) => { value === null ? close() : open() })

    watch(route, () => { store.dispatch('screen/close') })

    function close(): void {
      setTimeout(() => {
        const scrollY = document.body.style.top

        setBodyStyles({
          paddingRight: null,
          top: null,
          position: null
        })

        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }, 300)
    }

    function open(): void {
      const scrollBarWidth = getScrollbarWidth()

      setBodyStyles({
        paddingRight: `${scrollBarWidth}px`,
        top: `-${window.scrollY}px`,
        position: 'fixed'
      })
    }

    function setBodyStyles(styles: Styles): void {
      Object.assign(document.body.style, styles)
    }

    function getScrollbarWidth(): number {
      return window.innerWidth - document.documentElement.clientWidth
    }

    return {
      screenName
    }
  }
})
</script>
