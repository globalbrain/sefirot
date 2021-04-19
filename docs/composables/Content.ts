export interface Content {
  label: string
  path: string
}

export function useContent(content: Content[]): Content[] {
  return content
}
