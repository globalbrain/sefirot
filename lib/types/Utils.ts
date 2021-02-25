export type Values<T> = T[keyof T]

export type OmitType<T> = Omit<T, 'type'>

export type SyntheticEvent<E extends Event, T extends Element> = E & { target: T }
export type SyntheticInputEvent<T extends Element = HTMLInputElement> = SyntheticEvent<InputEvent, T>
export type SyntheticMouseEvent<T extends Element = HTMLElement> = SyntheticEvent<MouseEvent, T>
