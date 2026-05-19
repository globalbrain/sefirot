import { type TableCell } from '../../../../composables/Table'
import { abbreviate } from '../../../../support/Num'
import { type DecimalFieldData, type NumberFieldData } from '../../FieldData'

/**
 * `Intl.NumberFormat`'s `maximumFractionDigits` accepts integers in
 * the range `0..20` (inclusive) and throws `RangeError` outside it.
 * The override UI can in principle accept any number — including
 * negative values via `SInputNumber` — so we clamp defensively on
 * the rendering path. `null` / `undefined` stays untouched so the
 * cell component can route through the "no formatting" path.
 */
function clampFractionDigits(digits: number | null | undefined): number | null {
  if (digits == null) {
    return null
  }
  return Math.max(0, Math.min(20, Math.trunc(digits)))
}

/**
 * Renders a `number` or `decimal` field as a table cell. The two share
 * the same rendering rules so this helper covers both.
 *
 * - When `abbr` is `null`, we emit a `number` cell. The cell component
 *   applies `separator` and `maximumFractionDigits` via
 *   `toLocaleString`. The raw incoming value is coerced with `Number()`
 *   so decimal fields delivered as strings still render.
 * - When `abbr` is `'en'` or `'ja'`, we emit a `text` cell with the
 *   compact-notation string baked in. We fall back to a 1-digit
 *   precision when `fractionDigits` is `null` — matches what the
 *   default user-facing column-format UI would set.
 */
export function renderNumberLikeTableCell(
  data: NumberFieldData | DecimalFieldData,
  v: any
): TableCell {
  const num = v != null ? Number(v) : null
  const cap = clampFractionDigits(data.fractionDigits)

  if (data.abbr != null) {
    return {
      type: 'text',
      align: data.align ?? 'left',
      value: num != null
        ? abbreviate(num, cap ?? 1, data.abbr)
        : null
    }
  }

  return {
    type: 'number',
    align: data.align ?? 'left',
    value: num,
    separator: data.separator ?? false,
    maximumFractionDigits: cap
  }
}
