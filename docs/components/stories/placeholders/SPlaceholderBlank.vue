<template>
  <StoryBase
    class="StorySPlaceholder"
    name="SPlaceholderBlank"
    path="@globalbrain/sefirot/lib/components/placeholders/SPlaceholderBlank"
    :props="props"
  >
    <template #component>
      <section>
        <h3>Blank Placeholder</h3>

        <SPlaceholderBlank :loaded="loaded01">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </SPlaceholderBlank>
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SPlaceholderBlank from '@@/lib/components/placeholders/SPlaceholderBlank'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SPlaceholderBlank,
    StoryBase
  },

  data () {
    return {
      loaded01: false,

      props: [
        {
          name: 'loaded',
          type: 'Boolean',
          required: true,
          default: '—',
          description: 'Whether the content is loaded or not.'
        }
      ]
    }
  },

  mounted () {
    setTimeout(() => { this.loaded01 = true }, 3000)
  }
}
</script>
