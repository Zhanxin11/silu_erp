/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-06 09:21:31
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-12 10:29:36
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
export function delFirLists(ids) {
  return request({
    url: '/silu/data/del/',
    method: 'post',
    params: {
      ids
    }
  })
}
