<template>
  <StoryBase
    class="StorySButton"
    name="SButton"
    path="@globalbrain/sefirot/lib/components/buttons/SButton"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Medium Buttons</h3>

        <div class="list">
          <div class="item">
            <SButton label="PRIMARY" />
          </div>
          <div class="item">
            <SButton label="SECONDARY" type="secondary" />
          </div>
          <div class="item">
            <SButton label="TEXT" type="text" />
          </div>
          <div class="item">
            <SButton label="MUTE" type="mute" />
          </div>
        </div>
      </section>

      <section>
        <h3>Large Buttons</h3>

        <div class="list">
          <div class="item">
            <SButton label="PRIMARY" size="large" />
          </div>
          <div class="item">
            <SButton label="SECONDARY" type="secondary" size="large" />
          </div>
          <div class="item">
            <SButton label="TEXT" type="text" size="large" />
          </div>
          <div class="item">
            <SButton label="MUTE" type="mute" size="large" />
          </div>
        </div>
      </section>

      <section>
        <h3>Button Modes</h3>

        <div class="list">
          <div class="item">
            <SButton label="NEUTRAL" mode="neutral" />
          </div>
          <div class="item">
            <SButton label="INFO" mode="info" />
          </div>
          <div class="item">
            <SButton label="SUCCESS" mode="success" />
          </div>
          <div class="item">
            <SButton label="WARNING" mode="warning" />
          </div>
          <div class="item">
            <SButton label="DANGER" mode="danger" />
          </div>
        </div>
      </section>

      <section>
        <h3>Loading State</h3>

        <div class="list">
          <div class="item">
            <SButton label="START LOAD" :loading="load01" @click="load('load01')" />
          </div>
          <div class="item">
            <SButton label="START LOAD" type="secondary" :loading="load02" @click="load('load02')" />
          </div>
          <div class="item">
            <SButton label="START LOAD" type="text" :loading="load03" @click="load('load03')" />
          </div>
          <div class="item">
            <SButton label="START LOAD" type="mute" :loading="load04" @click="load('load04')" />
          </div>
        </div>
      </section>

      <section class="dark">
        <h3>Inverse Buttons</h3>

        <div class="list">
          <div class="item">
            <SButton label="PRIMARY" :inverse="true" />
          </div>
          <div class="item">
            <SButton label="SECONDARY" type="secondary" :inverse="true" />
          </div>
          <div class="item">
            <SButton label="TEXT" type="text" :inverse="true" />
          </div>
          <div class="item">
            <SButton label="MUTE" type="mute" :inverse="true" />
          </div>
        </div>
      </section>

      <section class="dark">
        <h3>Inverse Modes</h3>

        <div class="list">
          <div class="item">
            <SButton label="NEUTRAL" mode="neutral" :inverse="true" />
          </div>
          <div class="item">
            <SButton label="INFO" mode="info" :inverse="true" />
          </div>
          <div class="item">
            <SButton label="SUCCESS" mode="success" :inverse="true" />
          </div>
          <div class="item">
            <SButton label="WARNING" mode="warning" :inverse="true" />
          </div>
          <div class="item">
            <SButton label="DANGER" mode="danger" :inverse="true" />
          </div>
        </div>
      </section>

      <section class="dark">
        <h3>Loading State</h3>

        <div class="list">
          <div class="item">
            <SButton label="START LOAD" :inverse="true" :loading="load05" @click="load('load05')" />
          </div>
          <div class="item">
            <SButton label="START LOAD" type="secondary" :inverse="true" :loading="load06" @click="load('load06')" />
          </div>
          <div class="item">
            <SButton label="START LOAD" type="text" :inverse="true" :loading="load07" @click="load('load07')" />
          </div>
          <div class="item">
            <SButton label="START LOAD" type="mute" :inverse="true" :loading="load08" @click="load('load08')" />
          </div>
        </div>
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SButton from '@@/lib/components/buttons/SButton'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SButton,
    StoryBase
  },

  data () {
    return {
      load01: false,
      load02: false,
      load03: false,
      load04: false,
      load05: false,
      load06: false,
      load07: false,
      load08: false,

      props: [
        {
          name: 'label',
          type: 'String',
          required: true,
          default: '—',
          description: 'The label text for the button.'
        },
        {
          name: 'tag',
          type: 'String',
          required: false,
          default: '\'button\'',
          description: 'The tag for the button. It can be any valid html tag including `nuxt-link`.'
        },
        {
          name: 'to',
          type: 'String',
          required: false,
          default: '\'/\'',
          description: 'The `to` prop for the `nuxt-link` tag. This prop is only useful when `tag` is set to `nuxt-link`.'
        },
        {
          name: 'type',
          type: 'String',
          required: false,
          default: '\'primary\'',
          description: 'The type of the button. Available types are: `primary`, `secondary`, `text`, and `mute`.'
        },
        {
          name: 'mode',
          type: 'String',
          required: false,
          default: '\'neutral\'',
          description: 'The mode of the button. Available modes are: `neutral`, `info`, `success`, `warning`, and `danger`.'
        },
        {
          name: 'size',
          type: 'String',
          required: false,
          default: '\'medium\'',
          description: 'The size of the button. Available sizes are: `medium`, and `large`.'
        },
        {
          name: 'block',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Apply `display: block` to the button.'
        },
        {
          name: 'inverse',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Inverse button theme.'
        }
      ],

      events: [
        {
          name: 'click',
          description: 'Fires when a user clicks the button.'
        }
      ]
    }
  },

  methods: {
    load (target) {
      this[target] = true

      setTimeout(() => { this[target] = false }, 5000)
    }
  }
}
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
}
</style>
