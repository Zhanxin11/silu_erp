/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-07-13 15:47:11
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-07-13 15:47:11
 * @FilePath: \vue-element-admin\src\utils\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  console.log()
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
