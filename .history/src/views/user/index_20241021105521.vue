<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>

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
  export default {
    components: {},
    props: {},
    data() {
      return {
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() { },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
