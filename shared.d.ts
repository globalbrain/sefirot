/// <reference types="@total-typescript/ts-reset/dom" />

interface NumberConstructor {
  isFinite(value: unknown): value is number
  isInteger(value: unknown): value is number
}
