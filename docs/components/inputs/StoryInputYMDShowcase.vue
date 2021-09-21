<template lang="md">
<StoryBase>
  <div class="form">
    <div class="input">
      <SInputYMD
        v-model="data.ymd"
        name="input-ymd"
        label="YMD input"
        note="Required"
        help="Please fill in date."
        :validation="validation"
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
      <SInputYMD
        v-model="data.ymd"
        name="input-ymd"
        label="YMD input"
        note="Required"
        help="Please fill in date."
        :validation="validation"
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
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {
  required,
  requiredYearMonthDate,
  yearMonthDate
} from '@globalbrain/sefirot/lib/validation/rules'
import { useForm } from '@globalbrain/sefirot/lib/composables/Form'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SInputYMD from '@globalbrain/sefirot/lib/components/SInputYMD.vue'

export default defineComponent({
  components: {
    SButton,
    SInputYMD
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        ymd: null
      },
      rules: {
        ymd: [
          required(),
          requiredYearMonthDate(),
          yearMonthDate()
        ]
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
  max-width: 160px;
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
import { required, requiredYearMonthDate, yearMonthDate } from '@@/lib/validation/rules'
import { useForm } from '@@/lib/composables/Form'
import SButton from '@@/lib/components/SButton.vue'
import SInputYMD from '@@/lib/components/SInputYMD.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    SInputYMD,
    StoryBase
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        ymd: null
      },
      rules: {
        ymd: [
          required(),
          requiredYearMonthDate(),
          yearMonthDate()
        ]
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
  max-width: 160px;
}

.actions {
  display: flex;
  padding-top: 32px;
}

.action + .action {
  padding-left: 8px;
}
</style>
