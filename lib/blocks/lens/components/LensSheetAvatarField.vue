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

// Materialize the read-only display component once (computed off `props.field`):
// `dataListItemComponent()` mints a fresh definition each call, so resolving it
// inline in the template would unmount/remount the avatar on every reactive row
// update (e.g. an out-of-band `patch`), causing flicker.
const displayComponent = computed(() => props.field.dataListItemComponent())

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
  // Capture the record being edited: the sheet can be closed and reopened on
  // another row while this upload is in flight (only the input is disabled, not
  // the sheet), so `props.record` may point elsewhere by the time we resolve.
  const record = props.record
  // Show the picked file (or the cleared empty state) immediately.
  model.value = file
  uploading.value = true
  try {
    // The catalog uploads and patches the captured record's URL itself (with
    // write accounting); only touch this component's picker if it still shows it.
    const url = await edit?.uploadAvatar(record, props.fieldKey, file) ?? null
    if (props.record === record) {
      model.value = url
    }
  } catch {
    if (props.record === record) {
      model.value = record[props.fieldKey] ?? null
    }
    snackbars.push({ mode: 'danger', text: t.upload_error })
  } finally {
    uploading.value = false
    // If the sheet rebound to another row mid-upload, resync the picker to it
    // (the `props.record` watcher skipped re-seeding while `uploading` was true).
    if (props.record !== record) {
      model.value = props.record[props.fieldKey] ?? null
    }
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
    <component :is="displayComponent" v-else :value="record[fieldKey]" />
  </div>
</template>

<style scoped lang="postcss">
.LensSheetAvatarField {
  position: relative;
  border-bottom: 1px dashed var(--c-divider);
}
</style>
