<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-23 17:45:24
 * @FilePath: \vue-element-admin\src\views\proManage\proInformantion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="info" @click="addSpu">新增品类</el-button>
      <el-button type="danger" @click="delSpuList">删除品类</el-button>
      <el-button type="primary" @click="downloadFirmToExcel">下载</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="category" label="大类">
      </el-table-column>
      <el-table-column prop="category1" label="产品线">
      </el-table-column>
      <el-table-column prop="category2" label="细分品线">
      </el-table-column>
      <el-table-column prop="name" label="SPU">
      </el-table-column>
    </el-table>
    <el-dialog class="dialog-box" title="新增品类" width="25%" :visible.sync="spuDialog">

      <span slot="footer">
        <el-button @click="saveSpu" type="primary">确认</el-button>
        <el-button @click="spuDialog = false" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getCatListApi, getCatSelectApi } from '@/api/manage'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        catSelectForm: {},
        spuDialog: false,
      }
    },
    watch: {},
    computed: {},
    methods: {
      async initData() {
        this.tableData = await getCatListApi()
        this.catSelectForm = await getCatSelectApi()
      },
      addSpu() { },
      delSpuList() { },
      saveSpu() { },
    },
    created() {
      this.initData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>