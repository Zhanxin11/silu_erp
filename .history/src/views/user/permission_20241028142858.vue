<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-28 14:28:26
 * @FilePath: \vue-element-admin\src\views\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button>新增</el-button>
        <el-button>删除</el-button>
      </el-row>
      <el-row>
        <el-col :span="17">
          <el-table :data="tableData" :header-cell-style="tableHeaderColor">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="数据权限组" align="center" fixed>
            </el-table-column>
            <el-table-column label="权限组用户" align="center" fixed>
            </el-table-column>
            <el-table-column label="权限组状态" align="center" fixed>
            </el-table-column>
            <el-table-column label="权限描述" align="center" fixed>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" fixed>
            </el-table-column>
            <el-table-column prop="edit" label="操作" align="center" fixed>
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="change(scope.$index,scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="7" padding="lef">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>菜单分配</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import { getOpListApi, createOpApi, changeOpApi } from '@/api/userDemo'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: []
      }
    },
    watch: {},
    computed: {},
    methods: {
      async initOpData() {
        this.tableData = await getOpListApi()
      },
      change() { },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      this.initOpData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
