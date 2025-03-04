<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import * as d3 from 'd3'
import { ref, watch } from 'vue'
import { type ChartColor, scheme } from '../support/ChartColors'

export type { ChartColor }
export type KV = { key: string; value: number; color?: ChartColor }

const props = defineProps<{
  data: KV[]
  tooltip?: (d: KV, color: string) => string
  colors?: ChartColor[]

  /** set radiusDiff to 0 to make it a pie chart */
  radiusDiff?: number
  legendDiff?: number
  showLegend?: boolean
}>()

const chartRef = ref<HTMLElement>()
const { width, height } = useElementSize(chartRef)

// Function to render the chart
function renderChart({ clientWidth, clientHeight }: { clientWidth: number; clientHeight: number }) {
  if (!chartRef.value) { return }

  // Clear any existing SVG
  d3.select(chartRef.value).selectAll('*').remove()

  // Create color scale
  const color = scheme(props.data, props.colors)

  // Set dimensions and margins
  const margin = { top: 30, right: 30, bottom: 30, left: 30 }
  const width = clientWidth - margin.left - margin.right
  const height = clientHeight - margin.top - margin.bottom
  const radius = Math.min(width, height) / 2

  // Create SVG
  const svg = d3
    .select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${clientWidth / 2},${clientHeight / 2})`)

  // Prepare data
  const pie = d3
    .pie<KV>()
    .value((d) => d.value)
    .sort(null)
    .padAngle(props.radiusDiff === 0 ? 0 : 0.02)

  const dataReady = pie(props.data)

  // Create arc generator
  const arc = d3
    .arc<d3.PieArcDatum<KV>>()
    .innerRadius(props.radiusDiff === 0 ? 0 : radius - (props.radiusDiff ?? 50))
    .outerRadius(radius)

  // Add the arcs
  const arcs = svg
    .selectAll('arc')
    .data(dataReady)
    .join('path')
    .attr('d', arc)
    .attr('fill', (d) => color(d.data))

  // Create a tooltip
  const Tooltip = d3
    .select(chartRef.value)
    .append('div')
    .attr('class', 'tooltip')

  // Add interactivity
  arcs
    .on('mouseover', (event, d) => {
      Tooltip.html(props.tooltip?.(d.data, color(d.data)) ?? `${d.data.key}: ${d.data.value}`)
      Tooltip.style('visibility', 'visible')
    })
    .on('mousemove', (event) => {
      Tooltip.style('transform', `translate3d(${event.pageX + 10}px,${event.pageY + 10}px,0)`)
    })
    .on('mouseleave', () => {
      Tooltip.style('visibility', 'hidden')
    })

  if (props.showLegend !== false) { return }

  // Create a group for the legend
  const legendGroup = svg
    .append('g')

  // Add legend
  const legend = legendGroup
    .selectAll('.legend')
    .data(dataReady)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(0, ${i * 30})`)
    .style('font-size', '14px')

  // Add colored rectangles to the legend
  legend
    .append('rect')
    .attr('x', 0)
    .attr('rx', 2)
    .attr('ry', 2)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', (d) => color(d.data))

  // Add legend text
  legend
    .append('text')
    .attr('x', 30)
    .attr('y', 9)
    .attr('dy', '0.35em')
    .attr('fill', 'var(--c-text-2)')
    .text((d) => d.data.key)

  // Show value next to the legend
  legend
    .append('text')
    .attr('x', 30 + (props.legendDiff ?? 70))
    .attr('y', 9)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'end')
    .attr('fill', 'var(--c-text-1)')
    .text((d) => d.data.value)

  // Center the groups
  const legendWidth = legendGroup.node()?.getBBox().width ?? 0
  svg.attr('transform', `translate(${width / 2 - legendWidth / 2},${clientHeight / 2})`)

  const legendHeight = legendGroup.node()?.getBBox().height ?? 0
  legendGroup.attr('transform', `translate(${radius * 1.5},${-legendHeight / 2})`)
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
  <div class="SChartDonut" ref="chartRef" />
</template>

<style scoped lang="postcss">
.SChartDonut {
  width: 100%;
  height: 100%;
  font-feature-settings: 'tnum' 1;
}

:deep(.tooltip) {
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 8px;
  transition: transform 0.4s ease-out, visibility 0s 0.75s;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 12px;
}
</style>
