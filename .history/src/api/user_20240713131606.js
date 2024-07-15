/*
 * @Author: DESKTOP-8QHKAV9\zhanxin 749959696@qq.com
 * @Date: 2024-04-01 16:11:50
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-07-13 13:08:25
 * @FilePath: \vue-element-admin\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'silu/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

const formData = {
  username: 'test1',
  password: 'silu1111'
}
