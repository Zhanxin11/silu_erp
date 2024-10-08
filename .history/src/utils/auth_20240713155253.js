
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // console.log(TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
