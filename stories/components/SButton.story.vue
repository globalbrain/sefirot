<script setup lang="ts">
import SIconImage from 'sefirot/components/icons/SIconImage.vue'
import SIconSearch from 'sefirot/components/icons/SIconSearch.vue'
import SIconCheckCircle from 'sefirot/components/icons/SIconCheckCircle.vue'
import SIconEdit from 'sefirot/components/icons/SIconEdit.vue'
import SButton from 'sefirot/components/SButton.vue'
</script>

<template>
  <Story title="Components/SButton">
    <Variant title="Default">
      <SButton label="Button" />
    </Variant>

    <Variant title="Types">
      <div class="grid">
        <SButton type="fill" label="Fill" />
        <SButton type="outline" label="Outline" />
        <SButton type="text" label="Text" />
      </div>
    </Variant>

    <Variant title="Modes">
      <div class="group">
        <p class="title">Fill</p>
        <div class="grid">
          <SButton mode="neutral" label="Neutral" />
          <SButton mode="mute" label="Mute" />
          <SButton mode="info" label="Info" />
          <SButton mode="success" label="Success" />
          <SButton mode="warning" label="Warning" />
          <SButton mode="danger" label="Danger" />
        </div>
      </div>
      <div class="group">
        <p class="title">Outline</p>
        <div class="grid">
          <SButton type="outline" mode="neutral" label="Neutral" />
          <SButton type="outline" mode="mute" label="Mute" />
          <SButton type="outline" mode="info" label="Info" />
          <SButton type="outline" mode="success" label="Success" />
          <SButton type="outline" mode="warning" label="Warning" />
          <SButton type="outline" mode="danger" label="Danger" />
        </div>
      </div>
      <div class="group">
        <p class="title">Text</p>
        <div class="grid">
          <SButton type="text" mode="neutral" label="Neutral" />
          <SButton type="text" mode="mute" label="Mute" />
          <SButton type="text" mode="info" label="Info" />
          <SButton type="text" mode="success" label="Success" />
          <SButton type="text" mode="warning" label="Warning" />
          <SButton type="text" mode="danger" label="Danger" />
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="group">
        <p class="title">Mini</p>
        <div class="grid">
          <SButton size="mini" type="fill" label="Button" />
          <SButton size="mini" type="outline" label="Button" />
          <SButton size="mini" type="text" label="Button" />
        </div>
      </div>
      <div class="group">
        <p class="title">Small</p>
        <div class="grid">
          <SButton size="small" type="fill" label="Button" />
          <SButton size="small" type="outline" label="Button" />
          <SButton size="small" type="text" label="Button" />
        </div>
      </div>
      <div class="group">
        <p class="title">Medium</p>
        <div class="grid">
          <SButton size="medium" type="fill" label="Button" />
          <SButton size="medium" type="outline" label="Button" />
          <SButton size="medium" type="text" label="Button" />
        </div>
      </div>
      <div class="group">
        <p class="title">Large</p>
        <div class="grid">
          <SButton size="large" type="fill" label="Button" />
          <SButton size="large" type="outline" label="Button" />
          <SButton size="large" type="text" label="Button" />
        </div>
      </div>
      <div class="group">
        <p class="title">Jumbo</p>
        <div class="grid">
          <SButton size="jumbo" type="fill" label="Button" />
          <SButton size="jumbo" type="outline" label="Button" />
          <SButton size="jumbo" type="text" label="Button" />
        </div>
      </div>
    </Variant>

    <Variant title="Icon">
      <div class="grid">
        <SButton :icon="SIconImage" />
        <SButton label="Search" :icon="SIconSearch" />
        <SButton label="Check" type="outline" :icon="SIconCheckCircle" />
        <SButton label="Edit" type="text" :icon="SIconEdit" />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.group + .group {
  margin-top: 48px;
  border-top: 1px solid var(--c-divider-light);
  padding-top: 24px;
}

.title {
  padding-bottom: 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-2);
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
