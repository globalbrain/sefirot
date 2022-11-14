// This file is copied from the source to avoid plugin resolution problem.

import { PluginFunc } from 'dayjs'
import * as C from '../Constant'

declare module 'dayjs' {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string
    from(compared: ConfigType, withoutSuffix?: boolean): string
    toNow(withoutSuffix?: boolean): string
    to(compared: ConfigType, withoutSuffix?: boolean): string
  }
}

export interface RelativeTimeOptions {
  rounding?: (num: number) => number
  thresholds?: RelativeTimeThreshold[]
}

export interface RelativeTimeThreshold {
  l: string
  r?: number
  d?: string
}

export const relativeTime: PluginFunc<RelativeTimeOptions> = (o, c, d) => {
  o = o || {}

  const proto = c.prototype

  const relObj = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }

  ;(d as any).en.relativeTime = relObj

  ;(proto as any).fromToBase = (input: any, withoutSuffix: any, instance: any, isFrom: any, postFormat: any) => {
    const loc = instance.$locale().relativeTime || relObj

    const T = o.thresholds || [
      { l: 's', r: 44, d: C.S },
      { l: 'm', r: 89 },
      { l: 'mm', r: 44, d: C.MIN },
      { l: 'h', r: 89 },
      { l: 'hh', r: 21, d: C.H },
      { l: 'd', r: 35 },
      { l: 'dd', r: 25, d: C.D },
      { l: 'M', r: 45 },
      { l: 'MM', r: 10, d: C.M },
      { l: 'y', r: 17 },
      { l: 'yy', d: C.Y }
    ]

    const Tl = T.length

    let result
    let out
    let isFuture

    for (let i = 0; i < Tl; i += 1) {
      let t = T[i]
      if (t.d) {
        result = isFrom
          ? d(input).diff(instance, (t as any).d, true)
          : instance.diff(input, t.d, true)
      }
      let abs = (o.rounding || Math.round)(Math.abs(result))
      isFuture = result > 0
      if (abs <= (t as any).r || !t.r) {
        if (abs <= 1 && i > 0) { t = T[i - 1] } // 1 minutes -> a minute, 0 seconds -> 0 second
        const format = loc[t.l]
        if (postFormat) {
          abs = postFormat(`${abs}`)
        }
        if (typeof format === 'string') {
          out = (format as any).replace('%d', abs)
        }
        else {
          out = format(abs, withoutSuffix, t.l, isFuture)
        }
        break
      }
    }
    if (withoutSuffix) { return out }
    const pastOrFuture = isFuture ? loc.future : loc.past
    if (typeof pastOrFuture === 'function') {
      return pastOrFuture(out)
    }
    return pastOrFuture.replace('%s', out)
  }

  function fromTo(input: any, withoutSuffix: any, instance: any, isFrom?: any) {
    return (proto as any).fromToBase(input, withoutSuffix, instance, isFrom)
  }

  proto.to = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this, true)
  }

  proto.from = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this)
  }

  const makeNow = (thisDay: any) => (thisDay.$u ? (d as any).utc() : d())

  proto.toNow = function (withoutSuffix?: boolean) {
    return this.to(makeNow(this), withoutSuffix)
  }

  proto.fromNow = function (withoutSuffix) {
    return this.from(makeNow(this), withoutSuffix)
  }
}
