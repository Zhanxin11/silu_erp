/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-06-24 13:34:18
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-06-24 14:53:21
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
// async function fetchData() {
//   try {
//     const response = await getDemo()
//     console.log(response) // 这会打印出 HTTP 响应的数据
//   } catch (error) {
//     console.error('Error:', error) // 如果请求失败，这会打印出错误信息
//   }
// }
// console.log(fetchData(), 11);

