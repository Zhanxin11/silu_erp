
import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: {
    title: 'User',
    icon: 'user'
  },
  children: [

  ]
}
export default userRouter
