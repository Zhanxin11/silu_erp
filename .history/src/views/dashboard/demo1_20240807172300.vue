<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-07 17:20:54
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>

      </el-row>
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="SKU" prop="sku_field" width="120">

        </el-table-column>
        
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getDemo1 } from '@/api/demo'
  export default {

    components: {},
    props: {},
    data() {
      return {
        tableData: []
      }
    },
    watch: {},
    computed: {
      getHeaders() {
        return this.busTableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
      },
      getValues() {
        return this.columnDataList.map(item => {
          return this.busTableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { 'title': item.label, })
        })
      }
    },
    methods: {
      async initData() {
        try {
          this.tableData = await getDemo1()
          console.log(this.tableData, 'cs')
        } catch (err) {
          console.log('获取用户分布信息失败', err)
        }
      },
    },
    created() {
      this.initData()

    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
