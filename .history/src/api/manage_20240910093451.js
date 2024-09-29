import request from '@/utils/req'

export function getDemo() {
  return request({
    url: '/silu/spu/',
    method: 'get'
  })
}
