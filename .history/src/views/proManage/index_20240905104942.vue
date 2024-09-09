!<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="图片"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="品牌"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="运营"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
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
