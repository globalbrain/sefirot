import { isClient } from '@vueuse/core'
import { type MaybeRefOrGetter, type Ref, ref, toValue, watchEffect } from 'vue'
import { isFile, isString } from '../support/Utils'

export interface ImageSrcFromFile {
  src: Ref<string | null>
}

/**
 * Get renderable image src from the given file. If a string is given, it will
 * be returned as is. It is useful when you want to render an image from a
 * remote URL.
 */
export function useImageSrcFromFile(
  file: MaybeRefOrGetter<File | string | null>
): ImageSrcFromFile {
  if (!isClient) {
    return {
      src: ref(null)
    }
  }

  const reader = new window.FileReader()
  const src = ref<string | null>(null)

  reader.onload = function () {
    src.value = this.result?.toString() ?? null
  }

  watchEffect(() => {
    read()
  })

  function read(): void {
    const f = toValue(file)

    if (isFile(f)) {
      reader.readAsDataURL(f)
      return
    }

    if (isString(f)) {
      src.value = f
      return
    }

    src.value = null
  }

  return {
    src
  }
}
