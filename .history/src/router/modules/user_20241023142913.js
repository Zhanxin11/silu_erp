
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
      name: '部门管理',
      meta: { title: '角色管理' }
    },
    {
      path: 'permission',
      component: () => import('@/views/user/permission'),
      name: '权限管理',
      meta: { title: '权限管理' }
    },
  ]
}
export default userRouter
