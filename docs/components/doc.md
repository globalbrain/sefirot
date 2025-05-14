# SDoc <Badge text="3.11.0" />

`<SDoc>` is a component to display doc-style content. It controls the nested element styles and spacing to have a consistent look and feel.

## Import

```ts
import SDoc from '@globalbrain/sefirot/lib/components/SDoc.vue'
import SDocSection from '@globalbrain/sefirot/lib/components/SDocSection.vue'
```

## Usage

Nest the elements inside `<SDoc>` component and it will apply basic styles to the element, including spacing between elements.

Most of the time, you should be using [`<SContent>`](content) to build title and description section, [`<SDivider>`](divider) to display section divider, and the use [`<SGrid>`](grid) to show form elements.

```vue-html
<SDoc>
  <SContent>
    <h1>Title of the content</h1>
    <p>Lorem ipsum...</p>
  </SContent>

  <SDivider />

  <SContent>
    <h2>Section title</h2>
    <p>Lorem ipsum...</p>
  </SContent>

  <SGrid gap="24">
    <SGridItem>
      <SInputText
        label="Name"
        placeholder="John Doe"
        :model-value="null"
      />
    </SGridItem>

    <SGridItem>
      <SInputText
        type="email"
        label="Email"
        placeholder="john.doe@example.com"
        :model-value="null"
      />
    </SGridItem>
  </SGrid>
</SDoc>
```

You may use `<SDocSection>` to break up the content into sections. There is no difference in terms of stylings, but it may help organize your code when dealing with large content. It can also provide a visual aid in code editors when collapsing sections. You may also add a class name to a section to make it readable too.

```vue-html
<SDoc>
  <SDocSection class="header">
    <SContent>
      <h1>Title of the content</h1>
      <p>Lorem ipsum...</p>
    </SContent>
  </SDocSection>

  <SDivider />

  <SDocSection class="account-info">
    <SContent>
      <h2>Section title</h2>
      <p>Lorem ipsum...</p>
    </SContent>
    <SGrid gap="24">
      <SGridItem>
        <SInputText
          label="Name"
          placeholder="John Doe"
          :model-value="null"
        />
      </SGridItem>
      <SGridItem>
        <SInputText
          type="email"
          label="Email"
          placeholder="john.doe@example.com"
          :model-value="null"
        />
      </SGridItem>
    </SGrid>
  </SDocSection>
</SDoc>
```
