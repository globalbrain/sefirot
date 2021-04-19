export interface Prop extends SpecBase {
  type: string
  required: boolean
  default: string
}

export interface Event extends SpecBase {}

export interface SpecBase {
  name: string
  description: string
}

export interface Spec {
  props?: Prop[]
  events?: Event[]
}

export function useSpec(spec: Spec = {}): Required<Spec> {
  return {
    props: spec.props ? sort(spec.props) : [],
    events: spec.events ? sort(spec.events) : []
  }
}

function sort<T extends SpecBase>(specs: T[]): T[] {
  return specs.sort((a, b) => a.name.localeCompare(b.name))
}
