export interface Event {
  name: string
  description: string
}

export function useEvents(events: Event[], sort = true): Event[] {
  return sort
    ? events.sort((a, b) => a.name.localeCompare(b.name))
    : events
}
