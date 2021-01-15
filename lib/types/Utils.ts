export type Values<T> = T[keyof T]

export type OmitType<T> = Omit<T, 'type'>
