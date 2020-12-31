<template>
  <div style="padding: 8px">
    <div id="rt_gdz" style="height: 460px;width: 100%;float: left;" />
  </div>
</template>
<script>
import echarts from 'echarts'

require('echarts/theme/macarons')

export default {
  name: 'RtGdz',

  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const rtGdz = echarts.init(document.getElementById('rt_gdz'), 'macarons')
      const data1 = {
        'name': '高端制造',
        'children': [
          {
            'name': '电子',
            'children': [
              { 'name': '立讯精密', 'value': '', 'children': [{ 'name': '连接器龙头，世界前三的精密制造' }] },
              { 'name': '歌尔股份', 'value': '', 'children': [{ 'name': '电声行业龙头、VR设备龙头' }] }
            ]
          }, {
            'name': '机械',
            'children': [
              { 'name': '恒立液压', 'value': '', 'children': [{ 'name': '液压行业龙头' }] },
              { 'name': '三一重工', 'value': '', 'children': [{ 'name': '工程机械行业龙头' }] },
              { 'name': '艾迪精密', 'value': '', 'children': [{ 'name': '工程机械领域破碎锤龙头' }] },
              { 'name': '捷昌驱动', 'value': '603583', 'children': [{ 'name': '国内线性驱动系统龙头企业' }] },
              { 'name': '东方电缆', 'value': '603606', 'children': [{ 'name': '国内海缆龙头' }] },
              { 'name': '浙江鼎力', 'value': '', 'children': [{ 'name': '国内智能高空作业平台高端制造龙头企业' }] }
            ]
          }, {
            'name': '军工',
            'children': [
              { 'name': '北摩高科', 'value': '002985', 'children': [{ 'name': '航空制动领域龙头' }] },
              { 'name': '洪都航空', 'value': '600316', 'children': [{ 'name': '国产教练机龙头' }] },
              { 'name': '航发动力', 'value': '600893', 'children': [{ 'name': '国内唯一生产航空全种类发动机上市公司' }] },
              { 'name': '航天发展', 'value': '000547', 'children': [{ 'name': '国防电子对抗龙头' }] },
              { 'name': '航天彩虹', 'value': '002389', 'children': [{ 'name': '国内无人机领域龙头企业' }] },
              { 'name': '中航沈飞', 'value': '600760', 'children': [{ 'name': '国内唯一一家战斗机上市公司' }] },
              { 'name': '中航高科', 'value': '600862', 'children': [{ 'name': '航空复材领域龙头' }] },
              { 'name': '中航光电', 'value': '002179', 'children': [{ 'name': '最大军用连接器制造企业' }] },
              { 'name': '中航西飞', 'value': '600768', 'children': [{ 'name': '国内军民用大飞机整机制造唯一平台' }] }
            ]
          }
        ]
      }
      rtGdz.setOption({
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

