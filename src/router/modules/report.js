/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  name: 'Report',
  component: Layout,
  meta: { title: 'Report', icon: 'chart' },
  children: [{
    path: 'rt_bk_zdf',
    name: '板块涨跌',
    component: () => import('@/views/report/rt_bk_zdf'),
    meta: { title: '板块涨跌', icon: 'chart' }
  }, {
    path: 'rt_nj',
    name: '酿酒行业细分',
    component: () => import('@/views/report/rt_nj'),
    meta: { title: '酿酒行业细分', icon: 'chart' }
  }, {
    path: 'rt_ny',
    name: '新能源行业细分',
    component: () => import('@/views/report/rt_ny'),
    meta: { title: '新能源行业细分', icon: 'chart' }
  }, {
    path: 'rt_dxf',
    name: '大消费细分',
    component: () => import('@/views/report/rt_dxf'),
    meta: { title: '大消费细分', icon: 'chart' }
  }, {
    path: 'rt_100',
    name: '年化风云榜',
    component: () => import('@/views/idc/idc_profit_total'),
    meta: { title: '年化风云榜', icon: 'chart' }
  }]
}
export default reportRouter
