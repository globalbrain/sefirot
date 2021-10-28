<template lang="md">
<StoryBase>
  <div class="form">
    <div class="input">
      <SInputFile
        v-model="data.file"
        label="Upload file"
        note="Required"
        help="PNG or JPG"
        placeholder="No file chosen"
        :validation="validation.file"
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
      <SInputFile
        v-model="data.file"
        label="Upload file"
        note="Required"
        help="PNG or JPG"
        placeholder="No file chosen"
        :validation="validation.file"
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
import { required, fileExtension } from '@globalbrain/sefirot/lib/validation/rules'
import { useForm } from '@globalbrain/sefirot/lib/composables/Form'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SInputFile from '@globalbrain/sefirot/lib/components/SInputFile.vue'

export default defineComponent({
  components: {
    SButton,
    SInputFile
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        file: null
      },
      rules: {
        file: [
          required(),
          fileExtension(['jpg', 'png'])
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
  max-width: 512px;
}

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
import { required, fileExtension } from '@@/lib/validation/rules'
import { useForm } from '@@/lib/composables/Form'
import SButton from '@@/lib/components/SButton.vue'
import SInputFile from '@@/lib/components/SInputFile.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    SInputFile,
    StoryBase
  },

  setup() {
    const { data, validation } = useForm({
      data: {
        file: null
      },
      rules: {
        file: [
          required(),
          fileExtension(['jpg', 'png'])
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
  max-width: 512px;
}

.actions {
  display: flex;
  padding-top: 24px;
}

.action + .action {
  padding-left: 8px;
}
</style>
