
import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/table/index'),
      name: 'table',
      meta: { title: 'table' }
    },
  ]
}
export default userRouter
