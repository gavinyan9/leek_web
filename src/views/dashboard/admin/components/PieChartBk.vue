<template>
  <div class="bk-pie-chart" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getBkHolds } from '@/api/report'
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

      this.chart.setOption({
        title: {
          text: '板块'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex']
        },
        series: [
          {
            name: '板块',
            type: 'pie',
            roseType: 'radius',
            radius: [16, 96],
            center: ['50%', '46%'],
            data: [
              { value: 168, name: 'Industries' },
              { value: 88, name: 'Technology' },
              { value: 66, name: 'Forex' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 3600
          }
        ]
      })
      // 请求后台数据
      getBkHolds().then(response => {
        // 投资板块比例(饼状图)
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

