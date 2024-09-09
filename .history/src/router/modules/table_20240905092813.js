
import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/index',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/table/index'),
      name: 'table',
      meta: { title: 'table' }
    },
    {
      path: 'project',
      component: () => import('@/views/table/project'),
      name: 'projectTable',
      meta: { title: 'projectTable' }
    },
    {
      path: 'spu',
      component: () => import('@/views/table/spu'),
      name: 'spuTable',
      meta: { title: 'spuTable', roles: 'admin' }
    },
    {
      path: 'inventory',
      component: () => import('@/views/table/inventory'),
      name: 'spuTable',
      meta: { title: 'inventoryTable', roles: 'admin' }
    },
    {
      path: 'demo',
      component: () => import('@/views/table/demo'),
      name: 'demoTable',
      meta: { title: 'demoTable', roles: 'admin' }
    },
  ]
}
export default tableRouter
