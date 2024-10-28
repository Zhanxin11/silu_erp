/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-07-15 09:00:06
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-07-15 15:24:53
 * @FilePath: \vue-element-admin\src\api\userDemo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/req'

export function LoginDemo(data) {
  const formData = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  // console.log(data)
  return request({
    url: 'silu/login/',
    method: 'post',
    data: formData,
  })
}
export function getInfoDemo(token) {
  return request({
    url: `/silu/get_user/`,
    method: 'get',
    params: {
      token
    }
  })
}
export function logoutDemo() {
  return request({
    url: '/silu/logout/',
    method: 'post'
  })
}

export function getuserListrApi() {
  return request({
    url: '/silu/opview/',
    method: 'post'
  })
}

