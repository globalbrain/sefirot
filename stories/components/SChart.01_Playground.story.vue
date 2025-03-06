<script setup lang="ts">
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SChartBar, { type KV } from 'sefirot/components/SChartBar.vue'
import SChartPie from 'sefirot/components/SChartPie.vue'
import { ref } from 'vue'

const title = 'Components / SChart / 01. Playground'

const data = ref<KV[]>([
  { key: '2018', value: 10 },
  { key: '2019', value: 15 },
  { key: '2020', value: 20 },
  { key: '2021', value: 25 },
  { key: '2022', value: 30 },
  { key: '2023', value: 35 },
  { key: '2024', value: 40 },
  { key: '2025', value: 45 }
])

function tooltip(d: KV) {
  return `Total: <span class=tooltip-number>${d.value}</span>`
}

function state() {
  return {
    barMode: 'vertical',
    barDebug: false,
    barMarginTop: undefined,
    barMarginRight: undefined,
    barMarginBottom: undefined,
    barMarginLeft: undefined,
    barTicks: undefined,
    barAnimate: true,
    barXLabel: undefined,
    barYLabel: undefined,
    barXLabelOffset: undefined,
    barYLabelOffset: undefined,

    pieMode: 'donut',
    pieHalf: false,
    pieDebug: false,
    pieMarginTop: undefined,
    pieMarginRight: undefined,
    pieMarginBottom: undefined,
    pieMarginLeft: undefined,
    pieShowLegend: true,
    pieLegendPadding: undefined,
    pieAnimate: true,
    pieActiveKey: undefined
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <div class="s-p-8 s-font-14 s-font-w-500">Bar Chart</div>
      <HstSelect
        title="mode"
        :options="['vertical', 'horizontal']"
        v-model="state.barMode"
      />
      <HstCheckbox
        title="debug"
        v-model="state.barDebug"
      />
      <HstSlider
        title="margin-top"
        v-model="state.barMarginTop"
        :min="0"
        :max="100"
      />
      <HstSlider
        title="margin-right"
        v-model="state.barMarginRight"
        :min="0"
        :max="300"
      />
      <HstSlider
        title="margin-bottom"
        v-model="state.barMarginBottom"
        :min="0"
        :max="100"
      />
      <HstSlider
        title="margin-left"
        v-model="state.barMarginLeft"
        :min="0"
        :max="300"
      />
      <HstSlider
        title="ticks"
        v-model="state.barTicks"
        :min="0"
        :max="20"
      />
      <HstCheckbox
        title="animate"
        v-model="state.barAnimate"
      />
      <HstText
        title="x-label"
        v-model="state.barXLabel"
      />
      <HstText
        title="y-label"
        v-model="state.barYLabel"
      />
      <HstSlider
        title="x-label-offset"
        v-model="state.barXLabelOffset"
        :min="-10"
        :max="60"
      />
      <HstSlider
        title="y-label-offset"
        v-model="state.barYLabelOffset"
        :min="-10"
        :max="60"
      />
      <div class="s-p-8 s-font-14 s-font-w-500">Pie Chart</div>
      <HstSelect
        title="mode"
        :options="{
          donut: 'donut',
          pie: 'pie'
        }"
        v-model="state.pieMode"
      />
      <HstCheckbox
        title="half"
        v-model="state.pieHalf"
      />
      <HstCheckbox
        title="debug"
        v-model="state.pieDebug"
      />
      <HstSlider
        title="margin-top"
        v-model="state.pieMarginTop"
        :min="0"
        :max="100"
      />
      <HstSlider
        title="margin-right"
        v-model="state.pieMarginRight"
        :min="0"
        :max="300"
      />
      <HstSlider
        title="margin-bottom"
        v-model="state.pieMarginBottom"
        :min="0"
        :max="100"
      />
      <HstSlider
        title="margin-left"
        v-model="state.pieMarginLeft"
        :min="0"
        :max="300"
      />
      <HstCheckbox
        title="show-legend"
        v-model="state.pieShowLegend"
      />
      <HstSlider
        title="legend-padding"
        v-model="state.pieLegendPadding"
        :min="50"
        :max="150"
      />
      <HstCheckbox
        title="animate"
        v-model="state.pieAnimate"
      />
      <HstSelect
        title="active-key"
        :options="['none', ...data.map((d) => d.key)]"
        v-model="state.pieActiveKey"
      />
    </template>
    <template #default="{ state }">
      <Board :title="title">
        <SCard class="chart-card">
          <SCardBlock size="medium" class="s-px-24" bg="elv-2">
            <div class="s-font-14 s-font-w-500">Bar Chart</div>
          </SCardBlock>
          <SCardBlock bg="elv-2">
            <div class="s-w-full s-h-320">
              <SChartBar
                :data
                :tooltip
                :margins="{
                  top: state.barMarginTop,
                  right: state.barMarginRight,
                  bottom: state.barMarginBottom,
                  left: state.barMarginLeft
                }"
                :mode="state.barMode"
                :debug="state.barDebug"
                :ticks="state.barTicks"
                :animate="state.barAnimate"
                :x-label="state.barXLabel"
                :y-label="state.barYLabel"
                :x-label-offset="state.barXLabelOffset"
                :y-label-offset="state.barYLabelOffset"
              />
            </div>
          </SCardBlock>
        </SCard>
        <br>
        <SCard class="chart-card">
          <SCardBlock size="medium" class="s-px-24" bg="elv-2">
            <div class="s-font-14 s-font-w-500">Pie Chart</div>
          </SCardBlock>
          <SCardBlock bg="elv-2">
            <div class="s-w-full s-h-320 s-pb-24">
              <SChartPie
                :data
                :tooltip
                :margins="{
                  top: state.pieMarginTop,
                  right: state.pieMarginRight,
                  bottom: state.pieMarginBottom,
                  left: state.pieMarginLeft
                }"
                :mode="state.pieMode"
                :half="state.pieHalf"
                :debug="state.pieDebug"
                :show-legend="state.pieShowLegend"
                :legend-padding="state.pieLegendPadding"
                :animate="state.pieAnimate"
                :active-key="state.pieActiveKey"
              />
            </div>
          </SCardBlock>
        </SCard>
      </Board>
    </template>
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
