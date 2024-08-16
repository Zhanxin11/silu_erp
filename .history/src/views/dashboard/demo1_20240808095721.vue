<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-08 09:50:25
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      </el-row>
      <el-table style="width: 100%; height: 100%; margin-top: 20px" border :data="tableData" id="table"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="op_field" label="运营"></el-table-column>
        <el-table-column prop="sku_field" label="SKU"></el-table-column>
        <el-table-column prop="store_field" label="店铺"></el-table-column>
        <el-table-column prop="2024-06-24" label="2024-06-24"></el-table-column>
        <el-table-column fixed="right" prop="edit" label="操作">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      {{token}}
    </div>
  </div>
</template>

<script>
  import { getDemo1 } from '@/api/demo'
  import { mapGetters } from 'vuex'
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
      async initData(token) {
        log
        try {
          this.tableData = await getDemo1(token)
          console.log(this.tableData, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },
      handleSelectionChange() { }
    },

    mounted() {
      this.initData(token)
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    }
  };
</script>
<style lang="scss" scoped>
</style>
