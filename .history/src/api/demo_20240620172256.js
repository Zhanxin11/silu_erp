import request from '@/utils/request'

export function getDemo() {
  return request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
