import { useLang } from '../../../composables/Lang'
import { type FieldContext } from '../FieldContext'
import { type FieldData } from '../FieldData'
import { type Field } from '../fields/Field'
import { useFieldRegistry } from './FieldRegistry'

export interface FieldFactory {
  make<T extends FieldData>(fieldData: T): Field<T>
}

export function useFieldFactory(): FieldFactory {
  const lang = useLang()
  const fieldRegistry = useFieldRegistry()

  const ctx: FieldContext = {
    lang
  }

  function make<T extends FieldData>(fieldData: T): Field<T> {
    const provider = fieldRegistry.resolve(fieldData)
    return provider(ctx, fieldData)
  }

  return {
    make
  }
}
