<script setup lang="ts">
import { useD } from '../composables/D'
import { useV } from '../composables/V'
import { email, maxLength, required } from '../validation/rules'
import SCard from './SCard.vue'
import SCardBlock from './SCardBlock.vue'
import SContent from './SContent.vue'
import SControl from './SControl.vue'
import SControlButton from './SControlButton.vue'
import SControlRight from './SControlRight.vue'
import SDoc from './SDoc.vue'
import SInputText from './SInputText.vue'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  cancel: []
  submit: [email: string, password: string]
}>()

const { data } = useD({
  email: null as string | null,
  password: null as string | null
})

const { validation, validateAndNotify } = useV(data, {
  email: {
    required: required(),
    maxLength: maxLength(255),
    email: email()
  },
  password: {
    required: required(),
    maxLength: maxLength(255)
  }
})

async function onSubmit() {
  if (await validateAndNotify()) {
    emit('submit', data.value.email!, data.value.password!)
  }
}
</script>

<template>
  <SCard size="small">
    <SCardBlock class="s-p-24">
      <SDoc>
        <SContent>
          <h2>Sign in to account</h2>
        </SContent>
        <SInputText
          name="email"
          type="email"
          label="Email"
          placeholder="john.doe@example.com"
          v-model="data.email"
          :validation="validation.email"
        />
        <SInputText
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          v-model="data.password"
          :validation="validation.password"
        />
      </SDoc>
    </SCardBlock>
    <SCardBlock size="xlarge" class="s-px-24">
      <SControl>
        <SControlRight>
          <SControlButton
            label="Cancel"
            :disabled="loading"
            @click="$emit('cancel')"
          />
          <SControlButton
            mode="info"
            label="Sign in"
            :loading="loading"
            @click="onSubmit"
          />
        </SControlRight>
      </SControl>
    </SCardBlock>
  </SCard>
</template>
