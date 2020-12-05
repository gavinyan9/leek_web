/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const idcRouter = {
  path: '/idc',
  name: 'IDC',
  component: Layout,
  meta: { title: 'IDC', icon: 'chart' },
  children: [{
    path: 'pf_year',
    name: '个股年收益率',
    component: () => import('@/views/profit/pf_year'),
    meta: { title: '个股年收益率', icon: 'chart' }
  }, {
    path: 'pf_mon',
    name: '个股月收益率',
    component: () => import('@/views/profit/pf_mon'),
    meta: { title: '个股月收益率', icon: 'chart' }
  }, {
    path: 'watch',
    name: '价值分析',
    component: () => import('@/views/idc/idc_watch'),
    meta: { title: '价值分析', icon: 'eye-open' }
  }, {
    path: 'company',
    name: '上市公司',
    component: () => import('@/views/idc/idc_company'),
    meta: { title: '上市公司', icon: 'chart' }
  }]
}

export default idcRouter