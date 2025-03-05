<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import * as d3 from 'd3'
import { ref, watch } from 'vue'
import { type ChartColor, type KV, scheme } from '../support/Chart'

export type { ChartColor, KV }

const props = withDefaults(defineProps<{
  data: KV[]
  tooltip?: (d: KV, color: string) => string
  colors?: ChartColor[]

  margins?: Partial<{ top: number; right: number; bottom: number; left: number }>
  orientation?: 'vertical' | 'horizontal'
  ticks?: number
}>(), {
  tooltip: () => (d: KV) => `${d.key}: ${d.value}`,
  colors: () => ['blue'],
  margins: (props) => ({ top: 30, right: 30, bottom: 60, left: 60, ...props.margins }),
  orientation: 'vertical',
  ticks: 5
})

const chartRef = ref<HTMLElement>()
const { width, height } = useElementSize(chartRef)

// Function to render the chart
function renderChart({ clientWidth, clientHeight }: { clientWidth: number; clientHeight: number }) {
  if (!chartRef.value) { return }

  // Create color scale
  const color = scheme(props.data, props.colors)

  // Clear any existing SVG
  d3
    .select(chartRef.value)
    .selectAll('*')
    .remove()

  // Set dimensions and margins
  const margin = props.margins as Required<typeof props.margins>
  const width = clientWidth - margin.left - margin.right
  const height = clientHeight - margin.top - margin.bottom

  // Create SVG
  const svg = d3
    .select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  let bars

  if (props.orientation === 'horizontal') {
    // X scale
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(props.data, (d) => d.value)!])
      .nice()
      .range([0, width])

    // Y scale
    const y = d3
      .scaleBand()
      .domain(props.data.map((d) => d.key))
      .range([0, height])
      .padding(0.4)

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(props.ticks))
      .selectAll('text')
      .attr('fill', 'var(--c-text-2)')
      .style('font-size', '14px')

    // Add Y axis
    svg
      .append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('fill', 'var(--c-text-2)')
      .style('font-size', '14px')

    // Add bars
    bars = svg
      .selectAll('rect')
      .data(props.data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.key)!)
      .attr('width', (d) => x(d.value))
      .attr('height', y.bandwidth())
      .attr('fill', (d) => color(d))
      .attr('rx', 2)
      .attr('ry', 2)
  } else {
    // X scale
    const x = d3
      .scaleBand()
      .domain(props.data.map((d) => d.key))
      .range([0, width])
      .padding(0.4)

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(props.data, (d) => d.value)!])
      .nice()
      .range([height, 0])

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('fill', 'var(--c-text-2)')
      .style('font-size', '14px')
      .style('text-anchor', 'middle')

    // Add Y axis
    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(props.ticks))
      .selectAll('text')
      .attr('fill', 'var(--c-text-2)')
      .style('font-size', '14px')

    // Add bars
    bars = svg
      .selectAll('rect')
      .data(props.data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.key)!)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d) => color(d))
      .attr('rx', 2)
      .attr('ry', 2)
  }

  // Create a tooltip
  const Tooltip = d3
    .select(chartRef.value)
    .append('div')
    .attr('class', 'tooltip')

  // Add interactivity
  bars
    .on('mouseover', (event, d) => {
      Tooltip
        .html(props.tooltip(d, color(d)) ?? `${d.key}: ${d.value}`)
        .style('visibility', 'visible')
        .style('--max-tooltip-width', `${Tooltip.text().length}ch`)
        .style('--min-tooltip-width', `${Math.max(...Tooltip.text().split(' ').map((t) => t.length))}ch`)
    })
    .on('mousemove', (event) => {
      Tooltip
        .style('transform', `translate3d(${event.pageX + 10}px,${event.pageY + 10}px,0)`)
        .style('--available-width', `${clientWidth - event.pageX + 24}px`)
    })
    .on('mouseleave', () => {
      Tooltip
        .style('visibility', 'hidden')
    })
}

watch(
  [width, height, () => props],
  ([clientWidth, clientHeight]) => {
    if (!clientWidth || !clientHeight) { return }
    renderChart({ clientWidth, clientHeight })
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div ref="chartRef" class="SChartBar" :class="orientation" />
</template>

<style scoped lang="postcss">
.SChartBar {
  width: 100%;
  height: 100%;
  font-feature-settings: 'tnum' 1;
}

/* Hide axis lines */
:deep(.domain) {
  display: none;
}

/* Style the ticks */
:deep(.tick line) {
  display: none;
}

:deep(.tooltip) {
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: min(var(--max-tooltip-width), max(var(--min-tooltip-width), var(--available-width)));
  width: calc-size(auto, min(size, max(var(--min-tooltip-width), var(--available-width))));
  padding: 2px 8px;
  transition: transform 0.4s ease-out, visibility 0s 0.75s;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 14px;
}
</style>
