<template>
  <div style="padding: 8px">
    <div id="rt_kj" style="height: 460px;width: 100%;float: left;" />
  </div>
</template>
<script>
import echarts from 'echarts'

require('echarts/theme/macarons')

export default {
  name: 'RtKj',

  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const yiYao = echarts.init(document.getElementById('rt_kj'), 'macarons')
      const data1 = {
        'name': '大科技',
        'children': [
          {
            'name': '软件',
            'children': [
              { 'name': '广联达', 'value': '002410', 'children': [{ 'name': '国内建筑工程行业信息化龙头企业' }] },
              { 'name': '恒生电子', 'value': '600570', 'children': [{ 'name': '国内金融综合IT软件服务商第一龙头股' }] },
              { 'name': '宝信软件', 'value': '600845', 'children': [{ 'name': 'A股工业互联网软件龙头' }] },
              { 'name': '用友网络', 'value': '600588', 'children': [{ 'name': '国内企业级应用软件龙头' }] }
            ]
          }, {
            'name': '芯片',
            'children': [
              { 'name': '北方华创', 'value': '002371', 'children': [{ 'name': '国内高端半导体设备龙头' }] },
              { 'name': '长电科技', 'value': '600584', 'children': [{ 'name': '国内半导体封测龙头' }] },
              { 'name': '紫光国微', 'value': '002049', 'children': [{ 'name': '国内领先的集成电路芯片设计企业' }] },
              { 'name': '至纯科技', 'value': '603690', 'children': [{ 'name': 'A股唯一高纯工艺系统集成供应商' }] },
              { 'name': '士兰微', 'value': '600460', 'children': [{ 'name': '国内芯片IDM一体化龙头' }] }
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

