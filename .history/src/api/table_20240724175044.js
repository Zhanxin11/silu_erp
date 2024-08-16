
import request from '@/utils/request'

export function getUser() {
  return request({
    url: '/login',
    method: 'get'
  })
}

const a = getUser()
