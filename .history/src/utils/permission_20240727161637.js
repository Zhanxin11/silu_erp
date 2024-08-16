/*
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-07-27 16:16:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-07-27 16:16:34
 * @FilePath: \vue-element-admin\src\utils\permission.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','op']"`)
    return false
  }
}
