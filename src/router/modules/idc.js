/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const idcRouter = {
  path: '/idc',
  name: 'IDC',
  component: Layout,
  meta: { title: 'IDC', icon: 'chart' },
  children: [{
    path: 'pf_day',
    name: '日收益率',
    component: () => import('@/views/idc/idc_profit_day'),
    meta: { title: '日收益率', icon: 'chart' }
  }, {
    path: 'pf_mon',
    name: '月收益率',
    component: () => import('@/views/idc/idc_profit_mon'),
    meta: { title: '月收益率', icon: 'chart' }
  }, {
    path: 'pf_year',
    name: '年收益率',
    component: () => import('@/views/idc/idc_profit_year'),
    meta: { title: '年收益率', icon: 'chart' }
  }, {
    path: 'idc_bm',
    name: '白马股',
    component: () => import('@/views/idc/idc_bm'),
    meta: { title: '白马股', icon: 'chart' }
  }, {
    path: 'company',
    name: '上市公司',
    component: () => import('@/views/idc/idc_company'),
    meta: { title: '上市公司', icon: 'chart' }
  }]
}

export default idcRouter
