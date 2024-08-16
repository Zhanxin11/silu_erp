<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-07 17:25:12
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
    </el-row>
    <el-table style="width: 100%; height: 100%; margin-top: 20px" border :data="tableData" id="table">
      <el-table-column prop="SPU" label="SPU" sortable></el-table-column>
      <el-table-column prop="sku计数" label="sku计数"></el-table-column>
      <el-table-column prop="开始时间" label="开始时间"></el-table-column>
      <el-table-column prop="结束时间" label="结束时间"></el-table-column>
      <el-table-column prop="销量" label="销量"></el-table-column>
      <el-table-column fixed="right" prop="edit" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
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
