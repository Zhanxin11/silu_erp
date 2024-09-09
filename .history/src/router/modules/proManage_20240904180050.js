

import Layout from '@/layout'

const manageRouter = {
  path: '/proManage',
  component: Layout,
  redirect: '/proManage/proInformation',
  name: '产品管理',
  meta: {
    title: '产品管理',
    icon: 'nested'
  },
  children: [
    {
      path: '/proManage/proInformation',
      component: Layout,
      name: '产品资料',
      meta: {
        title: '产品管理',
        icon: 'nested'
      },
    }
  ]
}

export default manageRouter
