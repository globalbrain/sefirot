<template>
  <StoryBase
    class="StorySScreen"
    name="SScreen"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Minimal Screen</h3>

        <div class="actions">
          <SButton class="button" label="OPEN SCREEN" @click="openScreen01" />
        </div>
      </section>

      <SScreenMinimal />
    </template>
  </StoryBase>
</template>

<script>
import SButton from '@@/lib/components/buttons/SButton'
import StoryBase from '@/components/stories/StoryBase'
import SScreenMinimal from './SScreenMinimal'

export default {
  components: {
    SButton,
    StoryBase,
    SScreenMinimal
  },

  data () {
    return {
      form: {
        input01: false
      },

      props: [
        {
          name: 'name',
          type: 'String',
          required: true,
          default: '—',
          description: 'The name for the screen. The value is used when opening modal through Vuex Action.'
        },
        {
          name: 'title',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The title text for the screen.'
        }
      ]
    }
  },

  methods: {
    openScreen01 () {
      this.$store.dispatch('screen/open', {
        name: 'story-screens-s-screen-minimal'
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.actions {
  display: flex;
}

.button + .button {
  margin-left: 8px;
}
</style>
