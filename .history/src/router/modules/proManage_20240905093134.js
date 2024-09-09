/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:16:38
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-05 09:31:13
 * @FilePath: \vue-element-admin\src\router\modules\proManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import Layout from '@/layout'

const manageRouter = {
  path: '/proManage',
  component: Layout,
  redirect: '/proManage/index',
  name: '产品管理',
  meta: {
    title: '产品管理',
    icon: 'nested'
  },
  // children: [
  //   {
  //     path: '/proManage/proInformation',
  //     name: '产品资料',
  //     meta: {
  //       title: '产品资料',
  //       icon: 'nested'
  //     },
  //   }
  // ]
}

export default manageRouter
