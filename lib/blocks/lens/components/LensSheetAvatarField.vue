<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SDataListItem from '../../../components/SDataListItem.vue'
import { useTrans } from '../../../composables/Lang'
import { useSnackbars } from '../../../stores/Snackbars'
import { type FieldData } from '../FieldData'
import { useLensAvatarUpload } from '../composables/LensAvatarUpload'
import { useLensEdit } from '../composables/LensEdit'
import { type AvatarField } from '../fields/AvatarField'
import { type Field } from '../fields/Field'
import LensAvatarInput from './LensAvatarInput.vue'

const props = defineProps<{
  field: Field<FieldData>
  fieldKey: string
  record: Record<string, any>
}>()

// The table only renders this component for `avatar` fields, so the field is
// always an `AvatarField` — narrow it for the avatar-specific config getters.
const avatarField = computed(() => props.field as AvatarField)

const { t } = useTrans({
  en: { upload_error: 'We couldn’t upload the image. Please try again.' },
  ja: { upload_error: '画像をアップロードできませんでした。もう一度お試しください。' }
})

const edit = useLensEdit()
const avatarUpload = useLensAvatarUpload()
const snackbars = useSnackbars()

// Editable only when the row passes the edit gate and an upload handler is wired
// (avatars persist out-of-band); otherwise the avatar is shown read-only.
const editable = computed(() =>
  !!edit?.canEdit(props.record)
  && (props.field as any).data?.showOnUpdate === true
  && !!avatarUpload?.handler
)

const uploading = ref(false)

// The value the picker shows: the row's current image URL, except while an
// upload is in flight (then the local file preview the change handler set).
const model = ref<File | string | null>(props.record[props.fieldKey] ?? null)

watch(
  () => props.record[props.fieldKey],
  (value) => { if (!uploading.value) { model.value = value ?? null } }
)

async function onChange(value: File | string | null | undefined) {
  // A string is the existing URL still selected — nothing to upload.
  if (typeof value === 'string') {
    model.value = value
    return
  }
  if (!avatarUpload?.handler) {
    return
  }
  const file = value ?? null
  // Show the picked file (or the cleared empty state) immediately.
  model.value = file
  uploading.value = true
  try {
    const url = await avatarUpload.handler({
      id: edit?.resolveId(props.record) ?? null,
      record: props.record,
      field: props.fieldKey,
      file
    })
    edit?.patch(props.record, { [props.fieldKey]: url })
    model.value = url
  } catch {
    model.value = props.record[props.fieldKey] ?? null
    snackbars.push({ mode: 'danger', text: t.upload_error })
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="LensSheetAvatarField">
    <SDataListItem v-if="editable">
      <template #label>{{ field.label() }}</template>
      <template #value>
        <LensAvatarInput
          :model-value="model"
          :accept="avatarField.accept()"
          :image-type="avatarField.imageType()"
          :help="field.help() || undefined"
          :disabled="uploading"
          @update:model-value="onChange"
        />
      </template>
    </SDataListItem>
    <component :is="field.dataListItemComponent()" v-else :value="record[fieldKey]" />
  </div>
</template>

<style scoped lang="postcss">
.LensSheetAvatarField {
  position: relative;
  border-bottom: 1px dashed var(--c-divider);
}
</style>
