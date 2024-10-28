
import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/table/index',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    
  ]
}
export default userRouter
