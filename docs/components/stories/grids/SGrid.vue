<template>
  <StoryBase
    class="StorySGrid"
    name="SGrid"
    path="@globalbrain/sefirot/lib/components/grids/SGrid"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Basic Grid</h3>

        <SGrid :columns="columns01">
          <div class="row" :key="record.id" v-for="record in records01">
            <div class="cell name">{{ record.name }}</div>
            <div class="cell email">{{ record.email }}</div>
            <div class="cell status">{{ record.status }}</div>
          </div>
        </SGrid>
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SGrid from '@@/lib/components/grids/SGrid'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SGrid,
    StoryBase
  },

  data () {
    return {
      columns01: [
        { name: 'name', label: 'NAME' },
        { name: 'email', label: 'EMAIL' },
        { name: 'status', label: 'STATUS' }
      ],

      records01: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      props: [
        {
          name: 'name',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The name for the field. It will be set to `for` attribute at label, and `id` attribute at input so that when user clicks the label, the input will get focus.'
        },
        {
          name: 'label',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The label for the input.'
        },
        {
          name: 'note',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The small note text that will be displayed next to label. The note should be short for example `Optional` or `Max length 160`.'
        },
        {
          name: 'help',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'placeholder',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The placeholder text for the input.'
        },
        {
          name: 'value',
          type: 'String | Number',
          required: false,
          default: 'null',
          description: 'The value of the input. You may also use `v-model` to bind a value to the input.'
        },
        {
          name: 'validation',
          type: 'Vuelidate',
          required: false,
          default: 'null',
          description: 'You can pass Vuelidate validation object to let input display any errors.'
        },
        {
          name: 'actions',
          type: 'Array',
          required: false,
          default: 'null',
          description: 'Adds action buttons after the input. The array should contain object with properties of `type`, `label`, and `callback`. `type` and `label` is same as "SButton" props, and `callback` should be a function which will be triggered when users clicks the button.'
        }
      ],

      events: [
        {
          name: 'input',
          description: 'Fires when a user input any value to the filed.'
        },
        {
          name: 'blur',
          description: 'Fires when a user blur focus from the filed.'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGrid >>> .name   { width: 128px; }
.SGrid >>> .email  { width: 216px; }
.SGrid >>> .status { width: 96px; }
</style>
