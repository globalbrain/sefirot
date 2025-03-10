/**
 * Credits:
 *
 * - @radix-ui/colors - MIT License
 *     Copyright (c) 2021 Radix
 *     https://github.com/radix-ui/colors/blob/main/LICENSE
 */

import FileSaver from 'file-saver'
import html2canvas from 'html2canvas'

const isLightDarkSupported
  = typeof CSS !== 'undefined' && CSS.supports('color', 'light-dark(#000, #fff)')

// radixLight.9, radixDark.10
export const chartColors = {
  // orange: isLightDarkSupported ? 'light-dark(#f76b15, #ff801f)' : '#f76b15',
  tomato: isLightDarkSupported ? 'light-dark(#e54d2e, #ec6142)' : '#e54d2e',
  // red: isLightDarkSupported ? 'light-dark(#e5484d, #ec5d5e)' : '#e5484d',
  ruby: isLightDarkSupported ? 'light-dark(#e54666, #ec5a72)' : '#e54666',
  // crimson: isLightDarkSupported ? 'light-dark(#e93d82, #ee518a)' : '#e93d82',
  pink: isLightDarkSupported ? 'light-dark(#d6409f, #de51a8)' : '#d6409f',
  // plum: isLightDarkSupported ? 'light-dark(#ab4aba, #b658c4)' : '#ab4aba',
  purple: isLightDarkSupported ? 'light-dark(#8e4ec6, #9a5cd0)' : '#8e4ec6',
  // violet: isLightDarkSupported ? 'light-dark(#6e56cf, #7d66d9)' : '#6e56cf',
  iris: isLightDarkSupported ? 'light-dark(#5b5bd6, #6e6ade)' : '#5b5bd6',
  // indigo: isLightDarkSupported ? 'light-dark(#3e63dd, #5472e4)' : '#3e63dd',
  blue: isLightDarkSupported ? 'light-dark(#0090ff, #3b9eff)' : '#0090ff',
  // cyan: isLightDarkSupported ? 'light-dark(#00a2c7, #23afd0)' : '#00a2c7',
  teal: isLightDarkSupported ? 'light-dark(#12a594, #0eb39e)' : '#12a594',
  // jade: isLightDarkSupported ? 'light-dark(#29a383, #27b08b)' : '#29a383',
  green: isLightDarkSupported ? 'light-dark(#30a46c, #33b074)' : '#30a46c',
  // grass: isLightDarkSupported ? 'light-dark(#46a758, #53b365)' : '#46a758',
  gray: isLightDarkSupported ? 'light-dark(#8d8d8d, #7b7b7b)' : '#8d8d8d'
} as const

// eslint-disable-next-line @typescript-eslint/ban-types
export type ChartColor = keyof typeof chartColors | (string & {})
export type KV = { key: string; value: number; color?: ChartColor }

export function getColor(...colors: (ChartColor | string | null | undefined)[]): string {
  for (const color of colors) {
    if (color != null) {
      return chartColors[color as keyof typeof chartColors] || color
    }
  }
  return chartColors.blue
}

const { gray: _gray, ...rest } = chartColors

export function scheme<T extends { key: string; color?: ChartColor }>(
  data: T[],
  colors: ChartColor[] = Object.keys(rest),
  unknown: ChartColor = 'gray'
): (d: T) => string {
  const map = new Map<string, string>()

  for (let i = 0; i < data.length; i++) {
    const d = data[i]
    const color = getColor(d.color, colors?.[i % (colors?.length ?? 1)])
    map.set(d.key, color)
  }

  return (d: T): string => {
    return map.get(d.key) ?? unknown
  }
}

export async function exportAsPng(_el: any, fileName = 'chart.png', delay = 0): Promise<void> {
  if (!_el) { return }
  await new Promise((resolve) => setTimeout(resolve, delay))

  const el = '$el' in _el ? _el.$el : _el
  if (!(el instanceof HTMLElement)) { return }

  const SCard = el.closest('.SCard')
  if (!(SCard instanceof HTMLElement)) { return }

  const canvas = await html2canvas(SCard, {
    scale: 2,
    backgroundColor: getBackgroundColor(el),
    logging: false,
    ignoreElements: (el) => el.classList.contains('SControlActionBar')
  })

  const dataUrl = canvas.toDataURL('image/png')
  FileSaver.saveAs(dataUrl, fileName)
}

function getBackgroundColor(el: HTMLElement | null): string {
  const defaultColor = 'rgba(0, 0, 0, 0)'
  let color = 'rgba(0, 0, 0, 0)'

  while (el) {
    const bgColor = window.getComputedStyle(el).backgroundColor
    if (bgColor !== defaultColor) {
      color = bgColor
      break
    }

    el = el.parentElement
  }

  if (color === defaultColor) {
    return document.documentElement.classList.contains('dark')
      ? 'rgba(0, 0, 0, 1)'
      : 'rgba(255, 255, 255, 1)'
  }

  return color
}
