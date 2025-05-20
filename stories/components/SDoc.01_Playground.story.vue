<script setup lang="ts">
import SContent from 'sefirot/components/SContent.vue'
import SDivider from 'sefirot/components/SDivider.vue'
import SDoc from 'sefirot/components/SDoc.vue'
import SDocSection from 'sefirot/components/SDocSection.vue'
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'
import SInputText from 'sefirot/components/SInputText.vue'

const title = 'Components / SDoc / 01. Playground'
const docs = '/components/doc'
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title :docs>
      <SDoc>
        <SDocSection>
          <SContent>
            <h1>Title of the content</h1>
            <p>This component handles the layout to build this kind of content. You may use various components to build basic "document" like component with ease.</p>
            <p>For example, this section is using content component to build the text.</p>
          </SContent>
        </SDocSection>
        <SDivider />
        <SDocSection>
          <SContent>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
        <SDivider />
        <SDocSection>
          <SContent>
            <h2>Consectetur adipiscing elit</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </SContent>
          <SGrid gap="24">
            <SGridItem>
              <SInputText
                label="Website"
                placeholder="https://example.com"
                :model-value="null"
              />
            </SGridItem>
          </SGrid>
        </SDocSection>
      </SDoc>
    </Board>
  </Story>
</template>
