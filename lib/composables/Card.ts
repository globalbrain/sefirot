export interface Card {
  collapsable: boolean
  header?: Header
  footer?: Footer
}

export interface Header {
  title: string
  actions?: Action[]
}

export interface Footer {
  actions: Action[]
}

export interface Action {
  type?: 'primary' | 'text' | 'mute'
  mode?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  icon?: string
  label: string
  link?: string
  callback? (): void
}

export function useHeader(options: Header): Header {
  return options
}

export function useFooter(options: Footer): Footer {
  return options
}
