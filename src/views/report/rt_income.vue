<template>
  <div style="padding: 8px">
    <div id="income_day" style="height: 260px;width: 100%;float: left;" />
    <div id="income_mon" style="height: 260px;width: 100%;float: left;" />
  </div>
</template>
<script>
import echarts from 'echarts'
import { getIncomeDay, getIncomeMon } from '@/api/report'

require('echarts/theme/macarons') // echarts theme

export default {
  name: 'RtIncome',
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      // 收益信息日报-start
      const income_day = echarts.init(document.getElementById('income_day'), 'macarons')
      income_day.setOption({
        title: {
          text: 'Daily'
        },
        tooltip: {},
        xAxis: {
          data: ['20200929', '20200930', '20201009', '20201012', '20201013']
        },
        yAxis: { show: true },
        series: [{
          name: 'money',
          type: 'bar',
          barWidth: 30,
          data: [-545.56, 244.85, 293.81, 7899, 1577],
          itemStyle: { // 上方显示数值
            normal: {
              label: {
                formatter: '{c}',
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 10
                }
              },
              color: function(params) {
                if (params.value > 0) {
                  return '#FF005A'
                } else {
                  return '#40c9c6'
                }
              }
            }
          }
        }]
      })
      // 请求后台数据
      getIncomeDay().then(response => {
        income_day.setOption({
          xAxis: {
            data: response.data.xAxisData
          },
          series: [{
            data: response.data.seriesData
          }]
        })
      })
      // 收益信息日报-end
      // 收益信息月报-start
      const income_mon = echarts.init(document.getElementById('income_mon'), 'macarons')
      income_mon.setOption({
        title: {
          text: 'Month'
        },
        tooltip: {},
        xAxis: {
          data: ['202004', '202005', '202006', '202007', '202008', '202009', '202010']
        },
        yAxis: { show: true },
        series: [{
          name: 'money',
          type: 'bar',
          barWidth: 30,
          data: [981.16, 3005.75, 16304.16, 12548.41, -6902.16, -2150.03, 11186.82],
          itemStyle: { // 上方显示数值
            normal: {
              label: {
                formatter: '{c}',
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 10
                }
              },
              color: function(params) {
                if (params.value > 0) {
                  return '#FF005A'
                } else {
                  return '#40c9c6'
                }
              }
            }
          }
        }]
      })
      // 请求后台数据
      getIncomeMon().then(response => {
        income_mon.setOption({
          xAxis: {
            data: response.data.xAxisData
          },
          series: [{
            data: response.data.seriesData
          }]
        })
      })
      // 收益信息月报-end
    }
  }
}
</script>

