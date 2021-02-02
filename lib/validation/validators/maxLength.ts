export default function maxLength(value: string | Array<any>, max: number): boolean {
  return value.length <= max
}
