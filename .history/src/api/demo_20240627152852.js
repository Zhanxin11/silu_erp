/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-06-24 13:34:18
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-06-27 15:21:42
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
export function changeDemo(id, data) {
  const formData = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  return request({
    url: `silu/spu/update/{}` / '.format(id),
    method: 'put',
    data: formData
  })
}
export function CreateDemo(data) {
  const formData = new FormData()
  // 遍历 data 对象并添加到 FormData 中
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  return request({
    url: '/silu/spu/create',
    method: 'post',
    data: formData,
  })
}

// const demoData = {
//   "SPU": "a54ll11",
//   "sku计数": 232,
//   "开始时间": "2012-08-09",
//   "结束时间": "1201-12-08",
//   "销量": 3
// }

// CreateDemo(demoData).then(response => {
//   console.log('请求成功:', response)
//   console.log(formTable)
//   // 处理响应数据...
// }).catch(error => {
//   console.error('请求失败:', error)
//   console.log(formTable, 11)
//   // 处理错误...
// })
