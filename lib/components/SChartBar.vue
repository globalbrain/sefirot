<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import * as d3 from 'd3'
import { useTemplateRef, watch } from 'vue'
import { type ChartColor, type KV, type Margins, c, scheme } from '../support/Chart'
import { getTextSize } from '../support/Text'

const props = withDefaults(defineProps<{
  // State
  data: KV[]

  // Chart appearance
  type?: 'horizontal' | 'vertical'
  colors?: ChartColor[]
  margins?: Margins
  maxBandwidth?: number

  // Axis & labels
  xLabel?: string
  yLabel?: string
  xLabelOffset?: number
  yLabelOffset?: number
  xLabelTickGap?: number
  yLabelTickGap?: number
  xLabelFontSize?: string
  yLabelFontSize?: string
  ticks?: number
  tickFontSize?: string

  // Tooltip & interactivity
  tooltip?: boolean
  tooltipFormat?: (d: KV, color: string) => string

  // Animation & debug
  animate?: boolean
  debug?: boolean
}>(), {
  type: 'vertical',
  colors: () => ['blue'],
  maxBandwidth: 100,

  xLabelFontSize: '14px',
  yLabelFontSize: '14px',
  xLabelTickGap: 20,
  yLabelTickGap: 20,
  ticks: 5,
  tickFontSize: '14px',

  tooltip: true,
  tooltipFormat: (d: KV) => `${d.key}&nbsp;&ndash; ${d.value}`,

  animate: true,
  debug: false
})

const chartRef = useTemplateRef('chart')
const { width, height } = useElementSize(chartRef)

let tooltipTimeout = 0

// Function to render the chart
function renderChart({
  clientWidth,
  clientHeight,
  animate
}: {
  clientWidth: number
  clientHeight: number
  animate: boolean
}) {
  if (!chartRef.value) { return }

  // Create color scale
  const color = scheme(props.data, props.colors)
  const font = getComputedStyle(chartRef.value).fontFamily

  // Clear any existing SVG
  d3
    .select(chartRef.value)
    .selectAll('*')
    .remove()

  // Set dimensions and margins
  const vertical = props.type === 'vertical'

  const maxKeyLength = props.data.reduce((a, b) => Math.max(a, b.key.length), Number.NEGATIVE_INFINITY)
  const maxValueLength = props.data.reduce((a, b) => Math.max(a, b.value.toLocaleString().length), Number.NEGATIVE_INFINITY)

  const maxVerticalTickWidthInCh = vertical ? maxValueLength : maxKeyLength
  const maxVerticalTickWidthInPx = getTextSize('0'.repeat(maxVerticalTickWidthInCh), `400 ${props.tickFontSize} ${font}`).width
  const verticalLabelWidthInPx = props.yLabel ? getTextSize(props.yLabel, `400 ${props.yLabelFontSize} ${font}`).height : 0
  const gapBetweenVerticalLabelAndTicks = props.yLabel ? props.yLabelTickGap : 0

  const maxHorizontalTickHeightInPx = getTextSize('0', `400 ${props.tickFontSize} ${font}`).height // wrapping isn't supported
  const horizontalLabelHeightInPx = props.xLabel ? getTextSize(props.xLabel, `400 ${props.xLabelFontSize} ${font}`).height : 0
  const gapBetweenHorizontalLabelAndTicks = props.xLabel ? props.xLabelTickGap : 0

  const xLabelOffset = props.xLabelOffset ?? horizontalLabelHeightInPx + 9 + maxHorizontalTickHeightInPx + gapBetweenHorizontalLabelAndTicks
  const yLabelOffset = props.yLabelOffset ?? 9 + maxVerticalTickWidthInPx + gapBetweenVerticalLabelAndTicks

  const margin = {
    top: props.margins?.top ?? 30,
    right: props.margins?.right ?? 30,
    bottom: (props.margins?.bottom ?? 30) + horizontalLabelHeightInPx + xLabelOffset - (props.xLabel ? 9 : 0),
    left: (props.margins?.left ?? 30) + verticalLabelWidthInPx + yLabelOffset
  }

  const width = clientWidth - margin.left - margin.right
  const height = clientHeight - margin.top - margin.bottom

  // Create SVG
  const svg = d3
    .select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', clientHeight)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // Create a padded scale for the bars (with padding for visual spacing)
  const paddedScale = d3
    .scaleBand<string>()
    .domain(props.data.map((d) => d.key))
    .range(vertical ? [0, width] : [0, height])
    .padding(0.4)

  // Y scale for bar values, including negative values
  const minValue = d3.min(props.data, (d) => d.value)!
  const maxValue = d3.max(props.data, (d) => d.value)!
  const y = d3
    .scaleLinear()
    .domain([Math.min(0, minValue), Math.max(0, maxValue)])
    .nice()
    .range(vertical ? [height, 0] : [0, width])

  // Compute a constant offset to center the colored bar inside its full band.
  const groupOffset = (paddedScale.step() - paddedScale.bandwidth()) / 2
  const heightPadding = 24
  const bandwidth = Math.min(paddedScale.bandwidth(), props.maxBandwidth)
  const innerOffset = (paddedScale.bandwidth() - bandwidth) / 2

  // Baseline coordinate for zero value
  const y0 = y(0)

  // For the axes, use the paddedScale so ticks remain centered on the bars.
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(vertical ? d3.axisBottom(paddedScale) : d3.axisBottom(y).ticks(props.ticks))
    .selectAll('text')
    .attr('fill', c.text2)
    .style('font-size', props.tickFontSize)
    .style('text-anchor', 'middle')

  // Remove X axis line
  svg
    .select('.domain')
    .remove()

  // Add Y axis
  svg
    .append('g')
    .call(vertical ? d3.axisLeft(y).ticks(props.ticks) : d3.axisLeft(paddedScale))
    .selectAll('text')
    .attr('fill', c.text2)
    .style('font-size', props.tickFontSize)

  // Remove Y axis line
  svg
    .select('.domain')
    .remove()

  // Add horizontal grid lines
  const gridLines = svg
    .selectAll()
    .data(y.ticks(props.ticks))
    .enter()
    .append('line')
    .attr('stroke', c.divider)
    .attr('stroke-dasharray', '2,2')

  if (vertical) {
    gridLines
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d) => y(d))
      .attr('y2', (d) => y(d))
  } else {
    gridLines
      .attr('x1', (d) => y(d))
      .attr('x2', (d) => y(d))
      .attr('y1', 0)
      .attr('y2', height)
  }

  // Add axis labels
  if (props.xLabel) {
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + xLabelOffset)
      .attr('fill', c.text2)
      .style('font-size', props.xLabelFontSize)
      .style('text-anchor', 'middle')
      .html(props.xLabel)
  }
  if (props.yLabel) {
    svg
      .append('text')
      .attr('x', -height / 2)
      .attr('y', -yLabelOffset)
      .attr('transform', 'rotate(-90)')
      .attr('fill', c.text2)
      .style('font-size', props.yLabelFontSize)
      .style('text-anchor', 'middle')
      .html(props.yLabel)
  }

  // Add bars
  const barGroups = svg
    .selectAll()
    .data(props.data)
    .enter()
    .append('g')
    .attr('transform', (d) =>
      vertical
        ? `translate(${(paddedScale(d.key)! - groupOffset)},0)`
        : `translate(0,${(paddedScale(d.key)! - groupOffset)})`
    )

  // Each group gets a transparent rect covering the full band (using paddedScale.step())
  const outerBars = barGroups
    .append('rect')
    .attr('fill', 'transparent')
    .attr('pointer-events', 'all')

  // Append the colored bar rect inside each group.
  // We now offset it by groupOffset so its left edge is at paddedScale(d.key)
  const bars = barGroups
    .append('rect')
    .attr('fill', (d) => color(d))
    .attr('rx', 2)
    .attr('ry', 2)

  if (!animate) {
    if (vertical) {
      outerBars
        .attr('x', 0)
        .attr('y', (d) => Math.min(y(d.value), y0) - (d.value >= 0 ? heightPadding : 0))
        .attr('width', paddedScale.step())
        .attr('height', (d) => Math.abs(y(d.value) - y0) + heightPadding)
      bars
        .attr('x', groupOffset + innerOffset)
        .attr('y', (d) => (d.value >= 0 ? y(d.value) : y0))
        .attr('width', bandwidth)
        .attr('height', (d) => Math.abs(y(d.value) - y0))
    } else {
      outerBars
        .attr('x', (d) => Math.min(y(d.value), y0) - (d.value >= 0 ? 0 : heightPadding))
        .attr('y', 0)
        .attr('width', (d) => Math.abs(y(d.value) - y0) + heightPadding)
        .attr('height', paddedScale.step())
      bars
        .attr('x', (d) => (d.value >= 0 ? y0 : y(d.value)))
        .attr('y', groupOffset + innerOffset)
        .attr('width', (d) => Math.abs(y(d.value) - y0))
        .attr('height', bandwidth)
    }
  } else {
    // Animate the bars
    if (vertical) {
      outerBars
        .attr('x', 0)
        .attr('y', y0)
        .attr('width', paddedScale.step())
        .attr('height', 0)
        .transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .attr('y', (d) => Math.min(y(d.value), y0) - (d.value >= 0 ? heightPadding : 0))
        .attr('height', (d) => Math.abs(y(d.value) - y0) + heightPadding)
      bars
        .attr('x', groupOffset + innerOffset)
        .attr('y', y0)
        .attr('width', bandwidth)
        .attr('height', 0)
        .transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .attr('y', (d) => (d.value >= 0 ? y(d.value) : y0))
        .attr('height', (d) => Math.abs(y(d.value) - y0))
    } else {
      outerBars
        .attr('x', y0)
        .attr('y', 0)
        .attr('width', 0)
        .attr('height', paddedScale.step())
        .transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .attr('x', (d) => Math.min(y(d.value), y0) - (d.value >= 0 ? 0 : heightPadding))
        .attr('width', (d) => Math.abs(y(d.value) - y0) + heightPadding)
      bars
        .attr('x', y0)
        .attr('y', groupOffset + innerOffset)
        .attr('width', 0)
        .attr('height', bandwidth)
        .transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .attr('x', (d) => (d.value >= 0 ? y0 : y(d.value)))
        .attr('width', (d) => Math.abs(y(d.value) - y0))
    }
  }

  if (props.tooltip) {
    const Tooltip = d3
      .select(chartRef.value)
      .append('div')
      .attr('class', 'tooltip')

    function updatePos(event: PointerEvent) {
      const [x, y] = d3.pointer(event, chartRef.value)
      Tooltip
        .style('left', `${x + 14}px`)
        .style('top', `${y + 14}px`)
    }

    barGroups
      .on('pointerenter', (event: PointerEvent, d) => {
        window.clearTimeout(tooltipTimeout)
        Tooltip
          .html(props.tooltipFormat(d, color(d)))
          .style('opacity', '1')
        updatePos(event)
      })
      .on('pointermove', updatePos)
      .on('pointerleave', () => {
        window.clearTimeout(tooltipTimeout)
        tooltipTimeout = window.setTimeout(() => {
          Tooltip
            .style('opacity', '0')
        }, 400)
      })
  }

  // Render outline for debugging
  if (props.debug) {
    d3
      .select(chartRef.value)
      .append('div')
      .style('position', 'absolute')
      .style('top', `${margin.top}px`)
      .style('left', `${margin.left}px`)
      .style('width', `${width}px`)
      .style('height', `${height}px`)
      .style('outline', '1px solid blue')
      .style('pointer-events', 'none')
    outerBars
      .style('outline', '1px solid green')
  }
}

watch(
  [width, height, () => props],
  ([clientWidth, clientHeight], [oldWidth, oldHeight]) => {
    if (!clientWidth || !clientHeight) { return }
    renderChart({
      clientWidth,
      clientHeight,
      animate:
        props.animate
        && ((oldWidth === 0 && oldHeight === 0)
          || (clientHeight === oldHeight && clientWidth === oldWidth))
    })
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div ref="chart" class="SChartBar" />
</template>

<style scoped lang="postcss">
.SChartBar {
  position: relative;
  width: 100%;
  height: 100%;
  font-feature-settings: 'tnum' 1;
}

:deep(.tooltip) {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 2px 8px;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 12px;
}

:deep(.tick line) {
  display: none;
}
</style>
