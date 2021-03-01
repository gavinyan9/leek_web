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
    /*    },{
          path: 'income',
          name: 'Income',
          component: () => import('@/views/report/rt_income'),
          meta: { title: 'Income', icon: 'chart' }*/
  }
  ]
}

export default stockRouter
