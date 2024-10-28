
import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: {
    title: 'User',
    icon: 'table'
  },
  children: [

  ]
}
export default userRouter
