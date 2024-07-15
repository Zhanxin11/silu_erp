/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-06-24 13:34:18
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-06-26 10:35:57
 * @FilePath: \vue-element-admin\src\api\demo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/req'
import axios from 'axios'
export function getDemo() {
  return request({
    url: '/silu/spu/',
    method: 'get'
  })
}
export function CreateDemo(data) {
  return request({
    url: '/silu/spu/create/',
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        console.log(it)
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      console.log(ret)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
function objectToQueryString(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&")
}

const queryString = objectToQueryString(demoData)
const finalUrl = `${url}&${queryString}`
console.log();
const demoData = {
  "SPU": "a54ll11",
  "sku计数": 232,
  "开始时间": "2012-08-09",
  "结束时间": "1201-12-08",
  "销量": 3399
}


CreateDemo(demoData).then(response => {
  console.log('请求成功:', response)
  console.log(formTable)
  // 处理响应数据...
}).catch(error => {
  console.error('请求失败:', error)
  console.log(formTable, 11)
  // 处理错误...
})
