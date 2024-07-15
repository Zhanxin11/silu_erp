import request from '@/utils/req'
export function Login(data) {
  // const formData = new FormData()
  // for (let key in data) {
  //   if (data.hasOwnProperty(key)) {
  //     formData.append(key, data[key])
  //   }
  // }
  return request({
    url: `silu/login/`,
    method: 'post',
    data
  })
}
/   "SPU": "a54ll11",
//   "sku计数": 232,
//   "开始时间": "2012-08-09",
//   "结束时间": "1201-12-08",
//   "销量": 3
// }
Login(data).then(response => {
  console.log('请求成功:', response)
  console.log(formTable)
  // 处理响应数据...
}).catch(error => {
  console.error('请求失败:', error)
  console.log(formTable, 11)
  // 处理错误...
})

