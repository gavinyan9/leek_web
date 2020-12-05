/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const habitRouter = {
  path: '/habit',
  component: Layout,
  redirect: '/habit/diary',
  name: 'Habit',
  meta: { title: 'Habit', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'diary',
      name: 'Diary',
      component: () => import('@/views/habit/diarys'),
      meta: { title: 'Diary', icon: 'form' }
    }, {
      path: 'ideas',
      name: 'Ideas',
      component: () => import('@/views/habit/ideas'),
      meta: { title: 'Ideas', icon: 'guide' }
    }, {
      path: 'plans',
      name: 'Plans',
      component: () => import('@/views/habit/plans'),
      meta: { title: 'Plans', icon: 'list' }
    }
  ]
}

export default habitRouter
