export interface Prop {
  name: string
  type: string
  required: boolean
  default: string
  description: string
}

export function useProps(props: Prop[], sort = true): Prop[] {
  return sort
    ? props.sort((a, b) => a.name.localeCompare(b.name))
    : props
}
