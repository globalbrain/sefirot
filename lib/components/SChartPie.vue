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
  innerRadius?: (outerRadius: number) => number
  mode?: 'pie' | 'donut'
  half?: boolean
  debug?: boolean
  legend?: boolean
  legendFormatKey?: (d: KV) => string
  legendFormatValue?: (d: KV) => string
  legendPadding?: number
  animations?: boolean
}>(), {
  tooltip: (d: KV) => `${d.key}: ${d.value}`,
  margins: (props) => ({ top: 30, right: 30, bottom: 60, left: 60, ...props.margins }),
  mode: 'donut',
  half: false,
  debug: false,
  legend: true,
  legendFormatKey: (d: KV) => d.key,
  legendFormatValue: (d: KV) => d.value.toString(),
  legendPadding: 70,
  animations: true
})

const chartRef = ref<HTMLElement>()
const { width, height } = useElementSize(chartRef)

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
  const margin = props.margins as Required<typeof props.margins>
  const width = clientWidth - margin.left - margin.right
  const height = clientHeight - margin.top - margin.bottom

  const width_2 = width / 2
  const height_2 = props.half ? height : height / 2

  // Create SVG
  const svg = d3
    .select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', clientHeight)
    .append('g')

  // Prepare data
  const pie = d3
    .pie<KV>()
    .value((d) => d.value)
    .sort(null)
    .padAngle(0.02)

  if (props.half) {
    pie.startAngle(-Math.PI / 2)
    pie.endAngle(Math.PI / 2)
  }

  const dataReady = pie(props.data)

  // Render legend
  let legendGroup
  let legendHeight = 0
  let legendWidth = 0
  if (props.legend) {
    // Create a group for the legend
    legendGroup = svg
      .append('g')

    // Add legend
    const legend = legendGroup
      .selectAll()
      .data(dataReady)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0,${i * 24})`)
      .style('font-size', '14px')

    // Add colored rectangles to the legend
    legend
      .append('rect')
      .attr('x', 0)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('width', 14)
      .attr('height', 14)
      .attr('fill', (d) => color(d.data))

    // Add legend text
    legend
      .append('text')
      .attr('x', 30)
      .attr('y', 14 / 2)
      .attr('dy', '0.35em')
      .attr('fill', 'var(--c-text-2)')
      .text((d) => props.legendFormatKey(d.data))

    // Show value next to the legend
    legend
      .append('text')
      .attr('x', 30 + props.legendPadding)
      .attr('y', 14 / 2)
      .attr('dy', '0.35em')
      .attr('fill', 'var(--c-text-1)')
      .attr('text-anchor', 'end')
      .text((d) => props.legendFormatValue(d.data))

    ;({ width: legendWidth = 0, height: legendHeight = 0 } = legendGroup?.node()?.getBBox() ?? {})
  }

  // Calculate radius and center the chart
  const r_k = props.half ? 0.25 : 0.5
  const radius = Math.min(height_2, (width - legendWidth) / (2 + (props.legend ? r_k : 0)))
  const innerRadius = props.innerRadius?.(radius) ?? (props.mode === 'pie' ? 6 : Math.max(radius / 1.5, radius - 50))

  legendGroup
    ?.attr('transform', `translate(${radius * (1 + r_k)},${-(props.half ? height_2 : 0) / 2 - legendHeight / 2})`)
  svg
    .attr('transform', `translate(${margin.left + width_2 - (props.legend ? radius * r_k + legendWidth : 0) / 2},${margin.top + height_2})`)

  // Create arc generator
  const arc = d3
    .arc<d3.PieArcDatum<KV>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(4)

  // Add the arcs
  const arcs = svg
    .selectAll()
    .data(dataReady)
    .join('path')
    .attr('d', animate ? arc({ startAngle: 0, endAngle: 0, data: {} } as any) : arc)
    .attr('fill', (d) => color(d.data))
    .attr('transform', () => `translate(0,${-(height_2 - radius) / 2})`)

  // Create a tooltip
  const Tooltip = d3
    .select(chartRef.value)
    .append('div')
    .attr('class', 'tooltip')

  // Add interactivity
  arcs
    .on('mouseover', (_, d) => {
      Tooltip
        .html(props.tooltip(d.data, color(d.data)))
        .style('visibility', 'visible')
    })
    .on('mousemove', (event: PointerEvent) => {
      const [x, y] = d3.pointer(event, chartRef.value)
      Tooltip
        .style('transform', `translate3d(${x + 14}px,${y + 14}px,0)`)
    })
    .on('mouseleave', () => {
      Tooltip
        .style('visibility', 'hidden')
    })

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

  if (animate) {
  // Animate the arcs
    arcs
      .transition()
      .duration(800 + props.data.length * 100)
      .attrTween('d', (d) => {
        const startAngle = props.half ? -Math.PI / 2 : 0
        const i = d3.interpolate({ startAngle, endAngle: startAngle }, d)
        return (t) => arc(i(t))!
      })
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
        props.animations
        && ((oldWidth === 0 && oldHeight === 0)
          || (clientHeight === oldHeight && clientWidth === oldWidth))
    })
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div ref="chartRef" class="SChartPie" />
</template>

<style scoped lang="postcss">
.SChartPie {
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
  transition: transform 0.4s ease-out, visibility 0s 0.75s;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 14px;
}
</style>
