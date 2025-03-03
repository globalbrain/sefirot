<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import * as d3 from 'd3'
import { ref, watch } from 'vue'

type Color = 'blue' | 'green' | 'yellow' | 'red' | 'gray'
export type KV = { key: string; value: number; color?: Color }

const props = defineProps<{
  data: KV[]
  margins?: { top: number; right: number; bottom: number; left: number }
  tooltip?: (d: KV) => string
  color?: Color
  ticks?: number
}>()

const chartRef = ref<HTMLElement>()
const { width, height } = useElementSize(chartRef)

// Function to render the chart
function renderChart({ clientWidth, clientHeight }: { clientWidth: number; clientHeight: number }) {
  if (!chartRef.value) { return }

  // Clear any existing SVG
  d3.select(chartRef.value).selectAll('*').remove()

  // Set dimensions and margins
  const margin = { top: 30, right: 30, bottom: 60, left: 60, ...props.margins }
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

  // Remove X axis line
  svg.select('.domain').remove()

  // Add Y axis
  svg
    .append('g')
    .call(d3.axisLeft(y).ticks(props.ticks ?? 5))
    .selectAll('text')
    .attr('fill', 'var(--c-text-2)')
    .style('font-size', '14px')

  // Remove Y axis line
  svg.select('.domain').remove()

  // Add horizontal grid lines
  svg
    .selectAll('line.grid')
    .data(y.ticks(props.ticks ?? 5))
    .enter()
    .append('line')
    .attr('class', 'grid')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', (d) => y(d))
    .attr('y2', (d) => y(d))
    .attr('stroke', 'var(--c-divider)')
    .attr('stroke-dasharray', '2,2')

  // Add bars
  const bars = svg
    .selectAll('rect')
    .data(props.data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.key)!)
    .attr('y', (d) => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - y(d.value))
    .attr('fill', (d) => `var(--c-${d.color ?? props.color ?? 'blue'}-10)`)
    .attr('rx', 2)
    .attr('ry', 2)

  // Create a tooltip
  const Tooltip = d3
    .select(chartRef.value)
    .append('div')
    .attr('class', 'tooltip')

  // Add interactivity
  bars
    .on('mouseover', (event, d) => {
      Tooltip
        .html(props.tooltip ? props.tooltip(d) : `${d.key}: ${d.value}`)
        .style('opacity', 1)
        .style('--max-tooltip-width', `${Tooltip.text().length}ch`)
        .style('--min-tooltip-width', `${Math.max(...Tooltip.text().split(' ').map((t) => t.length))}ch`)
    })
    .on('mousemove', (event) => {
      Tooltip
        .style('transform', `translate3d(${event.pageX + 10}px,${event.pageY + 10}px,0)`)
        .style('--available-width', `${clientWidth - event.pageX + 24}px`)
    })
    .on('mouseleave', () => {
      Tooltip.style('opacity', 0)
    })
}

watch(
  [width, height],
  ([clientWidth, clientHeight]) => {
    if (!clientWidth || !clientHeight) { return }
    renderChart({ clientWidth, clientHeight })
  },
  { immediate: true }
)
</script>

<template>
  <div class="SChartBarVertical" ref="chartRef" />
</template>

<style scoped lang="postcss">
.SChartBarVertical {
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
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: min(var(--max-tooltip-width), max(var(--min-tooltip-width), var(--available-width)));
  width: calc-size(auto, min(size, max(var(--min-tooltip-width), var(--available-width))));
  padding: 2px 8px;
  transition: transform 0.4s ease-out, opacity 0.25s 0.75s;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 14px;
}
</style>
