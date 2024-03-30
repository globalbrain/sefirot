# Colors

Sefirot has various fundamental colors. These colors are used through out the components to set basic visual branding for whole design system.

## Basics

The color scheme comes with 2 types of definitions. One is the "Base Colors", pure base colors which will not change depending on light and dark theme. The other is "Theme Colors", which will change depending on light and dark mode.

Usually when using or customizing the colors, you would want to use "Theme Colors", however, some colors only exists in "Base Colors" when a single color covers both light and dark mode.

In this doc, we wouldn't separate them but rather list the colors that are safe to use, and customize to avoid any confusion. If you're curious, you may find all list of colors at [`styles/variables.css`](https://github.com/globalbrain/sefirot/blob/main/lib/styles/variables.css) file.

## Available CSS Variables

Here are the list of all available CSS variables that you can customize.

### Accent colors

Sefirot comes with 4 accent colors which is:

- `info` - Blue color used for links, action button, etc.
- `success` - Green color used for positive feedback, status change, tips, etc.
- `warning` - Yellow color used for warning, attention needed info, etc.
- `danger` - Red color used for error, deletion, dangerous info, etc.

These colors also comes with 2 basic types `text`, `border`, `fg`, and `bg`. The colors should change slightly on how it is being used. For example, when using `info` (blue) color on text, it should be a bit brighter than when it is being used as background color (for example, background color of a button).

It's recommended to use one of `text`, `border`, `fg`, and `bg`. version of the color unless you're defining these colors for other purpose such as border colors or custom graphics.

Here are the list of accent colors you may use. Accent colors are slightly different on light/dark theme.

```css
:root {
  --c-text-info-1: var(--c-blue-10);
  --c-text-info-2: var(--c-blue-9);
  --c-text-info-3: var(--c-blue-8);

  --c-text-success-1: var(--c-green-10);
  --c-text-success-2: var(--c-green-9);
  --c-text-success-3: var(--c-green-8);

  --c-text-warning-1: var(--c-yellow-10);
  --c-text-warning-2: var(--c-yellow-9);
  --c-text-warning-3: var(--c-yellow-8);

  --c-text-danger-1: var(--c-red-10);
  --c-text-danger-2: var(--c-red-9);
  --c-text-danger-3: var(--c-red-8);

  --c-border-info-1: var(--c-blue-10);
  --c-border-info-2: var(--c-blue-11);
  --c-border-info-3: var(--c-blue-12);

  --c-border-success-1: var(--c-green-10);
  --c-border-success-2: var(--c-green-11);
  --c-border-success-3: var(--c-green-12);

  --c-border-warning-1: var(--c-yellow-10);
  --c-border-warning-2: var(--c-yellow-11);
  --c-border-warning-3: var(--c-yellow-12);

  --c-border-danger-1: var(--c-red-10);
  --c-border-danger-2: var(--c-red-11);
  --c-border-danger-3: var(--c-red-12);

  --c-fg-info-1: var(--c-blue-10);
  --c-fg-info-2: var(--c-blue-11);
  --c-fg-info-3: var(--c-blue-12);

  --c-fg-success-1: var(--c-green-10);
  --c-fg-success-2: var(--c-green-11);
  --c-fg-success-3: var(--c-green-12);

  --c-fg-warning-1: var(--c-yellow-10);
  --c-fg-warning-2: var(--c-yellow-11);
  --c-fg-warning-3: var(--c-yellow-12);

  --c-fg-danger-1: var(--c-red-10);
  --c-fg-danger-2: var(--c-red-11);
  --c-fg-danger-3: var(--c-red-12);

  --c-bg-info-1: var(--c-blue-9);
  --c-bg-info-2: var(--c-blue-10);
  --c-bg-info-3: var(--c-blue-11);
  --c-bg-info-dimm-a1: var(--c-blue-a3);
  --c-bg-info-dimm-a2: var(--c-blue-a4);

  --c-bg-success-1: var(--c-green-9);
  --c-bg-success-2: var(--c-green-10);
  --c-bg-success-3: var(--c-green-11);
  --c-bg-success-dimm-a1: var(--c-green-a3);
  --c-bg-success-dimm-a2: var(--c-green-a4);

  --c-bg-warning-1: var(--c-yellow-9);
  --c-bg-warning-2: var(--c-yellow-10);
  --c-bg-warning-3: var(--c-yellow-11);
  --c-bg-warning-dimm-a1: var(--c-yellow-a3);
  --c-bg-warning-dimm-a2: var(--c-yellow-a4);

  --c-bg-danger-1: var(--c-red-9);
  --c-bg-danger-2: var(--c-red-10);
  --c-bg-danger-3: var(--c-red-11);
  --c-bg-danger-dimm-a1: var(--c-red-a3);
  --c-bg-danger-dimm-a2: var(--c-red-a4);
}
```
