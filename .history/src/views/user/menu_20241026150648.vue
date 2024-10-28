<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-26 15:05:48
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
      <el-table :data="tableData" border :header-cell-style="tableHeaderColor">
        <el-table-column prop="name" label="菜单标题" align="center" fixed>
        </el-table-column>
        <el-table-column label="图标" align="center" fixed>
        </el-table-column>
        <el-table-column label="排序" align="center" fixed>
        </el-table-column>
        <el-table-column label="权限标识" align="center" fixed>
        </el-table-column>
        <el-table-column prop="q" label="状态" align="center" fixed>
        </el-table-column>
      </el-table>
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