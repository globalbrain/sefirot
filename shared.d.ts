/// <reference types="@total-typescript/ts-reset/dom" />
/// <reference types="@types/wicg-file-system-access" />

interface NumberConstructor {
  isFinite(value: unknown): value is number
  isInteger(value: unknown): value is number
}
