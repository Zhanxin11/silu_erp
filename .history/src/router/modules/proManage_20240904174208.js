

import Layout from '@/layout'

const manageRouter = {
  path: '/proManage',
  component: Layout,
  redirect: '/proManage/',
  name: '产品管理',
  meta: {
    title: '产品管理',
    icon: 'nested'
  },
  children: [

  ]
}

export default manageRouter
