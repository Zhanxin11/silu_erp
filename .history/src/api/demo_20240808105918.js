/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-06-24 13:34:18
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-08 10:59:10
 * @FilePath: \vue-element-admin\src\api\demo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/req'
export function getDemo() {
  return request({
    url: '/silu/spu/',
    method: 'get'
  })
}
// 获取测试数据
export function getDemo1(token) {
  console.log(token, 111)
  return request({
    url: '/silu/data/',
    method: 'get',
    params: {
      token
    }
  })
}
// 批量删除
export function delLists(arr) {
  console.log(arr, 111)
  return request({
    url: '/silu/data/',
    method: 'post',
    params: {
      arr
    }
  })
}
export function changeDemo(id, data) {
  const formData = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  return request({
    url: `silu/spu/create/${id}`,
    method: 'put',
    data: formData
  })
}
export function CreateDemo(data) {
  const createData = new FormData()
  // 遍历 data 对象并添加到 FormData 中
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      createData.append(key, data[key])
    }
  }
  return request({
    url: '/silu/spu/create',
    method: 'post',
    data: createData,
  })
}
export function DeleteDemoList(id) {
  return request({
    url: `/silu/spu/del/${id} `,
    method: 'delete',
  })
}


