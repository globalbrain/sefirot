<template lang="md">
<StoryBase>
  <div class="form">
    <div class="input">
      <SInputHMS
        v-model="data.time"
        name="input-hms"
        label="HMS input"
        help="Please fill in time."
        :validation="validation.time"
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
      <SInputHMS
        v-model="data.time"
        name="input-hms"
        label="HMS input"
        help="Please fill in time."
        :validation="validation.time"
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
import { required, requiredHMS, hms } from '@globalbrains/sefirot/lib/validation/rules'
import { useForm } from '@globalbrains/sefirot/lib/composables/Form'
import SButton from '@globalbrains/sefirot/lib/components/SButton.vue'
import SInputHMS from '@globalbrains/sefirot/lib/components/SInputHMS.vue'

export default defineComponent({
  components: {
    SButton,
    SInputHMS
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        time: null
      },
      rules: {
        time: [required(), requiredHMS(), hms()]
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

.actions {
  display: flex;
  padding-top: 24px;
}

.action + .action {
  padding-left: 8px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { required, requiredHMS, hms } from '@@/lib/validation/rules'
import { useForm } from '@@/lib/composables/Form'
import SButton from '@@/lib/components/SButton.vue'
import SInputHMS from '@@/lib/components/SInputHMS.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    SInputHMS,
    StoryBase
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        time: null
      },
      rules: {
        time: [required(), requiredHMS(), hms()]
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

.actions {
  display: flex;
  padding-top: 24px;
}

.action + .action {
  padding-left: 8px;
}
</style>
