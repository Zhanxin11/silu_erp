import request from '@/utils/request'

export function getDemo() {
  return request({
    url: '/silu/spu/',
    method: 'get'
  })
}

getDemo().then(response => {
  console.log(response.data) // 假设 response.data 包含了你的数据
}).catch(error => {
  console.error('Error fetching data:', error)
})

