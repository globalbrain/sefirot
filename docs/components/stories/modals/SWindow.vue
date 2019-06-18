<template>
  <StoryBase
    class="StorySWindow"
    name="SWindow"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Minimal Windows</h3>

        <div class="actions">
          <SButton class="button" label="BASIC WINDOW" @click="openWindow01" />
          <SButton class="button" label="WITH LEAD TEXT" @click="openWindow02" />
          <SButton class="button" label="BLANK WINDOW" @click="openWindow03" />
        </div>
      </section>

      <SWindowMinimal />
      <SWindowMinimalWithLead />
      <SWindowMinimalBlank />
    </template>
  </StoryBase>
</template>

<script>
import SButton from '@@/lib/components/buttons/SButton'
import StoryBase from '@/components/stories/StoryBase'
import SWindowMinimal from './SWindowMinimal'
import SWindowMinimalWithLead from './SWindowMinimalWithLead'
import SWindowMinimalBlank from './SWindowMinimalBlank'

export default {
  components: {
    SButton,
    StoryBase,
    SWindowMinimal,
    SWindowMinimalWithLead,
    SWindowMinimalBlank
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
          description: 'The name for the window. The value is used when opening modal through Vuex Action.'
        },
        {
          name: 'title',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The title text for the window.'
        },
        {
          name: 'lead',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The lead text for the window. Only visible when `title` is not null.'
        },
        {
          name: 'actions',
          type: 'Array',
          required: false,
          default: 'null',
          description: 'Adds action buttons at end of the window. The array should contain object with properties of `type`, `mode`, `label`, and `callback`. `type`, `mode`, and `label` is same as "SButton" props, and `callback` should be a function which will be triggered when users clicks the button.'
        },
        {
          name: 'closable',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'When this is set to true, users may click backdrop to close the modal. Also, the close icon will be shown at the top right of the window.'
        }
      ],

      events: [
        {
          name: 'before-open',
          description: 'Fires before opening window.'
        },
        {
          name: 'openend',
          description: 'Fires when window is opened.'
        },
        {
          name: 'before-close',
          description: 'Fires before closing window.'
        },
        {
          name: 'closed',
          description: 'Fires when window is closed.'
        }
      ]
    }
  },

  methods: {
    openWindow01 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal'
      })
    },

    openWindow02 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-with-lead'
      })
    },

    openWindow03 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-blank'
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
