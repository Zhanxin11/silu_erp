
import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [

  ]
}
export default userRouter
