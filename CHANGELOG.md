## [5.0.0](https://github.com/globalbrain/sefirot/compare/v4.65.0...v5.0.0) (2026-09-30)

### ⚠ BREAKING CHANGES

- **deps:** `MarkdownItOptions` and `UseMarkdown` are no longer exported from `sefirot/composables/Markdown`. Use markdown-it's `MarkdownItOptions` and `ReturnType<typeof useMarkdown>` instead.
- **deps:** `STable` renders rows only after its body has a measured height. Tests in happy-dom or jsdom must stub `offsetHeight`.
- **deps:** `User` is no longer exported from `sefirot/composables/Error`. `useErrorHandler` accepts Sentry's `User` type from `@sentry/browser`.
- **deps:** `VirtualRow` is no longer exported from `sefirot/composables/TableAnimation`. Use `VirtualItem` from `@tanstack/vue-virtual` instead.
- **deps:** Link detection follows linkify-it 6. Unicode punctuation now ends a link, and credentials in URLs are no longer detected.
- **deps:** Node 22.22+, 24.15+ or 26+ is required.
- **deps:** Sefirot now depends on Vite 8, Pinia 4, VueUse 15, Sentry 11 and markdown-it 15. Consumers must use the same majors.

### Miscellaneous Chores

- **deps:** upgrade dependencies to latest majors ([#789](https://github.com/globalbrain/sefirot/issues/789))

## [4.65.0] (2026-09-30)

See [4.x changelog](https://github.com/globalbrain/sefirot/blob/4.x/CHANGELOG.md).
