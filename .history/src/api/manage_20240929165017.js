/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-06 09:21:31
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-29 13:47:01
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
  for (let i = 0; i < data.length; i++) {
    delFrim.append(i, data[i]) // 将索引转换为字符串，因为FormData的键是字符串
  }
  console.log(delFrim, 'delFrim')
  return request({
    url: '/silu/storeview/0/',
    method: 'delete',
    data: delFrim
  })
}
// 添加商号
export function postAddFrimApi(data) {
  console.log(data, 1)
  const addFrim = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      addFrim.append(key, data[key])
    }
  }
  return request({
    url: '/silu/storeview/',
    method: 'post',
    data: addFrim
  })
}

export function putChangeFrimApi(data) {
  console.log(data, 'data')
  const frim = new FormData()
  for (let key in data) {
    console.log(key)
    if (data.hasOwnProperty(key)) {
      addFrim.append(key, data[key])
    }
  }
  console.log(frim, 'frim')
  return request({
    url: `/silu/storeview/${data.id}`,
    method: 'put',
    data: frim
  })
}
