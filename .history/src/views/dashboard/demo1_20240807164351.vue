<!--
 * @Author: DESKTOP-8QHKAV9\zhanxin 749959696@qq.com
 * @Date: 2024-03-19 15:14:33
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-07 16:40:16
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\editor\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dashboard-editor-container">
    <template>
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import { getDemo1 } from '@/api/demo'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted()
    methods: {
      async initData() {
        try {
          this.tableData = await getDemo()
          // 动态获取form
          this.formData = await Object.keys(this.tableData[0]).reduce((newObj, key) => {
            newObj[key] = '' // 设置新对象的每个键的值为null
            return newObj
          }, {})
          // console.log(this.tableData, this.formData, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },
    },
    computed: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
