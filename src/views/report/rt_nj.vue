<template>
  <div style="padding: 8px">
    <div id="income_mon" style="height: 460px;width: 100%;float: left;" />
  </div>
</template>
<script>
import echarts from 'echarts'

require('echarts/theme/macarons')

export default {
  name: 'RtNj',

  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const income_mon = echarts.init(document.getElementById('income_mon'), 'macarons')
      const data1 = {
        'name': '酿酒行业',
        'children': [
          {
            'name': '白酒',
            'children': [
              { 'name': '贵州茅台', 'value': 1800 },
              { 'name': '五粮液', 'value': 260 },
              { 'name': '山西汾酒', 'value': 327 },
              { 'name': '洋河股份', 'value': 219 },
              { 'name': '泸州老窖', 'value': 212 },
              { 'name': '古井贡酒', 'value': 270 },
              { 'name': '酒鬼酒', 'value': 127.58 },
              { 'name': 'ST舍得', 'value': 82.82 },
              { 'name': '顺鑫农业', 'value': 68.8 },
              { 'name': '今世缘', 'value': 54 },
              { 'name': '金徽酒', 'value': 38.49 },
              { 'name': '迎驾贡酒', 'value': 34 },
              { 'name': '老白干酒', 'value': 27.35 },
              { 'name': '金种子酒', 'value': 19.77 }

            ]
          },
          {
            'name': '啤酒',
            'children': [
              { 'name': '重庆啤酒', 'value': 106 },
              { 'name': '青岛啤酒', 'value': 90 },
              { 'name': '兰州黄河', 'value': 10.53 },
              { 'name': '珠江啤酒', 'value': 10.66 },
              { 'name': '燕京啤酒', 'value': 8.5 }
            ]
          },
          {
            'name': '黄酒',
            'children': [
              { 'name': '古越龙山', 'value': 14 },
              { 'name': '金枫酒业', 'value': 10.34 },
              { 'name': '会稽山', 'value': 12 }
            ]
          },
          {
            'name': '鸡尾酒',
            'children': [
              { 'name': '百润股份', 'value': 98 }
            ]
          },
          {
            'name': '葡萄酒',
            'children': [
              { 'name': '张 裕Ａ', 'value': 44.9 },
              { 'name': '莫高股份', 'value': 9.4 }
            ]
          }
        ]
      }
      income_mon.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: [data1],
            top: '2%',
            bottom: '10%',
            left: '10%',
            right: '50%',
            symbolSize: 6,
            edgeShape: 'polyline',
            edgeForkPosition: '80%',
            initialTreeDepth: 3,
            lineStyle: {
              width: 1
            },

            label: {
              backgroundColor: '#fff',
              position: 'right',
              verticalAlign: 'middle',
              align: 'right'
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
    }
  }
}
</script>

