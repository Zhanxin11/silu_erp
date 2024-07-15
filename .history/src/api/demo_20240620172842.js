import request from '@/utils/request'

export function getDemo() {
  return request({
    url: '/silu/spu/',
    method: 'get'
  })
}
getDemo()
console.log(getDemo())
