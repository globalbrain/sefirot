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

These colors also comes with 2 basic types `text` and `bg`. The colors should change slightly on how it is being use. For example, when using `info` (blue) color on text, it should be a bit brighter than when it is being used as background color (for example, background color of a button).

It's recommended to use either `text` or `bg` version of the color unless you're defining these colors for other purpose such as border colors or custom graphics.

Here are the list of accent colors you may use. Accent color is same for both light and dark mode.

```css
:root {
  --c-info: #1668b6;
  --c-info-light: #2997ff;
  --c-info-lighter: #5bafff;
  --c-info-lghtest: #7dc0ff;
  --c-info-dark: #104c85;
  --c-info-darker: #0c3963;
  --c-info-darkest: #092e51;
  --c-info-dimm-1: rgba(22, 104, 182, 0.12);
  --c-info-dimm-2: rgba(22, 104, 182, 0.2);
  --c-info-dimm-3: rgba(22, 104, 182, 0.28);
  --c-info-text: var(--c-info-light);
  --c-info-text-light: var(--c-info-lighter);
  --c-info-text-lighter: var(--c-info-lightest);
  --c-info-text-dark: var(--c-info);
  --c-info-text-darker: var(--c-info-dark);
  --c-info-bg: var(--c-info);
  --c-info-bg-light: var(--c-info-light);
  --c-info-bg-lighter: var(--c-info-lighter);
  --c-info-bg-dark: var(--c-info-dark);
  --c-info-bg-darker: var(--c-info-darker);

  --c-success: #059669;
  --c-success-light: #10b981;
  --c-success-lighter: #34d399;
  --c-success-lghtest: #6ee7b7;
  --c-success-dark: #047857;
  --c-success-darker: #065f46;
  --c-success-darkest: #064e3b;
  --c-success-dimm-1: rgba(5, 150, 105, 0.12);
  --c-success-dimm-2: rgba(5, 150, 105, 0.2);
  --c-success-dimm-3: rgba(5, 150, 105, 0.28);
  --c-success-text: var(--c-success-light);
  --c-success-text-light: var(--c-success-lighter);
  --c-success-text-lighter: var(--c-success-lightest);
  --c-success-text-dark: var(--c-success);
  --c-success-text-darker: var(--c-success-dark);
  --c-success-bg: var(--c-success);
  --c-success-bg-light: var(--c-success-light);
  --c-success-bg-lighter: var(--c-success-lighter);
  --c-success-bg-dark: var(--c-success-dark);
  --c-success-bg-darker: var(--c-success-darker);

  --c-warning: #ca8a04;
  --c-warning-light: #eab308;
  --c-warning-lighter: #facc15;
  --c-warning-lghtest: #fde047;
  --c-warning-dark: #a16207;
  --c-warning-darker: #854d0e;
  --c-warning-darkest: #713f12;
  --c-warning-dimm-1: rgba(202, 138, 4, 0.12);
  --c-warning-dimm-2: rgba(202, 138, 4, 0.2);
  --c-warning-dimm-3: rgba(202, 138, 4, 0.28);
  --c-warning-text: var(--c-warning-light);
  --c-warning-text-light: var(--c-warning-lighter);
  --c-warning-text-lighter: var(--c-warning-lightest);
  --c-warning-text-dark: var(--c-warning);
  --c-warning-text-darker: var(--c-warning-dark);
  --c-warning-bg: var(--c-warning);
  --c-warning-bg-light: var(--c-warning-light);
  --c-warning-bg-lighter: var(--c-warning-lighter);
  --c-warning-bg-dark: var(--c-warning-dark);
  --c-warning-bg-darker: var(--c-warning-darker);

  --c-danger: #e11d48;
  --c-danger-light: #f43f5e;
  --c-danger-lighter: #fb7185;
  --c-danger-lghtest: #fda4af;
  --c-danger-dark: #be123c;
  --c-danger-darker: #9f1239;
  --c-danger-darkest: #881337;
  --c-danger-dimm-1: rgba(225, 29, 72, 0.12);
  --c-danger-dimm-2: rgba(225, 29, 72, 0.2);
  --c-danger-dimm-3: rgba(225, 29, 72, 0.28);
  --c-danger-text: var(--c-danger-light);
  --c-danger-text-light: var(--c-danger-lighter);
  --c-danger-text-lighter: var(--c-danger-lightest);
  --c-danger-text-dark: var(--c-danger);
  --c-danger-text-darker: var(--c-danger-dark);
  --c-danger-bg: var(--c-danger);
  --c-danger-bg-light: var(--c-danger-light);
  --c-danger-bg-lighter: var(--c-danger-lighter);
  --c-danger-bg-dark: var(--c-danger-dark);
  --c-danger-bg-darker: var(--c-danger-darker);
}
```
