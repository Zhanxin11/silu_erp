

import Layout from '@/layout'

const mangerRouter = {
  path: '/proManage',
  component: Layout,
  redirect: '-1',
  name: 'Nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [

  ]
}

export default mangerRouter
