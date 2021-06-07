export default function integer(value: number): boolean {
  // ^[0-9]*$  - for empty string and positive integer.
  // ^-[0-9]+$ - only for negative integer (minus sign without at least
  //             1 digit is not a number)
  return /(^[0-9]*$)|(^-[0-9]+$)/.test(String(value))
}
