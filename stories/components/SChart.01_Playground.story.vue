<script setup lang="ts">
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SChartBar, { type KV } from 'sefirot/components/SChartBarVertical.vue'
import SChartDonut from 'sefirot/components/SChartDonut.vue'

const title = 'Components / SChart / 01. Playground'

const data: KV[] = [
  { key: '2018', value: 10 },
  { key: '2019', value: 15 },
  { key: '2020', value: 20 },
  { key: '2021', value: 25 },
  { key: '2022', value: 30 },
  { key: '2023', value: 35 },
  { key: '2024', value: 40 },
  { key: '2025', value: 45 }
]

function tooltip(d: KV) {
  return `Total: <span class=tooltip-number>${d.value}</span>`
}
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <SCard class="chart-card">
        <SCardBlock size="medium" class="s-px-24" bg="elv-2">
          <div class="s-font-14 s-font-w-500">Bar Chart</div>
        </SCardBlock>
        <SCardBlock bg="elv-2">
          <div class="s-w-full s-h-320">
            <SChartBar :data :tooltip />
          </div>
        </SCardBlock>
      </SCard>
      <br>
      <SCard class="chart-card">
        <SCardBlock size="medium" class="s-px-24" bg="elv-2">
          <div class="s-font-14 s-font-w-500">Donut Chart</div>
        </SCardBlock>
        <SCardBlock bg="elv-2">
          <div class="s-w-full s-h-320 s-pb-24">
            <SChartDonut :data :tooltip />
          </div>
        </SCardBlock>
      </SCard>
    </Board>
  </Story>
</template>

<style scoped lang="postcss">
.chart-card {
  background-color: transparent;
  min-width: 512px;
}

:deep(.tooltip-number) {
  font-weight: 600;
}
</style>
