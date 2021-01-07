export interface Card {
  collapsable: boolean
  header?: Header
  footer?: Footer
}

export interface Header {
  title: string
}

export interface Footer {
  actions: Action[]
}

export interface Action {
  type?: 'primary' | 'mute'
  mode?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  label: string
  link?: string
  callback? (): void
}

export function useHeader (options: Header): Header {
  return {
    title: options.title
  }
}

export function useFooter (options: Footer): Footer {
  return {
    actions: options.actions
  }
}
