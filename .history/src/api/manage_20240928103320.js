/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-06 09:21:31
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-28 10:33:05
 * @FilePath: \vue-element-admin\src\api\manage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/req'

export function getFirmList() {
  return request({
    url: '/silu/storeview/',
    method: 'get'
  })
}
export function getFirmSelectList() {
  return request({
    url: '/silu/storeview/get_dropdown/',
    method: 'get'
  })
}
export function getFirmLine(id) {
  return request({
    url: '/silu/storeview/',
    method: 'get',
    params: {
      id
    }
  })
}

// 批量删除frim
export function delFrimListApi(data) {
  console.log(data, 'data')
  const delFrim = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      console.log(data[key])
      delFrim.append(key, data[key])
    }
  }
  // console.log(delFrim, 'delFrim')
  return request({
    url: '/silu/storeview/0/',
    method: 'delete',
    data：
  })
}
