<template>
  <div class="bk-pie-chart" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { getBkHolds } from '@/api/report'

require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'pie-chart-bk'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      var xAxisData = []
      var data1 = []
      var data2 = []

      for (var i = 0; i < 10; i++) {
        xAxisData.push('Class' + i)
        data1.push((Math.random() * 2).toFixed(2))
        data2.push(-Math.random().toFixed(2))
      }

      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      }
      this.chart.setOption({
        color: ['#f4516c', '#34bfa3'],
        legend: {
          data: ['上涨', '下跌'],
          left: '10%'
        },
        brush: {
          toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
          xAxisIndex: 0
        },
        toolbox: {
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {}
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          //  name: 'X Axis',
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false }
        },
        yAxis: {},
        grid: {
          left: '5%',
          right: '2%',
          bottom: 30
        },
        series: [
          {
            name: '上涨',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data1
          },
          {
            name: '下跌',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data2
          }
        ]
      })
      // 请求后台数据
      getBkHolds().then(response => {
        // 投资板块比例(饼状图)
        this.chart.setOption({
          xAxis: {
            data: response.data.xAxisData
          },
          series: [
            {
              name: '上涨',
              type: 'bar',
              stack: 'one',
              emphasis: emphasisStyle,
              data: response.data.data1
            },
            {
              name: '下跌',
              type: 'bar',
              stack: 'one',
              emphasis: emphasisStyle,
              data: response.data.data2
            }
          ]
        })
      })
    }
  }
}
</script>

