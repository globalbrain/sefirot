# Colors

Sefirot has varias fundamental colors. These colors are used through out the components to set basic visual branding for whole design system.

## Basics

The color scheme comes with 2 types of definitions. One is the "Base Colors", pure base colors which will not change depending on light and dark theme. The other is "Theme Colors", which will change depending on light and dark mode.

Usually when usgin or customizing the colors, you would want to use "Theme Colors", however, some colors only exists in "Base Colors" when a single color covers both light and dark mode.

In this doc, we wouldn't separate them but rather list the colors that are safe to use, and customize to avoid any confusion. If you're curious, you may find all list of colors at [`styles/variables.css`](https://github.com/globalbrain/sefirot/blob/main/lib/styles/variables.css) file.

## Available CSS Variables

Here are the list of all available CSS variables that you can customize.

### Accent colors

Sefirot comes with 4 accent colors which is:

- `info` - Blue color used for links, action button, etc.
- `success` - Green color used for positive feedback, status change, tips, etc.
- `warning` - Yellow color used for warning, attention needed info, etc.
- `danger` - Red color used for error, deletion, dangerous info, etc.

These colors also comes with 2 basic types `text`, `border`, and `bg`. The colors should change slightly on how it is being use. For example, when using `info` (blue) color on text, it should be a bit brighter than when it is being used as background color (for example, background color of a button).

It's recommended to use one of `text`, `border`, or `bg` version of the color unless you're defining these colors for other purpose such as border colors or custom graphics.

Here are the list of accent colors you may use. Accent colors are slightly different on light/dark theme.

```css
/* Light Theme */
:root {
  --c-info: #0969da;
  --c-info-light: #218bff;
  --c-info-lighter: #54aeff;
  --c-info-lghtest: #80ccff;
  --c-info-dark: #0550ae;
  --c-info-darker: #033d8b;
  --c-info-darkest: #0a3069;
  --c-info-dimm-1: rgba(2, 132, 199, 0.12);
  --c-info-dimm-2: rgba(2, 132, 199, 0.2);
  --c-info-dimm-3: rgba(2, 132, 199, 0.28);
  --c-info-text: var(--c-info-light);
  --c-info-text-light: var(--c-info-lighter);
  --c-info-text-lighter: var(--c-info-lightest);
  --c-info-text-dark: var(--c-info);
  --c-info-text-darker: var(--c-info-dark);
  --c-info-border: var(--c-info-light);
  --c-info-border-light: var(--c-info-lighter);
  --c-info-border-lighter: var(--c-info-lightest);
  --c-info-border-dark: var(--c-info);
  --c-info-border-darker: var(--c-info-dark);
  --c-info-bg: var(--c-info);
  --c-info-bg-light: var(--c-info-light);
  --c-info-bg-lighter: var(--c-info-lighter);
  --c-info-bg-dark: var(--c-info-dark);
  --c-info-bg-darker: var(--c-info-darker);

  --c-success: #1a7f58;
  --c-success-light: #2da476;
  --c-success-lighter: #4ac294;
  --c-success-lghtest: #6fddaf;
  --c-success-dark: #116345;
  --c-success-darker: #044f37;
  --c-success-darkest: #003d2b;
  --c-success-dimm-1: rgba(5, 150, 105, 0.12);
  --c-success-dimm-2: rgba(5, 150, 105, 0.2);
  --c-success-dimm-3: rgba(5, 150, 105, 0.28);
  --c-success-text: var(--c-success-light);
  --c-success-text-light: var(--c-success-lighter);
  --c-success-text-lighter: var(--c-success-lightest);
  --c-success-text-dark: var(--c-success);
  --c-success-text-darker: var(--c-success-dark);
  --c-success-border: var(--c-success-light);
  --c-success-border-light: var(--c-success-lighter);
  --c-success-border-lighter: var(--c-success-lightest);
  --c-success-border-dark: var(--c-success);
  --c-success-border-darker: var(--c-success-dark);
  --c-success-bg: var(--c-success);
  --c-success-bg-light: var(--c-success-light);
  --c-success-bg-lighter: var(--c-success-lighter);
  --c-success-bg-dark: var(--c-success-dark);
  --c-success-bg-darker: var(--c-success-darker);

  --c-warning: #bf8700;
  --c-warning-light: #d4a72c;
  --c-warning-lighter: #eac54f;
  --c-warning-lghtest: #fae17d;
  --c-warning-dark: #9a6700;
  --c-warning-darker: #7d4e00;
  --c-warning-darkest: #633c01;
  --c-warning-dimm-1: rgba(202, 138, 4, 0.12);
  --c-warning-dimm-2: rgba(202, 138, 4, 0.2);
  --c-warning-dimm-3: rgba(202, 138, 4, 0.28);
  --c-warning-text: var(--c-warning-light);
  --c-warning-text-light: var(--c-warning-lighter);
  --c-warning-text-lighter: var(--c-warning-lightest);
  --c-warning-text-dark: var(--c-warning);
  --c-warning-text-darker: var(--c-warning-dark);
  --c-warning-border: var(--c-warning-light);
  --c-warning-border-light: var(--c-warning-lighter);
  --c-warning-border-lighter: var(--c-warning-lightest);
  --c-warning-border-dark: var(--c-warning);
  --c-warning-border-darker: var(--c-warning-dark);
  --c-warning-bg: var(--c-warning);
  --c-warning-bg-light: var(--c-warning-light);
  --c-warning-bg-lighter: var(--c-warning-lighter);
  --c-warning-bg-dark: var(--c-warning-dark);
  --c-warning-bg-darker: var(--c-warning-darker);

  --c-danger: #cf222e;
  --c-danger-light: #fa4549;
  --c-danger-lighter: #ff8182;
  --c-danger-lghtest: #ffaba8;
  --c-danger-dark: #a40e26;
  --c-danger-darker: #82071e;
  --c-danger-darkest: #660018;
  --c-danger-dimm-1: rgba(225, 29, 72, 0.12);
  --c-danger-dimm-2: rgba(225, 29, 72, 0.2);
  --c-danger-dimm-3: rgba(225, 29, 72, 0.28);
  --c-danger-text: var(--c-danger-light);
  --c-danger-text-light: var(--c-danger-lighter);
  --c-danger-text-lighter: var(--c-danger-lightest);
  --c-danger-text-dark: var(--c-danger);
  --c-danger-text-darker: var(--c-danger-dark);
  --c-danger-border: var(--c-danger-light);
  --c-danger-border-light: var(--c-danger-lighter);
  --c-danger-border-lighter: var(--c-danger-lightest);
  --c-danger-border-dark: var(--c-danger);
  --c-danger-border-darker: var(--c-danger-dark);
  --c-danger-bg: var(--c-danger);
  --c-danger-bg-light: var(--c-danger-light);
  --c-danger-bg-lighter: var(--c-danger-lighter);
  --c-danger-bg-dark: var(--c-danger-dark);
  --c-danger-bg-darker: var(--c-danger-darker);
}

/* Dark Theme */
.dark {
  --c-info: #1f6feb;
  --c-info-light: #388bfd;
  --c-info-lighter: #58a6ff;
  --c-info-lghtest: #79c0ff;
  --c-info-dark: #1158c7;
  --c-info-darker: #0d419d;
  --c-info-darkest: #0c2d6b;
  --c-info-dimm-1: rgba(2, 132, 199, 0.12);
  --c-info-dimm-2: rgba(2, 132, 199, 0.2);
  --c-info-dimm-3: rgba(2, 132, 199, 0.28);
  --c-info-text: var(--c-info-light);
  --c-info-text-light: var(--c-info-lighter);
  --c-info-text-lighter: var(--c-info-lightest);
  --c-info-text-dark: var(--c-info);
  --c-info-text-darker: var(--c-info-dark);
  --c-info-border: var(--c-info-light);
  --c-info-border-light: var(--c-info-lighter);
  --c-info-border-lighter: var(--c-info-lightest);
  --c-info-border-dark: var(--c-info);
  --c-info-border-darker: var(--c-info-dark);
  --c-info-bg: var(--c-info);
  --c-info-bg-light: var(--c-info-light);
  --c-info-bg-lighter: var(--c-info-lighter);
  --c-info-bg-dark: var(--c-info-dark);
  --c-info-bg-darker: var(--c-info-darker);

  --c-success: #238554;
  --c-success-light: #2ea069;
  --c-success-lighter: #3fb978;
  --c-success-lghtest: #56d38e;
  --c-success-dark: #196c49;
  --c-success-darker: #0f533a;
  --c-success-darkest: #033a29;
  --c-success-dimm-1: rgba(5, 150, 105, 0.12);
  --c-success-dimm-2: rgba(5, 150, 105, 0.2);
  --c-success-dimm-3: rgba(5, 150, 105, 0.28);
  --c-success-text: var(--c-success-light);
  --c-success-text-light: var(--c-success-lighter);
  --c-success-text-lighter: var(--c-success-lightest);
  --c-success-text-dark: var(--c-success);
  --c-success-text-darker: var(--c-success-dark);
  --c-success-border: var(--c-success-light);
  --c-success-border-light: var(--c-success-lighter);
  --c-success-border-lighter: var(--c-success-lightest);
  --c-success-border-dark: var(--c-success);
  --c-success-border-darker: var(--c-success-dark);
  --c-success-bg: var(--c-success);
  --c-success-bg-light: var(--c-success-light);
  --c-success-bg-lighter: var(--c-success-lighter);
  --c-success-bg-dark: var(--c-success-dark);
  --c-success-bg-darker: var(--c-success-darker);

  --c-warning: #bb8009;
  --c-warning-light: #d29922;
  --c-warning-lighter: #e3b341;
  --c-warning-lghtest: #f2cc60;
  --c-warning-dark: #9e6a03;
  --c-warning-darker: #845306;
  --c-warning-darkest: #693e00;
  --c-warning-dimm-1: rgba(202, 138, 4, 0.12);
  --c-warning-dimm-2: rgba(202, 138, 4, 0.2);
  --c-warning-dimm-3: rgba(202, 138, 4, 0.28);
  --c-warning-text: var(--c-warning-light);
  --c-warning-text-light: var(--c-warning-lighter);
  --c-warning-text-lighter: var(--c-warning-lightest);
  --c-warning-text-dark: var(--c-warning);
  --c-warning-text-darker: var(--c-warning-dark);
  --c-warning-border: var(--c-warning-light);
  --c-warning-border-light: var(--c-warning-lighter);
  --c-warning-border-lighter: var(--c-warning-lightest);
  --c-warning-border-dark: var(--c-warning);
  --c-warning-border-darker: var(--c-warning-dark);
  --c-warning-bg: var(--c-warning);
  --c-warning-bg-light: var(--c-warning-light);
  --c-warning-bg-lighter: var(--c-warning-lighter);
  --c-warning-bg-dark: var(--c-warning-dark);
  --c-warning-bg-darker: var(--c-warning-darker);

  --c-danger: #da3633;
  --c-danger-light: #f85149;
  --c-danger-lighter: #ff7b72;
  --c-danger-lghtest: #ffaba8;
  --c-danger-dark: #b62324;
  --c-danger-darker: #8e1519;
  --c-danger-darkest: #67060c;
  --c-danger-dimm-1: rgba(225, 29, 72, 0.12);
  --c-danger-dimm-2: rgba(225, 29, 72, 0.2);
  --c-danger-dimm-3: rgba(225, 29, 72, 0.28);
  --c-danger-text: var(--c-danger-light);
  --c-danger-text-light: var(--c-danger-lighter);
  --c-danger-text-lighter: var(--c-danger-lightest);
  --c-danger-text-dark: var(--c-danger);
  --c-danger-text-darker: var(--c-danger-dark);
  --c-danger-border: var(--c-danger-light);
  --c-danger-border-light: var(--c-danger-lighter);
  --c-danger-border-lighter: var(--c-danger-lightest);
  --c-danger-border-dark: var(--c-danger);
  --c-danger-border-darker: var(--c-danger-dark);
  --c-danger-bg: var(--c-danger);
  --c-danger-bg-light: var(--c-danger-light);
  --c-danger-bg-lighter: var(--c-danger-lighter);
  --c-danger-bg-dark: var(--c-danger-dark);
  --c-danger-bg-darker: var(--c-danger-darker);
}
```
