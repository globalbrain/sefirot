export type Values<T> = T[keyof T]

export type OmitType<T> = Omit<T, 'type'>

export type WithRequired<T, K extends keyof T> = Exclude<T, K> & Required<Pick<T, K>>
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type SyntheticEvent<E extends Event, T extends Element> = E & { target: T }
export type SyntheticInputEvent<T extends Element = HTMLInputElement> = SyntheticEvent<InputEvent, T>
export type SyntheticMouseEvent<T extends Element = HTMLElement> = SyntheticEvent<MouseEvent, T>
