<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button>新增</el-button>
        <el-button>删除</el-button>
      </el-row>
      <el-table border :header-cell-style="tableHeaderColor">
        <el-table-column label="用户名" align="center" fixed>
        </el-table-column>
        <el-table-column label="姓名" align="center" fixed>
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
      saync initOpData() {
        this.tabelData = await getUserListApi()
      },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() { rhis. },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
