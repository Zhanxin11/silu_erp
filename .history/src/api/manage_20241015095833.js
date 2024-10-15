/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-06 09:21:31
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-14 15:41:16
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
// 修改
export function putChangeFrimApi(data) {
  console.log(data, 'data')
  const frim = new FormData()
  for (let key in data) {
    console.log(key, 1)
    if (data.hasOwnProperty(key) && key != 'id') {
      console.log(data[key], 2)
      frim.append(key, data[key])
    }
  }
  console.log(frim, 'frim')
  return request({
    url: `/silu/storeview/${data.id}/`,
    method: 'put',
    data: frim
  })
}

// 产品资料
export function getProductList() {
  return request({
    url: '/silu/skuview/',
    method: 'get'
  })
}
// 产品资料下拉
export function getProSelectList() {
  return request({
    url: '/silu/skuview/get_dropdown/',
    method: 'get'
  })
}
// 单个or批量新增产品
export function postAddProApi(data) {
  console.log(data)
  const addPro = new FormData()
  for (let key in data) {
    console.log(key, data[key])
    // if (data.hasOwnProperty(key) && key == 'bulk_create') {
    //   console.log('bulk_create')
    //   addPro.append(key, data[key])
    // }
    if (data.hasOwnProperty(key)) {
      addPro.append(key, data[key])
    }
  }
  return request({
    url: '/silu/skuview/',
    method: 'post',
    data: addPro
  })
}
// 批量删除frim
export function delProListApi(data) {
  console.log(data, 'data')
  const delPro = new FormData()
  for (let i = 0; i < data.length; i++) {

    delPro.append(i, data[i]) // 将索引转换为字符串，因为FormData的键是字符串
  }
  console.log(delPro, 'delPro')
  return request({
    url: '/silu/skuview/0/',
    method: 'delete',
    data: delPro
  })
}
// 修改
export function putChangeProApi(data) {
  console.log(data, 'data')
  const pro = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key) && key != 'id') {
      console.log(data[key], 2)
      pro.append(key, data[key])
    }

  }
  console.log(pro, 'pro')
  return request({
    url: `/silu/skuview/${data.id}/`,
    method: 'put',
    data: pro
  })
}

