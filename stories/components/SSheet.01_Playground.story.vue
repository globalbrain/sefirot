<script setup lang="ts">
import SSheet from 'sefirot/components/SSheet.vue'
import SSheetFooter from 'sefirot/components/SSheetFooter.vue'
import SSheetFooterAction from 'sefirot/components/SSheetFooterAction.vue'
import SSheetFooterActions from 'sefirot/components/SSheetFooterActions.vue'
import SSheetMedium from 'sefirot/components/SSheetMedium.vue'
</script>

<template>
  <Board
    title="Components / SSheet / 01. Playground"
  >
    <SSheet>
      <SSheetMedium>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>

        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </SSheetMedium>

      <SSheetFooter>
        <SSheetFooterActions>
          <SSheetFooterAction mode="mute" label="Cancel" />
          <SSheetFooterAction mode="info" label="Submit" />
        </SSheetFooterActions>
      </SSheetFooter>
    </SSheet>
  </Board>
</template>
