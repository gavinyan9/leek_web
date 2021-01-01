/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  name: 'Report',
  component: Layout,
  meta: { title: 'Report', icon: 'chart' },
  children: [{
    path: 'rt_ny',
    name: '新能源',
    component: () => import('@/views/report/rt_ny'),
    meta: { title: '新能源', icon: 'chart' }
  }, {
    path: 'rt_gdz',
    name: '高端制造',
    component: () => import('@/views/report/rt_gdz'),
    meta: { title: '高端制造', icon: 'chart' }
  }, {
    path: 'rt_yy',
    name: '医药医疗',
    component: () => import('@/views/report/rt_yy'),
    meta: { title: '医药医疗', icon: 'chart' }
  }, {
    path: 'rt_dxf',
    name: '大消费',
    component: () => import('@/views/report/rt_dxf'),
    meta: { title: '大消费', icon: 'chart' }
  }, {
    path: 'rt_kj',
    name: '大科技',
    component: () => import('@/views/report/rt_kj'),
    meta: { title: '大科技', icon: 'chart' }
  }, {
    path: 'rt_bm',
    name: '白马股',
    component: () => import('@/views/report/rt_bm'),
    meta: { title: '白马股', icon: 'chart' }
  }, {
    path: 'rt_nj',
    name: '酿酒',
    component: () => import('@/views/report/rt_nj'),
    meta: { title: '酿酒', icon: 'chart' }
  }, {
    path: 'rt_bk_zdf',
    name: '板块涨跌',
    component: () => import('@/views/report/rt_bk_zdf'),
    meta: { title: '板块涨跌', icon: 'chart' }
  }]
}
export default reportRouter
