<template>
  <div style="padding: 8px">
    <div id="rt_yy" style="height: 460px;width: 100%;float: left;" />
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
      const yiYao = echarts.init(document.getElementById('rt_yy'), 'macarons')
      const data1 = {
        'name': '医药医疗',
        'children': [
          {
            'name': '中药',
            'children': [
              { 'name': '片仔癀', 'value': '', 'children': [{ 'name': '国内中成药龙头' }] },
              { 'name': '云南白药', 'value': '', 'children': [{ 'name': '品牌中药龙头企业，国家级绝密配方' }] }
            ]
          }, {
            'name': '化学制药',
            'children': [
              { 'name': '恒瑞医药', 'value': '', 'children': [{ 'name': '国内化学制药、创新药龙头.抗肿瘤药、手术用药和造影剂,A股最大市值医药股' }] },
              { 'name': '复星医药', 'value': '', 'children': [{ 'name': '覆盖药品+器械+服务的全产业链的龙头' }] },
              { 'name': '华海药业', 'value': '600521', 'children': [{ 'name': '国内特色原料药行业的龙头企业' }] }
            ]
          }, {
            'name': '生产外包',
            'children': [
              { 'name': '药明康德', 'value': '', 'children': [{ 'name': 'CXO完整产业链龙头' }] },
              { 'name': '凯莱英', 'value': '', 'children': [{ 'name': '小分子化学制药CDMO国内龙头' }] },
              { 'name': '昭衍新药', 'value': '', 'children': [{ 'name': '药物非临床安全性评价评价龙头' }] }
            ]
          }, {
            'name': '疫苗生物',
            'children': [
              { 'name': '长春高新', 'value': '', 'children': [{ 'name': '重组人生长激素龙头' }] }
            ]
          }, {
            'name': '医药零售',
            'children': [
              { 'name': '益丰药房', 'value': '', 'children': [{ 'name': '国内区域领先的大型医药零售连锁企业' }] },
              { 'name': '大参林', 'value': '', 'children': [{ 'name': '专注于中西成药、保健品、医疗企业以及其他商品的直营连锁零售业务' }] }
            ]
          }, {
            'name': '医疗服务',
            'children': [
              { 'name': '金域医学', 'value': '', 'children': [{ 'name': '提供医学检验及病理诊断外包服务' }] },
              { 'name': '通策医疗', 'value': '', 'children': [{ 'name': '国内口腔医疗龙头股' }] }
            ]
          }, {
            'name': '医疗器械',
            'children': [
              { 'name': '山东药玻', 'value': '', 'children': [{ 'name': '药用玻璃龙头' }] }
            ]
          }
        ]
      }
      yiYao.setOption({
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

