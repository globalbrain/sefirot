export function mimeTypes(value: unknown, patterns: string[]): boolean {
  if (!(value instanceof File)) { return false }

  // The browser doesn't always report a type (e.g. some drag-and-drop or
  // clipboard sources); defer to the server's content-based check in that case
  // rather than rejecting a possibly-valid file outright.
  if (value.type === '') { return true }

  const type = value.type.toLowerCase()

  return patterns.some((pattern) => {
    const p = pattern.toLowerCase()

    // A `type/*` wildcard (e.g. `image/*`) matches any subtype of that
    // top-level type, mirroring the HTML accept attribute and Laravel's
    // `mimetypes` rule.
    return p.endsWith('/*') ? type.startsWith(p.slice(0, -1)) : type === p
  })
}
