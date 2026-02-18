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
import { computed, ref } from 'vue'

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

const colors = computed(() => dataWithNegative.value.map((d) => (d.value < 0 ? 'tomato' : 'green')))

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
  } satisfies {
    barType: 'horizontal' | 'vertical'
    barDebug: boolean
    barMarginTop?: number
    barMarginRight?: number
    barMarginBottom?: number
    barMarginLeft?: number
    barTicks?: number
    barTickFontSize?: number
    barMaxBandwidth?: number
    barAnimate: boolean
    barTooltip: boolean
    barXLabel?: string
    barYLabel?: string
    barXLabelTickGap?: number
    barYLabelTickGap?: number
    barXLabelFontSize?: number
    barYLabelFontSize?: number
    pieType: 'pie' | 'donut'
    pieHalf: boolean
    pieDebug: boolean
    pieMarginTop?: number
    pieMarginRight?: number
    pieMarginBottom?: number
    pieMarginLeft?: number
    pieAnimate: boolean
    pieTooltip: boolean
    pieActiveKey?: string
    pieLegend: boolean
    pieLegendPadding?: number
    pieLegendFontSize?: number
    pieLabels: boolean
    pieLabelFontSize?: number
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <div class="s-p-8 s-font-14 s-font-w-500">Bar Chart</div>
      <HstSelect
        v-model="state.barType"
        title="type"
        :options="['vertical', 'horizontal']"
      />
      <HstCheckbox
        v-model="state.barDebug"
        title="debug"
      />
      <HstSlider
        v-model="state.barMarginTop"
        title="margin-top"
        :min="0"
        :max="100"
      />
      <HstSlider
        v-model="state.barMarginRight"
        title="margin-right"
        :min="0"
        :max="300"
      />
      <HstSlider
        v-model="state.barMarginBottom"
        title="margin-bottom"
        :min="0"
        :max="100"
      />
      <HstSlider
        v-model="state.barMarginLeft"
        title="margin-left"
        :min="0"
        :max="300"
      />
      <HstSlider
        v-model="state.barTicks"
        title="ticks"
        :min="0"
        :max="20"
      />
      <HstSlider
        v-model="state.barTickFontSize"
        title="tick-font-size"
        :min="10"
        :max="20"
      />
      <HstSlider
        v-model="state.barMaxBandwidth"
        title="max-bandwidth"
        :min="1"
        :max="100"
      />
      <HstCheckbox
        v-model="state.barAnimate"
        title="animate"
      />
      <HstCheckbox
        v-model="state.barTooltip"
        title="tooltip"
      />
      <HstText
        v-model="state.barXLabel"
        title="x-label"
      />
      <HstText
        v-model="state.barYLabel"
        title="y-label"
      />
      <HstSlider
        v-model="state.barXLabelTickGap"
        title="x-label-tick-gap"
        :min="0"
        :max="100"
      />
      <HstSlider
        v-model="state.barYLabelTickGap"
        title="y-label-tick-gap"
        :min="0"
        :max="100"
      />
      <HstSlider
        v-model="state.barXLabelFontSize"
        title="x-label-font-size"
        :min="10"
        :max="20"
      />
      <HstSlider
        v-model="state.barYLabelFontSize"
        title="y-label-font-size"
        :min="10"
        :max="20"
      />
      <div class="s-p-8 s-font-14 s-font-w-500">Pie Chart</div>
      <HstSelect
        v-model="state.pieType"
        title="type"
        :options="{
          donut: 'donut',
          pie: 'pie'
        }"
      />
      <HstCheckbox
        v-model="state.pieHalf"
        title="half"
      />
      <HstCheckbox
        v-model="state.pieDebug"
        title="debug"
      />
      <HstSlider
        v-model="state.pieMarginTop"
        title="margin-top"
        :min="0"
        :max="100"
      />
      <HstSlider
        v-model="state.pieMarginRight"
        title="margin-right"
        :min="0"
        :max="300"
      />
      <HstSlider
        v-model="state.pieMarginBottom"
        title="margin-bottom"
        :min="0"
        :max="100"
      />
      <HstSlider
        v-model="state.pieMarginLeft"
        title="margin-left"
        :min="0"
        :max="300"
      />
      <HstCheckbox
        v-model="state.pieAnimate"
        title="animate"
      />
      <HstCheckbox
        v-model="state.pieTooltip"
        title="tooltip"
      />
      <HstSelect
        v-model="state.pieActiveKey"
        title="active-key"
        :options="['none', ...data.map((d) => d.key)]"
      />
      <HstCheckbox
        v-model="state.pieLegend"
        title="legend"
      />
      <HstSlider
        v-model="state.pieLegendPadding"
        title="legend-padding"
        :min="50"
        :max="150"
      />
      <HstSlider
        v-model="state.pieLegendFontSize"
        title="legend-font-size"
        :min="10"
        :max="20"
      />
      <HstCheckbox
        v-model="state.pieLabels"
        title="labels"
      />
      <HstSlider
        v-model="state.pieLabelFontSize"
        title="label-font-size"
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
                :colors
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
