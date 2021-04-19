<template lang="md">
<StoryBase>
  <div class="form">
    <div class="input">
      <SInputDate
        name="birthday"
        label="Birthday"
        note="Required"
        help="Please fill in your birthday."
        :validation="validation.date"
        v-model="data.date"
      />
    </div>
    <ul class="actions">
      <li class="action">
        <SButton label="RESET" type="secondary" @click="validation.$reset" />
      </li>
      <li class="action">
        <SButton label="VALIDATE" @click="validation.$validate" />
      </li>
    </ul>
  </div>
</StoryBase>

```vue
<template>
  <div class="form">
    <div class="input">
      <SInputDate
        name="birthday"
        label="Birthday"
        note="Required"
        help="Please fill in your birthday."
        :validation="validation.date"
        v-model="data.date"
      />
    </div>
    <ul class="actions">
      <li class="action">
        <SButton type="secondary" label="RESET" @click="validation.$reset" />
      </li>
      <li class="action">
        <SButton label="VALIDATE" @click="validation.$validate" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { required } from '@globalbrain/sefirot/lib/validation/rules'
import { useForm } from '@globalbrain/sefirot/lib/composables/Form'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SInputDate from '@globalbrain/sefirot/lib/components/SInputDate.vue'

export default defineComponent({
  components: {
    SButton,
    SInputDate
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        date: null
      },
      rules: {
        date: [required()]
      }
    })

    return {
      data,
      validation
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}

.actions {
  display: flex;
  padding-top: 32px;
}

.action + .action {
  padding-left: 8px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { required } from '@@/lib/validation/rules'
import { useForm } from '@@/lib/composables/Form'
import SButton from '@@/lib/components/SButton.vue'
import SInputDate from '@@/lib/components/SInputDate.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    SInputDate,
    StoryBase
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        date: null
      },
      rules: {
        date: [required()]
      }
    })

    return {
      data,
      validation
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}

.actions {
  display: flex;
  padding-top: 32px;
}

.action + .action {
  padding-left: 8px;
}
</style>
