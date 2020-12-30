<template>
  <div style="padding: 8px">
    <div id="income_mon" style="height: 460px;width: 100%;float: left;" />
  </div>
</template>
<script>
import echarts from 'echarts'

require('echarts/theme/macarons')

export default {
  name: 'RtDxf',

  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const income_mon = echarts.init(document.getElementById('income_mon'), 'macarons')
      const data1 = {
        'name': '大消费',
        'children': [{
          'name': '食品',
          'children': [
            { 'name': '山西汾酒', 'value': '600809', 'children': [{ 'name': '白酒第一梯队最靓的仔' }] },
            { 'name': '百润股份', 'value': '002568', 'children': [{ 'name': '鸡尾酒里的战斗机' }] },
            { 'name': '妙可蓝多', 'value': '600882', 'children': [{ 'name': '国内奶酪龙头' }] },
            { 'name': '安井食品', 'value': '603345', 'children': [{ 'name': '速冻火锅料龙头' }] },
            { 'name': '良品铺子', 'value': '603719', 'children': [{ 'name': '国内休闲零食龙头' }] },
            { 'name': '伊利股份', 'value': '600887', 'children': [{ 'name': '国内乳业龙头' }] },
            { 'name': '海天味业', 'value': '603288', 'children': [{ 'name': '国内酱油行业龙头' }] },
            { 'name': '恒顺醋业', 'value': '600305', 'children': [{ 'name': '国内食醋龙头' }] }
          ]
        }, {
          'name': '日用品',
          'children': [
            { 'name': '珀莱雅', 'value': '603605', 'children': [{ 'name': '国内化妆品龙头' }] },
            { 'name': '小熊电器', 'value': '002959', 'children': [{ 'name': '国内小电器龙头' }] },
            { 'name': '中顺洁柔', 'value': '002511', 'children': [{ 'name': '国内生活用纸龙头' }] },
            { 'name': '晨光文具', 'value': '603899', 'children': [{ 'name': '国内文具龙头' }] }
          ]
        }, {
          'name': '非必需品',
          'children': [
            { 'name': '中国中免', 'value': '601888', 'children': [{ 'name': '国内免税龙头' }] },
            { 'name': '锦江酒店', 'value': '600754', 'children': [{ 'name': '国内酒店业务龙头' }] }
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

