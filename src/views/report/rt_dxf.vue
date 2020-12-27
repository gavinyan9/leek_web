<template>
  <div style="padding: 8px">
    <div id="income_mon" style="height: 460px;width: 100%;float: left;" />
  </div>
</template>
<script>
import echarts from 'echarts'

require('echarts/theme/macarons')

export default {
  name: 'RtIncome',

  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const income_mon = echarts.init(document.getElementById('income_mon'), 'macarons')
      const data1 = {
        'name': '大消费',
        'children': [{
          'name': '酿酒',
          'children': [{
            'name': '白酒',
            'children': [
              { 'name': '山西汾酒', 'value': '' }
            ]
          }]
        }, {
          'name': '调味品',
          'children': [{
            'name': '酱油',
            'children': [
              { 'name': '海天味业', 'value': '' }
            ]
          }, {
            'name': '食用醋',
            'children': [
              { 'name': '恒顺醋业', 'value': '' }
            ]
          }]
        }, {
          'name': '乳制品',
          'children': [{
            'name': '奶酪',
            'children': [
              { 'name': '妙可蓝多', 'value': '' }
            ]
          }, {
            'name': '牛奶',
            'children': [
              { 'name': '伊利股份', 'value': '' }
            ]
          }]
        }, {
          'name': '零食',
          'children': [{ 'name': '良品铺子', 'value': '' }, { 'name': '三只松鼠', 'value': '' }
          ]
        }, {
          'name': '速冻食品',
          'children': [{ 'name': '安井食品', 'value': '' },
            { 'name': '三全食品', 'value': '' }
          ]
        }, {
          'name': '小电器',
          'children': [{ 'name': '小熊电器', 'value': '' }

          ]
        }]
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

