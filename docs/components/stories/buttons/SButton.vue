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
  }
}
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  margin: 0 -8px;
}

.item {
  padding: 0 8px;
}
</style>
