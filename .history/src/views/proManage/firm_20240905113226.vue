<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-05 11:31:50
 * @FilePath: \vue-element-admin\src\views\proManage\proInformantion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="站点" width="150">
      </el-table-column>
      <el-table-column fixed prop="date" label="商号" width="150">
      </el-table-column>
      <el-table-column fixed prop="date" label="品牌" width="150">
      </el-table-column>
      <el-table-column fixed prop="date" label="运营" width="150">
      </el-table-column>
      <el-table-column fixed prop="date" label="部门" width="150">
      </el-table-column>
      <el-table-column fixed prop="date" label="站点" width="150">
      </el-table-column>
      <el-table-column fixed prop="date" label="站点" width="150">
      </el-table-column>
      <el-table-column fixed prop="date" label="站点" width="150">
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
