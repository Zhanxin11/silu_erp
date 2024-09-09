/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:16:38
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-05 09:32:14
 * @FilePath: \vue-element-admin\src\router\modules\proManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import Layout from '@/layout'

const manageRouter = {
  path: '/proMange',
  component: Layout,
  redirect: '/table/index',
  name: 'Table',
  meta: {
    title: 'chanp',
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

export default manageRouter
