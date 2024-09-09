<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="danger" @click="delProList">批量删除</el-button>
      <el-button type="primary" @click="uploadExcel">批量上传</el-button>
      <el-button type="primary" v-if="!isCheck" @click="changeProList">批量编辑</el-button>
      <el-button type="primary" v-else @click="clearIscheck">取消编辑</el-button>
      <el-button type="primary" @click="saveChange">保存编辑</el-button>
      <el-button type="primary" @click="downloadExcel">下载</el-button>
      <el-button type="info" @click="addList">新增</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="图片" width="150">
      </el-table-column>
      <el-table-column prop="name" label="商号" width="120" filter="table.firm">
      </el-table-column>
      <el-table-column prop="province" label="品牌" width="120">
      </el-table-column>
      <el-table-column prop="city" label="运营" width="120">
      </el-table-column>
      <el-table-column prop="address" label="大类" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="产品线" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="细分品线" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="SPU" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="父ASIN" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="子ASIN" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="SKU" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="产品描述" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="开售日期" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="产品状态" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
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
    methods: {
      // 删除
      delProList() { },
      // 批量修改
      changeProList() { },
      
    },
    created() { },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
