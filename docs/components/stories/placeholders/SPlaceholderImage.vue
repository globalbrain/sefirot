<template>
  <StoryBase
    class="StorySPlaceholderImage"
    name="SPlaceholderImage"
    path="@globalbrain/sefirot/lib/components/placeholders/SPlaceholderImage"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Image Placeholder</h3>

        <div class="image">
          <SPlaceholderImage
            img="/img/fixtures/image-1536x1024-001.jpg"
            :width="768"
            :height="512"
            :delay="3000"
          />
        </div>
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SPlaceholderImage from '@@/lib/components/placeholders/SPlaceholderImage'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SPlaceholderImage,
    StoryBase
  },

  data () {
    return {
      props: [
        {
          name: 'img',
          type: 'String',
          required: true,
          default: '—',
          description: 'The path (`src`) for the image.'
        },
        {
          name: 'width',
          type: 'Number',
          required: true,
          default: '—',
          description: 'The width of the image.'
        },
        {
          name: 'height',
          type: 'Number',
          required: true,
          default: '—',
          description: 'The height of the image.'
        },
        {
          name: 'delay',
          type: 'Number',
          required: false,
          default: '0',
          description: 'Delay showing the image after it is loaded. The value is in ms.'
        }
      ],

      events: [
        {
          name: 'load',
          description: 'Fires when the image is loaded. It will be fired after the `delay`.'
        }
      ]
    }
  }
}
</script>
