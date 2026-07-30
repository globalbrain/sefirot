import { type ValidationArgs } from '@vuelidate/core'
import { defineComponent, h } from 'vue'

export abstract class FilterInput {
  /**
   * Returns the validation rules for the filter input.
   */
  abstract rules(): Record<string, ValidationArgs>

  /**
   * Casts the input value to the correct type.
   *
   * This method gets called during rendering filter conditions in
   * `LensFormFilterCondition` when the operator changes.
   *
   * We have to cast the value to the correct type when the input changes.
   *
   * For example, when filtering select input, and at first the user setups
   * single select value filter: ['status', '=', 'open'].
   *
   * Then, user changes the operator to multi select: ['status', 'in', 'open'].
   * Now, the value must be converted to array: ['status', 'in', ['open']].
   */
  abstract castValue(value: any): any

  /**
   * Helper method to cast value to string.
   */
  protected castValueToStringOrNull(value: any): string | null {
    if (value == null) {
      return null
    }
    return String(value)
  }

  /**
   * Helper method to cast value to number.
   */
  protected castValueToNumberOrNull(value: any): number | null {
    if (value == null) {
      return null
    }
    const n = Number(value)
    if (Number.isNaN(n)) {
      return null
    }
    return n
  }

  /**
   * Converts the value to a text representation for display. This value gets
   * displayed in the <LensCatalogStateFilterCondition> component.
   */
  abstract valueToText(value: any): Promise<string>

  /**
   * Returns the Vue component for the filter input.
   */
  abstract component(): any

  /**
   * Helper function to define a Vue component with props merging.
   */
  protected defineComponent(component: any, props: any) {
    return defineComponent((baseProps) => {
      return () => h(component, {
        ...baseProps,
        ...props
      })
    })
  }
}
