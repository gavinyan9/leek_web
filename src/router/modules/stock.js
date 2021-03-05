/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const stockRouter = {
  path: '/stock',
  component: Layout,
  name: 'Stock',
  meta: { title: 'Stock', icon: 'shopping' },
  children: [{
    path: 'collect',
    name: 'Collect',
    component: () => import('@/views/stock/sk_collect'),
    meta: { title: 'Collect', icon: 'star', affix: true }
  }, {
    path: 'wp_fx',
    name: '尾盘选股',
    component: () => import('@/views/stock/sk_wp_fx'),
    meta: { title: '尾盘选股', icon: 'table', affix: true }

  }, {
    path: 'cycle_fx',
    name: 'cycle选股',
    component: () => import('@/views/stock/sk_cycle_fx'),
    meta: { title: 'cycle选股', icon: 'table', affix: true }

  }, {
    path: 'market',
    name: '个股热度',
    component: () => import('@/views/stock/sk_market'),
    meta: { title: '个股热度', icon: 'table', affix: true }

  }, {
    path: 'rt_bk_zdf',
    name: '板块热度',
    component: () => import('@/views/report/rt_bk_zdf'),
    meta: { title: '板块热度', icon: 'chart' }
  }, {
    path: 'note',
    name: 'Notes',
    component: () => import('@/views/stock/sk_note'),
    meta: { title: 'Notes', icon: 'form' }
  }
  ]
}

export default stockRouter
