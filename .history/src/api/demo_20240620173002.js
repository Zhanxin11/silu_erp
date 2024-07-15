import request from '@/utils/request'

export function getDemo() {
  return request({
    url: '/silu/spu/',
    method: 'get'
  })
}

// 调用 getDemo 函数并处理响应
getDemo().then(response => {
  console.log(response.data) // 假设 response.data 包含了你的数据
}).catch(error => {
  console.error('Error fetching data:', error)
})

