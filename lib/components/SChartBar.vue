<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import * as d3 from 'd3'
import { useTemplateRef, watch } from 'vue'
import { type ChartColor, type KV, c, scheme } from '../support/Chart'

export type { ChartColor, KV }

const props = withDefaults(defineProps<{
  data: KV[]
  colors?: ChartColor[]
  margins?: Partial<{ top: number; right: number; bottom: number; left: number }>
  mode?: 'horizontal' | 'vertical'
  debug?: boolean
  ticks?: number
  animate?: boolean
  tooltip?: boolean
  tooltipFormat?: (d: KV, color: string) => string
  xLabel?: string
  yLabel?: string
  xLabelOffset?: number
  yLabelOffset?: number
}>(), {
  colors: () => ['blue'],
  mode: 'vertical',
  debug: false,
  ticks: 5,
  animate: true,
  tooltip: true,
  tooltipFormat: (d: KV) => `${d.key} – ${d.value}`
})

const chartRef = useTemplateRef('chart')
const { width, height } = useElementSize(chartRef)

let tooltipTimeout: number = 0
let animationFrame: number = 0

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

  // Clear any existing SVG
  d3
    .select(chartRef.value)
    .selectAll('*')
    .remove()

  // Set dimensions and margins
  const vertical = props.mode === 'vertical'

  const margin = {
    top: props.margins?.top ?? 30,
    right: props.margins?.right ?? 40,
    bottom: props.margins?.bottom ?? (props.xLabel ? 80 : 60),
    left: props.margins?.left ?? (props.yLabel ? (vertical ? 80 : 100) : (vertical ? 60 : 80))
  }

  const width = clientWidth - margin.left - margin.right
  const height = clientHeight - margin.top - margin.bottom

  const xLabelOffset = props.xLabelOffset ?? 46
  const yLabelOffset = props.yLabelOffset ?? (vertical ? 40 : 56)

  // Create SVG
  const svg = d3
    .select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // X scale
  const x = d3
    .scaleBand()
    .domain(props.data.map((d) => d.key))
    .range(vertical ? [0, width] : [0, height])
    .padding(0.4)

  // Y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(props.data, (d) => d.value)!])
    .nice()
    .range(vertical ? [height, 0] : [0, width])

  // Add X axis
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(vertical ? d3.axisBottom(x) : d3.axisBottom(y).ticks(props.ticks))
    .selectAll('text')
    .attr('fill', c.text2)
    .style('font-size', '14px')
    .style('text-anchor', 'middle')

  // Remove X axis line
  svg
    .select('.domain')
    .remove()

  // Add Y axis
  svg
    .append('g')
    .call(vertical ? d3.axisLeft(y).ticks(props.ticks) : d3.axisLeft(x))
    .selectAll('text')
    .attr('fill', c.text2)
    .style('font-size', '14px')

  // Remove Y axis line
  svg
    .select('.domain')
    .remove()

  // Add horizontal grid lines
  const gridLines = svg
    .selectAll('line.grid')
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
      .style('font-size', '14px')
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
      .style('font-size', '14px')
      .style('text-anchor', 'middle')
      .html(props.yLabel)
  }

  // Add bars
  const bars = svg
    .selectAll('rect')
    .data(props.data)
    .enter()
    .append('rect')
    .attr('fill', (d) => color(d))
    .attr('rx', 2)
    .attr('ry', 2)

  if (!animate) {
    if (vertical) {
      bars
        .attr('x', (d) => x(d.key)!)
        .attr('y', (d) => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.value))
    } else {
      bars
        .attr('x', 0)
        .attr('y', (d) => x(d.key)!)
        .attr('width', (d) => y(d.value))
        .attr('height', x.bandwidth())
    }
  } else {
    // Animate the bars
    if (vertical) {
      bars
        .attr('x', (d) => x(d.key)!)
        .attr('y', height)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => height - y(d.value))
    } else {
      bars
        .attr('x', 0)
        .attr('y', (d) => x(d.key)!)
        .attr('width', 0)
        .attr('height', x.bandwidth())
        .transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .attr('width', (d) => y(d.value))
    }
  }

  if (props.tooltip) {
    // Create a tooltip
    const Tooltip = d3
      .select(chartRef.value)
      .append('div')
      .attr('class', 'tooltip')

    // Add interactivity
    bars
      .on('mouseenter', (event: PointerEvent, d) => {
        const [x, y] = d3.pointer(event, chartRef.value)
        Tooltip
          .html(props.tooltipFormat(d, color(d)))
          .style('transform', `translate3d(${x + 14}px,${y + 14}px,0)`)
        clearTimeout(tooltipTimeout)
        tooltipTimeout = setTimeout(() => {
          Tooltip
            .style('visibility', 'visible')
        }, 750) as unknown as number
      })
      .on('mousemove', (event: PointerEvent) => {
        const [x, y] = d3.pointer(event, chartRef.value)
        if (!animationFrame) {
          animationFrame = requestAnimationFrame(() => {
            Tooltip
              .style('transform', `translate3d(${x + 14}px,${y + 14}px,0)`)
            animationFrame = 0
          })
        }
      })
      .on('mouseleave', () => {
        clearTimeout(tooltipTimeout)
        tooltipTimeout = setTimeout(() => {
          Tooltip
            .style('visibility', 'hidden')
        }, 750) as unknown as number
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
  width: 100%;
  height: 100%;
  font-feature-settings: 'tnum' 1;
  position: relative;
}

:deep(.tooltip) {
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 8px;
  transition: transform 0.4s ease-out;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 12px;
}

:deep(.tick line) {
  display: none;
}
</style>
