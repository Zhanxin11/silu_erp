<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-22 09:18:13
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
      <el-table :data="tabelData" border :header-cell-style="tableHeaderColor">
        <el-table-column prop="name" label="用户名" align="center" fixed>
        </el-table-column>
        <el-table-column label="部门" align="center" fixed>
        </el-table-column>
        <el-table-column label="角色" align="center" fixed>
        </el-table-column>
        <el-table-column label="数据权限组" align="center" fixed>
        </el-table-column>
        <el-table-column label="登录名" align="center" fixed>
        </el-table-column>
        <el-table-column label="登录秘钥" align="center" fixed>
        </el-table-column>
        <el-table-column label="状态" align="center" fixed>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getUserListApi } from '@/api/userDemo'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tabelData: []
      }
    },
    watch: {},
    computed: {},
    methods: {
      async initOpData() {
        this.tabelData = await getUserListApi()
      },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      this.initOpData() },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
