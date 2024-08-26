<script setup lang="ts">
import { useData } from '../composables/Data'
import { useValidation } from '../composables/Validation'
import { email, maxLength, required } from '../validation/rules'
import SAlert from './SAlert.vue'
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
  error: boolean
}>()

const emit = defineEmits<{
  cancel: []
  submit: [email: string, password: string]
}>()

const { data } = useData({
  email: null as string | null,
  password: null as string | null
})

const { validation, validateAndNotify } = useValidation(data, {
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
        <SAlert v-if="error" mode="danger">
          <p>Invalid email or password.</p>
        </SAlert>
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
