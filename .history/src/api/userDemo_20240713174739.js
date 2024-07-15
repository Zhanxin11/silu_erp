import request from '@/utils/req'

export function LoginDemo(data) {
  const formData = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  // console.log(data)
  return request({
    url: 'silu/login/',
    method: 'post',
    data: formData,
  })
}
export function getInfo(token) {
  return request({
    url: '/silu/get_user/:token?',
    method: 'get',
    // params: { token }
  })
}
// const demoData = {
//   username: 'test1',
//   password: 'silu1111'
// }
LoginDemo(demoData).then(response => {
  console.log('请求成功:', response)
  console.log(demoData)
  // 处理响应数据...
}).catch(error => {
  console.error('请求失败:', error)
  console.log(formTable, 11)
  // 处理错误...
})

