/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:16:38
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-05 09:40:27
 * @FilePath: \vue-element-admin\src\router\modules\proManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import Layout from '@/layout'

const manageRouter = {
  path: '/proMange',
  component: Layout,
  redirect: '/table/index',
  name: 'manage',
  meta: {
    title: '产品管理',
    icon: 'nested'
  },
  children: [

  ]
}

export default manageRouter
