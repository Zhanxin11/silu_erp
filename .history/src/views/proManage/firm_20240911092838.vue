<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-11 09:28:38
 * @FilePath: \vue-element-admin\src\views\proManage\proInformantion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="info" @click="addFirm">新增商号</el-button>
      <el-button type="danger" @click="delFirmList">删除商号</el-button>
      <el-button type="primary" @click="uploadFirmExcel">导入商号</el-button>
      <el-button type="primary" @click="saveFirm">保存导入</el-button>
      <el-button type="primary" @click="downloadFirmToExcel">导出</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="站点">
      </el-table-column>
      <el-table-column prop="site" label="商号">
      </el-table-column>
      <el-table-column prop="name" label="品牌">
      </el-table-column>
      <el-table-column prop="op" label="运营">
      </el-table-column>
      <el-table-column prop="dp" label="部门">
      </el-table-column>
      <el-table-column prop="team" label="团队">
      </el-table-column>
      <el-table-column prop="unit" label="小组">
      </el-table-column>
      <el-table-column prop="status" label="团队状态">
        <template slot-scope="scope">
          {{ scope.row.status === ? '活跃' : '非活跃' }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getFirmList, getFirmLine } from '@/api/manage'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [

        ],
        firmForm: {

        }
      }
    },
    watch: {},
    computed: {},
    methods: {
      async initData() {
        this.tableData = await getFirmList()
      },
      addFirm() { },
      delFirmList() { },
      uploadFirmExcel() { },
      saveFirm() { },
      downloadFirmToExcel() { }
    },
    created() {
      this.initData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>