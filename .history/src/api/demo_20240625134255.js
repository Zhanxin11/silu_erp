/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-06-24 13:34:18
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-06-25 10:59:13
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
  return request({
    url: '/silu/spu/create/',
    method: 'post',
    data
  })
}

const demoData={
  
}
CreateDemo(demoData).then(response => {
  console.log('请求成功:', response)
  // 处理响应数据...
}).catch(error => {
  console.error('请求失败:', error)
  // 处理错误...
})
