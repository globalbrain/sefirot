<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import * as d3 from 'd3'
import { useTemplateRef, watch } from 'vue'
import { type ChartColor, type KV, type Margins, c, scheme } from '../support/Chart'

const props = withDefaults(defineProps<{
  // State
  data: KV[]
  activeKey?: string

  // Chart appearance
  type?: 'pie' | 'donut'
  half?: boolean
  colors?: ChartColor[]
  margins?: Margins
  innerRadius?: (outerRadius: number) => number

  // Labels
  labels?: boolean
  labelFormat?: (d: KV) => string
  labelFontSize?: string

  // Legend
  legend?: boolean
  legendFormatKey?: (d: KV) => string
  legendFormatValue?: (d: KV) => string
  legendPadding?: number
  legendFontSize?: string

  // Tooltip & interactivity
  tooltip?: boolean
  tooltipFormat?: (d: KV, color: string) => string

  // Animation & debug
  animate?: boolean
  debug?: boolean
}>(), {
  type: 'donut',
  half: false,

  labels: false,
  labelFormat: (d: KV) => `${d.key} – ${d.value}`,
  labelFontSize: '14px',

  legend: true,
  legendFormatKey: (d: KV) => d.key,
  legendFormatValue: (d: KV) => d.value.toString(),
  legendPadding: 70,
  legendFontSize: '14px',

  tooltip: true,
  tooltipFormat: (d: KV) => `${d.key} – ${d.value}`,

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

  // Clear any existing SVG
  d3
    .select(chartRef.value)
    .selectAll('*')
    .remove()

  // Set dimensions and margins
  const margin = {
    top: props.margins?.top ?? 30,
    right: props.margins?.right ?? 30,
    bottom: props.margins?.bottom ?? 30,
    left: props.margins?.left ?? 30
  }
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
      .style('font-size', props.legendFontSize)

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
      .attr('fill', c.text2)
      .html((d) => props.legendFormatKey(d.data))

    // Show value next to the legend
    legend
      .append('text')
      .attr('x', 30 + props.legendPadding)
      .attr('y', 14 / 2)
      .attr('dy', '0.35em')
      .attr('fill', c.text1)
      .attr('text-anchor', 'end')
      .html((d) => props.legendFormatValue(d.data))

    ;({ width: legendWidth = 0, height: legendHeight = 0 } = legendGroup?.node()?.getBBox() ?? {})

    // Animate the legends
    if (animate) {
      legend
        .attr('opacity', 0)
        .transition()
        .delay((d, i) => i * 100)
        .duration(800)
        .attr('opacity', 1)
    }
  }

  // Calculate radius and center the chart
  const r_k = props.half ? 0.25 : 0.5
  const radius = Math.min(height_2, (width - legendWidth) / (2 + (props.legend ? r_k : 0)))
  const innerRadius = props.innerRadius?.(radius) ?? (props.type === 'pie' ? 6 : Math.max(radius / 1.5, radius - 50))

  legendGroup
    ?.attr('transform', `translate(${radius * (1 + r_k)},${-(props.half ? height_2 : 0) / 2 - legendHeight / 2})`)
  svg
    .attr('transform', `translate(${margin.left + width_2 - (props.legend ? radius * r_k + legendWidth : 0) / 2},${margin.top + height_2})`)

  // Create arc generator
  const arc = d3
    .arc<d3.PieArcDatum<KV>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(2)

  // Add the arcs
  const transform = `translate(0,${-(height_2 - radius) / 2})`
  const activeTransform = `${transform} scale(1.05)`

  const arcs = svg
    .selectAll()
    .data(dataReady)
    .join('path')
    .attr('fill', (d) => color(d.data))
    .attr('transform', transform)

  const activeArcs = arcs
    .filter((d) => d.data.key === props.activeKey)

  if (!animate) {
    arcs
      .attr('d', arc)

    activeArcs
      .attr('transform', activeTransform)
  } else {
    // Animate the arcs
    arcs
      .attr('d', arc({ startAngle: 0, endAngle: 0, data: {} } as any))
      .transition()
      .duration(800 + props.data.length * 100)
      .attrTween('d', (d) => {
        const startAngle = props.half ? -Math.PI / 2 : 0
        const i = d3.interpolate({ startAngle, endAngle: startAngle }, d)
        return (t) => arc(i(t))!
      })
      .end()
      .then(() => {
        activeArcs
          .transition()
          .duration(200)
          .attr('transform', activeTransform)
      })
  }

  if (props.labels) {
    const labelArc = d3.arc<d3.PieArcDatum<KV>>()
      .innerRadius(radius)
      .outerRadius(radius)

    const labels = svg
      .selectAll()
      .data(dataReady)
      .enter()
      .append('g')
      .attr('transform', transform)

    const leftOrRight = (d: d3.PieArcDatum<KV>) => {
      const midAngle = (d.startAngle + d.endAngle) / 2
      if (props.half) {
        return midAngle < 0 ? -1 : 1
      }
      return midAngle < Math.PI ? 1 : -1
    }

    labels
      .append('polyline')
      .attr('stroke', c.divider)
      .attr('fill', 'none')
      .attr('points', (d) => {
        const posA = arc.centroid(d)
        const posB = labelArc.centroid(d)
        const posC = labelArc.centroid(d)
        posC[0] = radius * 1.05 * leftOrRight(d)
        return [posA, posB, posC].map((p) => p.join(','))
      })

    labels
      .append('text')
      .attr('transform', (d) => {
        const pos = labelArc.centroid(d)
        pos[0] = radius * 1.1 * leftOrRight(d)
        return `translate(${pos})`
      })
      .attr('dy', '0.35em')
      .attr('fill', c.text2)
      .attr('text-anchor', (d) => leftOrRight(d) === 1 ? 'start' : 'end')
      .style('font-size', props.labelFontSize)
      .html((d) => props.labelFormat(d.data))

    if (animate) {
      labels
        .attr('opacity', 0)
        .transition()
        .delay((_, i) => 800 + i * 100)
        .duration(500)
        .attr('opacity', 1)
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

    arcs
      .on('pointerenter', (event: PointerEvent, { data: d }) => {
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
  <div ref="chart" class="SChartPie" />
</template>

<style scoped lang="postcss">
.SChartPie {
  width: 100%;
  height: 100%;
  font-feature-settings: 'tnum' 1;
  position: relative;
}

:deep(.tooltip) {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 8px;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 12px;
}
</style>
