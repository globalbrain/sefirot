/**
 * Credits:
 *
 * - @radix-ui/colors - MIT License
 *     Copyright (c) 2021 Radix
 *     https://github.com/radix-ui/colors/blob/main/LICENSE
 */

import FileSaver from 'file-saver'
import html2canvas from 'html2canvas'

export const c = {
  text1: 'light-dark(#1c2024, #edeef0)',
  text2: 'light-dark(#0007149e, #eff5ffb0)',
  divider: 'light-dark(#e0e0e1, #2e3035)'
}

// radixLight.9, radixDark.10
export const chartColors = {
  // orange: 'light-dark(#f76b15, #ff801f)',
  tomato: 'light-dark(#e54d2e, #ec6142)',
  // red: 'light-dark(#e5484d, #ec5d5e)',
  ruby: 'light-dark(#e54666, #ec5a72)',
  // crimson: 'light-dark(#e93d82, #ee518a)',
  pink: 'light-dark(#d6409f, #de51a8)',
  // plum: 'light-dark(#ab4aba, #b658c4)',
  purple: 'light-dark(#8e4ec6, #9a5cd0)',
  // violet: 'light-dark(#6e56cf, #7d66d9)',
  iris: 'light-dark(#5b5bd6, #6e6ade)',
  // indigo: 'light-dark(#3e63dd, #5472e4)',
  blue: 'light-dark(#0090ff, #3b9eff)',
  // cyan: 'light-dark(#00a2c7, #23afd0)',
  teal: 'light-dark(#12a594, #0eb39e)',
  // jade: 'light-dark(#29a383, #27b08b)',
  green: 'light-dark(#30a46c, #33b074)',
  // grass: 'light-dark(#46a758, #53b365)',
  gray: 'light-dark(#8d8d8d, #7b7b7b)'
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

  // TODO: automatically wait for chart to be ready
  await new Promise((resolve) => setTimeout(resolve, delay))

  const el = '$el' in _el ? _el.$el : _el
  if (!(el instanceof HTMLElement)) { return }

  const SCard = el.closest('.SCard')
  if (!(SCard instanceof HTMLElement)) { return }

  const canvas = await html2canvas(SCard, {
    scale: 2,
    logging: false,
    ignoreElements: (el) => el.classList.contains('SControlActionBar'),
    onclone(document, element) {
      document.documentElement.classList.remove('dark')
      element.querySelectorAll<HTMLElement>('*').forEach((el) => {
        el.style.backgroundColor = 'transparent'
        el.style.fill = el.getAttribute('fill') ?? el.style.fill
        el.style.stroke = el.getAttribute('stroke') ?? el.style.stroke
      })
    }
  })

  const dataUrl = canvas.toDataURL('image/png')
  FileSaver.saveAs(dataUrl, fileName)
}
