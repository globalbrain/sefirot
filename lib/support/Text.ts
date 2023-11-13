// Adapted from https://stackoverflow.com/a/21015393/11613622

let _canvas: HTMLCanvasElement

export function getTextWidth(text: string, font: string): number
export function getTextWidth(text: string, el: HTMLElement): number

export function getTextWidth(text: string, fontOrEl: string | HTMLElement): number {
  const canvas = _canvas || (_canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')!
  context.font = typeof fontOrEl === 'string' ? fontOrEl : getCanvasFont(fontOrEl)
  const metrics = context.measureText(text)

  return metrics.width
}

function getCanvasFont(el: HTMLElement) {
  const {
    fontWeight = 'normal',
    fontSize = '16px',
    fontFamily = 'Times New Roman'
  } = getComputedStyle(el)

  return `${fontWeight} ${fontSize} ${fontFamily}`
}
