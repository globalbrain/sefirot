<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import * as d3 from 'd3'
import { useTemplateRef, watch } from 'vue'
import { type ChartColor, type KV, type Margins, c, getColor } from '../support/Chart'

const props = withDefaults(defineProps<{
  // Data
  data: KV[]

  // Styling
  colors?: ChartColor[]
  margins?: Margins

  // Axis & labels
  xLabel?: string
  yLabel?: string
  xLabelOffset?: number
  yLabelOffset?: number
  xLabelFontSize?: string
  yLabelFontSize?: string
  ticks?: number
  tickFontSize?: string

  // Line appearance
  strokeWidth?: number
  showPoints?: boolean
  pointRadius?: number

  // Tooltip & interactivity
  tooltip?: boolean
  tooltipFormat?: (d: KV, color: string) => string

  // Animation & debug
  animate?: boolean
  debug?: boolean
}>(), {
  colors: () => ['blue'],

  xLabelFontSize: '14px',
  yLabelFontSize: '14px',
  ticks: 5,
  tickFontSize: '14px',

  strokeWidth: 2,
  showPoints: true,
  pointRadius: 4,

  tooltip: true,
  tooltipFormat: (d: KV) => `${d.key} – ${d.value}`,

  animate: true,
  debug: false
})

const chartRef = useTemplateRef('chart')
const { width, height } = useElementSize(chartRef)
let tooltipTimeout = 0

function renderChart({ clientWidth, clientHeight, animate }: { clientWidth: number; clientHeight: number; animate: boolean }) {
  if (!chartRef.value) { return }

  // Determine line color
  const lineColor = getColor(...props.colors)

  // Clear existing
  d3.select(chartRef.value).selectAll('*').remove()

  // Setup margins and dimensions
  const margin = {
    top: props.margins?.top ?? 30,
    right: props.margins?.right ?? 40,
    bottom: props.margins?.bottom ?? 60,
    left: props.margins?.left ?? 60
  }
  const w = clientWidth - margin.left - margin.right
  const h = clientHeight - margin.top - margin.bottom

  // Scales
  const x = d3.scalePoint<string>()
    .domain(props.data.map((d) => d.key))
    .range([0, w])
    .padding(0.5)
  const y = d3.scaleLinear()
    .domain([0, d3.max(props.data, (d) => d.value)!])
    .nice()
    .range([h, 0])

  // Create SVG container
  const svg = d3.select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', clientHeight)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // X Axis
  svg.append('g')
    .attr('transform', `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(props.ticks))
    .selectAll('text')
    .attr('fill', c.text2)
    .style('font-size', props.tickFontSize)
    .style('text-anchor', 'middle')
  svg.select('.domain').remove()

  // Y Axis
  svg.append('g')
    .call(d3.axisLeft(y).ticks(props.ticks))
    .selectAll('text')
    .attr('fill', c.text2)
    .style('font-size', props.tickFontSize)
  svg.select('.domain').remove()

  // Grid lines
  svg.selectAll()
    .data(y.ticks(props.ticks))
    .enter()
    .append('line')
    .attr('stroke', c.divider)
    .attr('stroke-dasharray', '2,2')
    .attr('x1', 0)
    .attr('x2', w)
    .attr('y1', (d) => y(d))
    .attr('y2', (d) => y(d))

  // Axis labels
  if (props.xLabel) {
    svg.append('text')
      .attr('x', w / 2)
      .attr('y', h + (props.xLabelOffset ?? 46))
      .attr('fill', c.text2)
      .style('font-size', props.xLabelFontSize)
      .style('text-anchor', 'middle')
      .html(props.xLabel)
  }
  if (props.yLabel) {
    svg.append('text')
      .attr('x', -h / 2)
      .attr('y', -(props.yLabelOffset ?? 40))
      .attr('transform', 'rotate(-90)')
      .attr('fill', c.text2)
      .style('font-size', props.yLabelFontSize)
      .style('text-anchor', 'middle')
      .html(props.yLabel)
  }

  // Line generator
  const lineGen = d3.line<KV>()
    .x((d) => x(d.key)!)
    .y((d) => y(d.value))
    .curve(d3.curveMonotoneX)

  // Draw line path
  const path = svg.append('path')
    .datum(props.data)
    .attr('fill', 'none')
    .attr('stroke', lineColor)
    .attr('stroke-width', props.strokeWidth)
    .attr('d', lineGen)

  // Animate path
  if (animate) {
    const totalLength = (path.node() as SVGPathElement).getTotalLength()
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(800)
      .attr('stroke-dashoffset', 0)
  }

  // Draw points
  const circles = svg.selectAll('circle')
    .data(props.data)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d.key)!)
    .attr('cy', (d) => y(d.value))
    .attr('r', props.showPoints ? props.pointRadius : 0)
    .attr('fill', lineColor)

  // Animate points
  if (animate) {
    circles
      .attr('opacity', 0)
      .transition()
      .delay((_, i) => 800 + i * 100)
      .duration(500)
      .attr('opacity', 1)
  }

  // Tooltip interactivity
  if (props.tooltip) {
    const Tooltip = d3.select(chartRef.value)
      .append('div')
      .attr('class', 'tooltip')
    function updatePos(event: PointerEvent) {
      const [xPos, yPos] = d3.pointer(event, chartRef.value)
      Tooltip.style('left', `${xPos + 14}px`).style('top', `${yPos + 14}px`)
    }
    circles
      .on('pointerenter', (event: PointerEvent, d) => {
        window.clearTimeout(tooltipTimeout)
        Tooltip.html(props.tooltipFormat(d, lineColor)).style('opacity', '1')
        updatePos(event)
      })
      .on('pointermove', updatePos)
      .on('pointerleave', () => {
        window.clearTimeout(tooltipTimeout)
        tooltipTimeout = window.setTimeout(() => {
          Tooltip.style('opacity', '0')
        }, 400)
      })
  }

  // Debug outline
  if (props.debug) {
    d3.select(chartRef.value)
      .append('div')
      .style('position', 'absolute')
      .style('top', `${margin.top}px`)
      .style('left', `${margin.left}px`)
      .style('width', `${w}px`)
      .style('height', `${h}px`)
      .style('outline', '1px solid blue')
      .style('pointer-events', 'none')
    circles.style('outline', '1px solid green')
  }
}

// Watch for size or prop changes
watch(
  [width, height, () => props],
  ([clientWidth, clientHeight], [oldW, oldH]) => {
    if (!clientWidth || !clientHeight) { return }
    renderChart({
      clientWidth,
      clientHeight,
      animate:
        props.animate
        && ((oldW === 0 && oldH === 0)
          || (clientHeight === oldH && clientWidth === oldW))
    })
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div ref="chart" class="SChartLine" />
</template>

<style scoped lang="postcss">
.SChartLine {
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
  padding: 2px 8px;
  background-color: var(--c-bg-elv-2);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 12px;
}
</style>
