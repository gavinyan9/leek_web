/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const stockRouter = {
  path: '/sk_cy',
  component: Layout,
  name: 'Cycle',
  meta: { title: 'Cycle', icon: 'shopping' },
  children: [{
    path: 'wp_fx',
    name: '尾盘选股',
    component: () => import('@/views/cycle/sk_wp_fx'),
    meta: { title: '尾盘选股', icon: 'table', affix: true }

  }, {
    path: 'cycle_fx',
    name: 'cycle选股',
    component: () => import('@/views/cycle/sk_cycle_fx'),
    meta: { title: 'cycle选股', icon: 'table', affix: true }

  }, {
    path: 'market',
    name: '个股热度',
    component: () => import('@/views/cycle/sk_market'),
    meta: { title: '个股热度', icon: 'table', affix: true }

  }, {
    path: 'rt_bk_zdf',
    name: '板块热度',
    component: () => import('@/views/report/rt_bk_zdf'),
    meta: { title: '板块热度', icon: 'chart' }
  }, {
    path: 'note',
    name: 'Notes',
    component: () => import('@/views/cycle/sk_note'),
    meta: { title: 'Notes', icon: 'form' }
  }
  ]
}

export default stockRouter
