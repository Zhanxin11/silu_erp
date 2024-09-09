/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:16:38
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-05 10:16:07
 * @FilePath: \vue-element-admin\src\router\modules\proManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import Layout from '@/layout'

const manageRouter = {
  path: '/proManage',
  component: Layout,
  redirect: '/proManage/index',
  name: 'manage',
  meta: {
    title: '产品管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/proManage/index'),
      name: '产品资料',
      meta: { title: '产品资料' }
    },
    {
      path: 'firm',
      component: () => import('@/views/proManage/firm'),
      name: '商号资料',
      meta: { title: '商号资料' }
    },
    {
      path: 'category',
      component: () => import('@/views/proManage/category'),
      name: '品类资料',
      meta: { title: '品类资料' }
    },
    {
      path: 'field',
      component: () => import('@/views/proManage/field'),
      name: '字段',
      meta: { title: '品类资料' }
    },
  ]
}

export default manageRouter
