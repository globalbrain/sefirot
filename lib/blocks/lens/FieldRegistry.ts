import { type FieldContext } from './FieldContext'
import { type FieldData, type FieldDataType } from './FieldData'
import { type Field } from './fields/Field'

export type FieldProvider<T extends FieldData> = (ctx: FieldContext, fieldData: T) => Field<T>

export type FieldDataFor<T extends FieldDataType> = Extract<FieldData, { type: T }>

export class FieldRegistry {
  private fields: Record<string, FieldProvider<any>> = {}

  register<T extends FieldDataType>(type: T, provider: FieldProvider<FieldDataFor<T>>) {
    this.fields[type] = provider
  }

  resolve<T extends FieldData>(fieldData: T): FieldProvider<T> {
    const provider = this.fields[fieldData.type]
    if (!provider) {
      throw new Error(`Field "${fieldData.type}" is not registered in the FieldRegistry.`)
    }
    return provider
  }
}
