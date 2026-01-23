// must be imported from `@globalbrain/sefirot/dompurify`
// otherwise conditional exports in package.json won't work

export declare function createDompurify(): import('dompurify').DOMPurify

export type { Config as DOMPurifyConfig, DOMPurify as DOMPurifyI } from 'dompurify'
