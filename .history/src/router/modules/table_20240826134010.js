/*
 * @Author: DESKTOP-8QHKAV9\zhanxin 749959696@qq.com
 * @Date: 2024-03-21 14:13:38


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

    // {
    //   path: 'drag-table',
    //   component: () => import('@/views/table/drag-table'),
    //   name: 'DragTable',
    //   meta: { title: 'dragTable' }
    // },
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inline-edit-table'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'inlineEditTable' }
    // },

  ]
}
export default tableRouter
