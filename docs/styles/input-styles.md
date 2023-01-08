# Input Styles

Input related component such as `SInputText` or `SInputSelect` shares many common stylings. You may customize the shared style by overriding `--input` prefixed CSS variables.

## Available CSS Variables

Here are the list of all available CSS variables that you can customize.

### Font size

Customize the font size of the generic input value. The font size is different depending on the input's size defined by the `size` prop. You may override the font size for all inputsizes, or customize them individually.

```css
:root {
  /**
   * Set the font size for all size of inputs. By default it's
   * undefined and size specific values defined below is used.
   */
  --input-font-size: undefined;

  /**
   * Set the font size of different `size` of inputs. When
   * `--button-font-size` is set, these values gets ignored.
   */
  --input-mini-font-size: 14px;
  --input-small-font-size: 16px;
  --input-medium-font-size: 16px;
}
```

### Text related stylings

You may use following CSS variables to override text stylings such as styles for label, color of the value, placeholder, etc.

```css
:root {
  --input-label-color: var(--c-text-1);
  --input-value-color: var(--c-text-1);
  --input-placeholder-color: var(--c-text-3);

  --input-error-text-color: var(--c-danger-light);

  --input-disabled-value-color: var(--c-text-1);
}
```

### Input box stylings

You may customize how the input box would look like through following CSS variables.

```css
:root {
  --input-border-color: var(--c-divider-1);
  --input-bg-color: var(--c-bg-elv-1);
  --input-hover-border-color: var(--c-gray);
  --input-focus-border-color: var(--c-info-light);

  --input-error-border-color: var(--c-danger-light);

  --input-disabled-bg-color: var(--c-mute);
}
```
