/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-07-24 17:49:10
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-07-24 17:49:10
 * @FilePath: \vue-element-admin\src\api\table.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function getUser() {
  return request({
    url: '/login',
    method: 'get'
  })
}

const a = getUser()
