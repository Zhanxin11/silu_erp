import request from '@/utils/request'

export function getDemo() {
  return request({
    url: '/silu/spu/',
    method: 'get'
  })
}

getDemo().then(response => {
  console.log(response.data)
}).catch(error => {
  console.error('Error fetching data:', error)
})

