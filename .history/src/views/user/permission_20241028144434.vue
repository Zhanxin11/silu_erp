<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-28 14:44:16
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
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span style="color: #000000;font-weight: 700;">权限数据列表</span>

            </div>
            <div>
              <el-table :data="tableData" :header-cell-style="perTableHeaderColor">
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
            </div>
          </el-card>

        </el-col>
        <el-col :span="7">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>菜单分配</span>
              <el-button type="success" icon="el-icon-check" style="float: right; padding: 3px 0" type="text"
                circle></el-button>
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
      perTableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return ' color:#999;'
      },
    },
    created() {
      this.initOpData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
  .box-card {
    margin-left: 30px;
  }
</style>