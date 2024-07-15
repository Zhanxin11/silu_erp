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

// 注意：不要在这里打印 getDemo() 的返回值，因为它是一个 Promise 对象
// console.log(getDemo()); // 这是不正确的，你会得到一个 Promise 对象而不是实际的数据
