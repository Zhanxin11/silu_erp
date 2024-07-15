/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-06-24 13:34:18
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-06-25 15:22:08
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
export function CreateDemo(data) {
  // 辅助函数，将对象转换为 x-www-form-urlencoded 格式
  function param(obj) {
    let params = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      }
    }
    return params.join('&')
  }

  return request({
    url: '/silu/spu/create/',
    method: 'post',
    data: param(data), // 直接传递转换后的字符串
    // 如果你使用的 request 函数不需要 transformRequest，则删除它
    // transformRequest: [function (data) {
    //   return data; // 在这种情况下，你不需要转换，因为已经转换过了
    // }],
    headers: {
      // 大多数 HTTP 客户端库会自动设置这个头，但如果你需要，可以显式设置
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const demoData = {
  "SPU": "a54ll",
  "sku计数": 232,
  "开始时间": "2012-08-09",
  "结束时间": "1201-12-08",
  "销量": 3399
}

CreateDemo(demoData).then(response => {
  console.log('请求成功:', response)
  // 处理响应数据...
}).catch(error => {
  console.error('请求失败:', error)
  // 处理错误...
})
