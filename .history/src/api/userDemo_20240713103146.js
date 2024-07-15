import request from '@/utils/req'
export function changeDemo(data) {
  const formData = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  return request({
    url: `silu/login/`,
    method: 'put',
    data: formData
  })
}
