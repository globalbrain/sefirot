import { type Day, day } from './Day'

export type DateRangePreset =
  | DateFromTo
  | Year
  | YearHalf
  | YearQuarter

export type DateRangePresetType =
  | 'date-from-to'
  | 'year'
  | 'year-half'
  | 'year-quarter'

export type DateRangePresetDict = {
  'date-from-to': typeof DateFromTo
  'year': typeof Year
  'year-half': typeof YearHalf
  'year-quarter': typeof YearQuarter
}

export class DateRange {
  preset: DateRangePreset

  presetDict: DateRangePresetDict = {
    'date-from-to': DateFromTo,
    'year': Year,
    'year-half': YearHalf,
    'year-quarter': YearQuarter
  }

  constructor() {
    this.preset = new DateFromTo()
  }

  setPreset(preset: DateRangePreset | DateRangePresetType): this {
    preset = typeof preset === 'string' ? new this.presetDict[preset]() : preset

    this.preset = preset

    return this
  }

  getFrom(): Day | null {
    return this.preset.getFrom()
  }

  getTo(): Day | null {
    return this.preset.getTo()
  }

  getLabeltext(): string {
    return this.preset.getLabeltext()
  }
}

export abstract class DateRangePresetBase {
  abstract getFrom(): Day | null
  abstract getTo(): Day | null
  abstract getLabeltext(): string

  protected getYear(year: number | null): Day | null {
    if (!year) {
      return null
    }

    const d = day().year(year)

    return d.isValid() ? d : null
  }
}

export class DateFromTo extends DateRangePresetBase {
  type = 'date-from-to' as const
  from: Day | null
  to: Day | null

  constructor() {
    super()
    this.from = day().subtract(30, 'days')
    this.to = day()
  }

  getFrom(): Day | null {
    return this.from
  }

  getTo(): Day | null {
    return this.to
  }

  getLabeltext(): string {
    const f = this.getFrom()?.format('YYYY-MM-DD')
    const t = this.getTo()?.format('YYYY-MM-DD')

    return f && t ? `${f} – ${t}` : 'Error'
  }

  setFrom(from: Day | null): this {
    this.from = from
    return this
  }

  setTo(to: Day | null): this {
    this.to = to
    return this
  }
}

export class Year extends DateRangePresetBase {
  type = 'year' as const
  year: number | null = null

  constructor() {
    super()
    this.year = day().year()
  }

  getFrom(): Day | null {
    return this.getYear(this.year)?.startOf('year') ?? null
  }

  getTo(): Day | null {
    return this.getYear(this.year)?.endOf('year') ?? null
  }

  getLabeltext(): string {
    return this.getYear(this.year)?.format('YYYY') ?? 'Error'
  }

  setYear(year: number | null): this {
    this.year = year
    return this
  }
}

export class YearHalf extends DateRangePresetBase {
  type = 'year-half' as const
  year: number | null
  half: 1 | 2

  protected monthDict: Record<number, number> = {
    1: 0,
    2: 6
  }

  constructor() {
    super()
    this.year = day().year()
    this.half = 1
  }

  getFrom(): Day | null {
    return this.getYear(this.year)
      ?.month(this.monthDict[this.half])
      .startOf('month') ?? null
  }

  getTo(): Day | null {
    return this.getYear(this.year)
      ?.month(this.monthDict[this.half] + 5)
      .endOf('month') ?? null
  }

  getLabeltext(): string {
    const y = this.getYear(this.year)?.format('YYYY')

    return y ? `${y}H${this.half}` : 'Error'
  }

  setYear(year: number | null): this {
    this.year = year
    return this
  }

  setHalf(half: 1 | 2): this {
    this.half = half
    return this
  }
}

export class YearQuarter extends DateRangePresetBase {
  type = 'year-quarter' as const
  year: number | null
  quarter: 1 | 2 | 3 | 4

  protected monthDict: Record<number, number> = {
    1: 0,
    2: 3,
    3: 6,
    4: 9
  }

  constructor() {
    super()
    this.year = day().year()
    this.quarter = 1
  }

  getFrom(): Day | null {
    return this.getYear(this.year)
      ?.month(this.monthDict[this.quarter])
      .startOf('month') ?? null
  }

  getTo(): Day | null {
    return this.getYear(this.year)
      ?.month(this.monthDict[this.quarter] + 2)
      .endOf('month') ?? null
  }

  getLabeltext(): string {
    const y = this.getYear(this.year)?.format('YYYY')

    return y ? `${y}Q${this.quarter}` : 'Error'
  }

  setYear(year: number | null): this {
    this.year = year
    return this
  }

  setQuarter(quarter: 1 | 2 | 3 | 4): this {
    this.quarter = quarter
    return this
  }
}
