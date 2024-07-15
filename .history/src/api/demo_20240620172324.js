import request from '@/utils/request'

export function getDemo() {
  return request({
    url: '/silu/spu/', // 假地址 自行替换
    method: 'get'
  })
}
getDemo()
console.log(getDemo())
