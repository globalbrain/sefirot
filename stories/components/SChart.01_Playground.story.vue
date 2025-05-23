<script setup lang="ts">
import IconDownload from '~icons/ph/download-simple-bold'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SChartBar from 'sefirot/components/SChartBar.vue'
import SChartPie from 'sefirot/components/SChartPie.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlActionBar from 'sefirot/components/SControlActionBar.vue'
import SControlActionBarButton from 'sefirot/components/SControlActionBarButton.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import SControlText from 'sefirot/components/SControlText.vue'
import { type KV, c, exportAsPng } from 'sefirot/support/Chart'
import { ref } from 'vue'

const title = 'Components / SChart / 01. Playground'

const data = ref<KV[]>([
  { key: '2018', value: 10 },
  { key: '2019', value: 20 },
  { key: '2020', value: 15 },
  { key: '2021', value: 25 },
  { key: '2022', value: 35 },
  { key: '2023', value: 30 },
  { key: '2024', value: 40 },
  { key: '2025', value: 45 }
])

const dataWithNegative = ref<KV[]>([
  { key: '2018', value: -10 },
  { key: '2019', value: 20 },
  { key: '2020', value: -15 },
  { key: '2021', value: 25 },
  { key: '2022', value: -35 },
  { key: '2023', value: 30 },
  { key: '2024', value: -40 },
  { key: '2025', value: 45 }
])

const barRef = ref()
const pieRef = ref()

function tooltipFormat(d: KV) {
  return `${d.key} &ndash; <span class="tooltip-number">${d.value}</span>`
}

function labelFormat(d: KV) {
  return `${d.key} &ndash; <tspan fill="${c.text1}">${d.value}</tspan>`
}

function initState() {
  return {
    barType: 'vertical',
    barDebug: false,
    barMarginTop: undefined,
    barMarginRight: undefined,
    barMarginBottom: undefined,
    barMarginLeft: undefined,
    barTicks: undefined,
    barTickFontSize: undefined,
    barMaxBandwidth: undefined,
    barAnimate: true,
    barTooltip: true,
    barXLabel: undefined,
    barYLabel: undefined,
    barXLabelTickGap: undefined,
    barYLabelTickGap: undefined,
    barXLabelFontSize: undefined,
    barYLabelFontSize: undefined,

    pieType: 'donut',
    pieHalf: false,
    pieDebug: false,
    pieMarginTop: undefined,
    pieMarginRight: undefined,
    pieMarginBottom: undefined,
    pieMarginLeft: undefined,
    pieAnimate: true,
    pieTooltip: true,
    pieActiveKey: undefined,
    pieLegend: true,
    pieLegendPadding: undefined,
    pieLegendFontSize: undefined,
    pieLabels: false,
    pieLabelFontSize: undefined
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <div class="s-p-8 s-font-14 s-font-w-500">Bar Chart</div>
      <HstSelect
        title="type"
        :options="['vertical', 'horizontal']"
        v-model="state.barType"
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
      <HstSlider
        title="tick-font-size"
        v-model="state.barTickFontSize"
        :min="10"
        :max="20"
      />
      <HstSlider
        title="max-bandwidth"
        v-model="state.barMaxBandwidth"
        :min="1"
        :max="100"
      />
      <HstCheckbox
        title="animate"
        v-model="state.barAnimate"
      />
      <HstCheckbox
        title="tooltip"
        v-model="state.barTooltip"
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
        title="x-label-tick-gap"
        v-model="state.barXLabelTickGap"
        :min="0"
        :max="100"
      />
      <HstSlider
        title="y-label-tick-gap"
        v-model="state.barYLabelTickGap"
        :min="0"
        :max="100"
      />
      <HstSlider
        title="x-label-font-size"
        v-model="state.barXLabelFontSize"
        :min="10"
        :max="20"
      />
      <HstSlider
        title="y-label-font-size"
        v-model="state.barYLabelFontSize"
        :min="10"
        :max="20"
      />
      <div class="s-p-8 s-font-14 s-font-w-500">Pie Chart</div>
      <HstSelect
        title="type"
        :options="{
          donut: 'donut',
          pie: 'pie'
        }"
        v-model="state.pieType"
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
        title="animate"
        v-model="state.pieAnimate"
      />
      <HstCheckbox
        title="tooltip"
        v-model="state.pieTooltip"
      />
      <HstSelect
        title="active-key"
        :options="['none', ...data.map((d) => d.key)]"
        v-model="state.pieActiveKey"
      />
      <HstCheckbox
        title="legend"
        v-model="state.pieLegend"
      />
      <HstSlider
        title="legend-padding"
        v-model="state.pieLegendPadding"
        :min="50"
        :max="150"
      />
      <HstSlider
        title="legend-font-size"
        v-model="state.pieLegendFontSize"
        :min="10"
        :max="20"
      />
      <HstCheckbox
        title="labels"
        v-model="state.pieLabels"
      />
      <HstSlider
        title="label-font-size"
        v-model="state.pieLabelFontSize"
        :min="10"
        :max="20"
      />
    </template>
    <template #default="{ state }">
      <Board :title>
        <SCard class="chart-card">
          <SCardBlock size="medium" class="s-px-24" bg="elv-2">
            <SControl>
              <SControlLeft>
                <SControlText class="s-font-w-500">
                  Bar Chart
                </SControlText>
              </SControlLeft>
              <SControlRight>
                <SControlActionBar>
                  <SControlActionBarButton
                    :icon="IconDownload"
                    @click="exportAsPng(barRef, 'bar-chart.png')"
                  />
                </SControlActionBar>
              </SControlRight>
            </SControl>
          </SCardBlock>
          <SCardBlock bg="elv-2">
            <div class="s-w-full s-h-320">
              <SChartBar
                ref="barRef"
                :data="dataWithNegative"
                :margins="{
                  top: state.barMarginTop,
                  right: state.barMarginRight,
                  bottom: state.barMarginBottom,
                  left: state.barMarginLeft
                }"
                :type="state.barType"
                :debug="state.barDebug"
                :ticks="state.barTicks"
                :tick-font-size="state.barTickFontSize"
                :animate="state.barAnimate"
                :tooltip="state.barTooltip"
                :tooltip-format
                :x-label="state.barXLabel"
                :y-label="state.barYLabel"
                :x-label-tick-gap="state.barXLabelTickGap"
                :y-label-tick-gap="state.barYLabelTickGap"
                :x-label-font-size="state.barXLabelFontSize"
                :y-label-font-size="state.barYLabelFontSize"
                :max-bandwidth="state.barMaxBandwidth"
              />
            </div>
          </SCardBlock>
        </SCard>
        <br>
        <SCard class="chart-card">
          <SCardBlock size="medium" class="s-px-24" bg="elv-2">
            <SControl>
              <SControlLeft>
                <SControlText class="s-font-w-500">
                  Pie Chart
                </SControlText>
              </SControlLeft>
              <SControlRight>
                <SControlActionBar>
                  <SControlActionBarButton
                    :icon="IconDownload"
                    @click="exportAsPng(pieRef, 'pie-chart.png')"
                  />
                </SControlActionBar>
              </SControlRight>
            </SControl>
          </SCardBlock>
          <SCardBlock bg="elv-2">
            <div class="s-w-full s-h-320 s-pb-24">
              <SChartPie
                ref="pieRef"
                :data
                :margins="{
                  top: state.pieMarginTop,
                  right: state.pieMarginRight,
                  bottom: state.pieMarginBottom,
                  left: state.pieMarginLeft
                }"
                :type="state.pieType"
                :half="state.pieHalf"
                :debug="state.pieDebug"
                :animate="state.pieAnimate"
                :tooltip="state.pieTooltip"
                :tooltip-format
                :active-key="state.pieActiveKey"
                :legend="state.pieLegend"
                :legend-padding="state.pieLegendPadding"
                :legend-font-size="state.pieLegendFontSize"
                :labels="state.pieLabels"
                :label-format
                :label-font-size="state.pieLabelFontSize"
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
  font-weight: 500;
  color: var(--c-text-1);
}
</style>
