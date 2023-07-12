<script setup lang="ts">
import SLink from 'sefirot/components/SLink.vue'
import SMedium from 'sefirot/components/SMedium.vue'

const title = 'Components / SMedium / 01. Playground'
const docs = '/components/medium'
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <div class="max-w-640">
        <SMedium>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <SLink href="https://example.com">quis nostrud exercitation</SLink> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <p><strong>Duis aute irure dolor in reprehenderit</strong> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <ul>
            <li>Excepteur sint occaecat cupidatat.</li>
            <li>
              Voluptate velit esse cillum dolore.
              <ul>
                <li>Ut enim ad minim veniam.</li>
                <li>Quis nostrud exercitation.</li>
              </ul>
            </li>
            <li>Labore et dolore magna aliqua.</li>
          </ul>

          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <ol>
            <li>
              Consectetur adipiscing elit, sed do eiusmod tempor.
              <ol>
                <li>Incididunt ut labore et dolore.</li>
                <li>Fugiat nulla pariatur.</li>
                <li>Ut enim ad minim veniam.</li>
              </ol>
            </li>
            <li>Sed ut perspiciatis unde omnis iste natus error.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ol>
        </SMedium>
      </div>
    </Board>
  </Story>
</template>
