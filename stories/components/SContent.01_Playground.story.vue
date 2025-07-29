<script setup lang="ts">
import SContent from 'sefirot/components/SContent.vue'
import SLink from 'sefirot/components/SLink.vue'

const title = 'Components / SContent / 01. Playground'
const docs = '/components/content'
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title :docs>
      <div class="max-w-720">
        <SContent>
          <h1>Level one heading</h1>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <SLink href="https://example.com">quis nostrud exercitation</SLink> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <p><strong>Duis aute irure dolor in reprehenderit</strong> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <h2>This is a level two heading</h2>

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

          <h3>This is a level three heading</h3>

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

          <table>
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                <td>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</td>
              </tr>
              <tr>
                <td>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</td>
                <td>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
              </tr>
              <tr>
                <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                <td>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</td>
                <td>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</td>
              </tr>
            </tbody>
          </table>
        </SContent>
      </div>
    </Board>
  </Story>
</template>
