/*
 * @Author: DESKTOP-8QHKAV9\zhanxin 749959696@qq.com
 * @Date: 2024-04-09 13:30:31
 * @LastEditors: DESKTOP-8QHKAV9\zhanxin 749959696@qq.com
 * @LastEditTime: 2024-04-09 13:30:31
 * @FilePath: \vue-element-admin\src\utils\get-page-title.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'SiLu Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
