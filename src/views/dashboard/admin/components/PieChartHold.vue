<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getHolds } from '@/api/report'
export default {
  props: {
    className: {
      type: String,
      default: 'pie-chart-hold'
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

      this.chart.setOption({
        title: {
          text: '个股'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        series: [
          {
            name: 'Stock Info',
            type: 'pie',
            roseType: 'radius',
            radius: [16, 96],
            center: ['50%', '46%'],
            data: [
              { value: 168, name: 'Industries' },
              { value: 88, name: 'Technology' },
              { value: 66, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 58, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 3600
          }
        ]
      })
      // 请求后台数据
      getHolds().then(response => {
        // 1.持股比例(饼状图)
        this.chart.setOption({
          series: [{
            data: response.data.reportData
          }]
        })
      })
    }
  }
}
</script>
