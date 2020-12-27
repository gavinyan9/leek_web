<template>
  <div style="padding: 8px">
    <div id="income_mon" style="height: 530px;width: 100%;float: left;" />
  </div>
</template>
<script>
import echarts from 'echarts'

require('echarts/theme/macarons')

export default {
  name: 'RtNy',

  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      // 收益信息月报-start
      const income_mon = echarts.init(document.getElementById('income_mon'), 'macarons')
      const data1 = {
        'name': '新能源',
        'children': [
          {
            'name': '锂电池',
            'children': [
              { 'name': '比亚迪', 'value': '002594', 'children': [{ 'name': '新能源汽车技术综合实力第一' }] },
              { 'name': '赣锋锂业', 'value': '002460', 'children': [{ 'name': '锂电池原材料龙头' }] },
              { 'name': '华友钴业', 'value': '603799', 'children': [{ 'name': '金属钴龙头，国内市场占有率最大' }] },
              { 'name': '天赐材料', 'value': '002709', 'children': [{ 'name': '国内电解液龙头' }] },
              { 'name': '恩捷股份', 'value': '002812', 'children': [{ 'name': '世界第一大锂电隔膜供应商' }] },
              { 'name': '多氟多', 'value': '002407', 'children': [{ 'name': '六氟磷酸锂龙头' }] },
              { 'name': '法拉电子', 'value': '600563', 'children': [{ 'name': '薄膜电容器龙头' }] },
              { 'name': '杉杉股份', 'value': '600884', 'children': [{ 'name': '正极材料龙头' }] },
              { 'name': '璞泰来', 'value': '603659', 'children': [{ 'name': '负极材料龙头' }] }
            ]
          }, {
            'name': '光伏',
            'children': [{
              'name': '硅料',
              'children': [
                { 'name': '通威股份', 'value': '600438' }
              ]
            }, {
              'name': '硅片',
              'children': [
                { 'name': '隆基股份', 'value': '601012' },
                { 'name': '中环股份', 'value': '002129' }
              ]
            }, {
              'name': '电池片',
              'children': [
                { 'name': '爱旭股份', 'value': '600732' }
              ]
            }, {
              'name': '设备',
              'children': [
                { 'name': '上机数控', 'value': '603185' }
              ]
            }, {
              'name': '组件',
              'children': [
                { 'name': '晶澳科技', 'value': '002459' }
              ]
            }, {
              'name': '玻璃',
              'children': [
                { 'name': '福莱特', 'value': '601865' }
              ]
            }, {
              'name': '胶膜',
              'children': [
                { 'name': '福斯特', 'value': '603806' }
              ]
            }
            ]
          }, {
            'name': '风能',
            'children': [{
              'name': '叶片',
              'children': [
                { 'name': '中材科技', 'value': '002080' }
              ]
            }, {
              'name': '风塔',
              'children': [
                { 'name': '天顺风能', 'value': '002531' }
              ]
            }, {
              'name': '俦件',
              'children': [
                { 'name': '日月股份', 'value': '603218' },
                { 'name': '恒润股份', 'value': '603985' }
              ]
            }, {
              'name': '整机',
              'children': [
                { 'name': '金风科技', 'value': '002202' },
                { 'name': '明阳智能', 'value': '601615' }
              ]
            }]
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
            top: '1%',
            bottom: '1%',
            left: '8%',
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

