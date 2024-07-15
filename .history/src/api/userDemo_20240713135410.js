import request from '@/utils/req'
export function Login(data) {
  const formData = new FormData()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  return request({
    url: 'silu/login/',
    method: 'post',
    data
  })
}
// const demoData = {
//   username: 'test1',
//   password: 'silu1111'
// }
// Login(demoData).then(response => {
//   console.log('请求成功:', response)
//   console.log(demoData)
//   // 处理响应数据...
// }).catch(error => {
//   console.error('请求失败:', error)
//   console.log(formTable, 11)
//   // 处理错误...
// })

