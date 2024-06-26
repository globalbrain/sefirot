import postcssNested from 'postcss-nested'
import { postcssIsolateStyles } from 'vitepress'

export default {
  plugins: [
    postcssNested(),
    postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })
  ]
}
