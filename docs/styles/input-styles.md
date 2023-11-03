# Shared Input Styles

Input related component such as `SInputText` or `SInputSelect` shares many common stylings. You may customize the shared style by overriding `--input` prefixed CSS variables.

## Available CSS Variables

Here are the list of all available CSS variables that you can customize.

### Font stylings

Customize the font size and family of the generic input value. The font size is different depending on the input's size defined by the `size` prop. You may override the font size for all input sizes, or customize them individually.

```css
:root {
  /**
   * Set the font family for all size of inputs. By default it is
   * undefined and base font family will be used.
   */
  --input-value-font-family: undefined;

  /**
   * Set the font size and family for all size of inputs. By default it's
   * undefined and size specific values defined below is used.
   */
  --input-font-size: undefined;
  --input-label-font-size: undefined;

  /**
   * Set the font size of different `size` of inputs. When
   * `--button-font-size` is set, these values gets ignored.
   */
  --input-mini-font-size: 14px;
  --input-mini-label-font-size: 12px;

  --input-small-font-size: 14px;
  --input-small-label-font-size: 14px;
  
  --input-medium-font-size: 16px;
  --input-medium-label-font-size: 14px;
}
```

### Text related stylings

You may use following CSS variables to override text stylings such as styles for label, color of the value, placeholder, etc.

```css
:root {
  --input-label-color: var(--c-text-1);
  --input-value-color: var(--c-text-1);
  --input-placeholder-color: var(--c-text-3);

  --input-error-text-color: var(--c-text-danger-1);

  --input-disabled-value-color: var(--c-text-1);
}
```

### Input box stylings

You may customize how the input box would look like through following CSS variables.

```css
:root {
  --input-border-color: var(--c-border-mute-1);
  --input-bg-color: var(--c-bg-elv-2);
  --input-hover-border-color: var(--c-border-mute-3);
  --input-focus-border-color: var(--c-border-info-1);

  --input-error-border-color: var(--c-border-danger-1);

  --input-disabled-bg-color: var(--c-bg-mute-1);
}
```
