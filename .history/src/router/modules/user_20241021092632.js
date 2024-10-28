
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
      path: 'user',
      component: () => import('@/views/user/index'),
      name: '用户管理',
      meta: { title: '用户管理' }
    },
    {
      path: 'role',
      component: () => import('@/views/user/role'),
      name: '用户管理',
      meta: { title: '用户管理' }
    },
  ]
}
export default userRouter
