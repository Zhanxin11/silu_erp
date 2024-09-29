<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-11 11:13:23
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
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange"
      header-cell-style="background:	#F5F5F5; color:#000000;">
      <el-table-column prop="site1" label="站点">
      </el-table-column>
      <el-table-column prop="name" label="商号">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px;margin-top: 5px;" v-for="op in changeOp(scope.row.ops)" :key="op">{{ op
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="brands" label="品牌">
      </el-table-column>
      <el-table-column prop="ops" label="运营">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px;margin-top: 5px;" v-for="op in changeOp(scope.row.ops)" :key="op">{{ op
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dp" label="部门">
      </el-table-column>
      <el-table-column prop="team" label="团队">
      </el-table-column>
      <el-table-column prop="unit1" label="小组">
      </el-table-column>
      <el-table-column prop="status" label="团队状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.status)">{{ scope.row.status === true? '在售' : '解约' }}</el-tag>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" :visible.sync="dialog" width="50%" :inline="true">
      <el-form :inline="true" label-width="80px" :model="proForm">
        <el-form-item prop="firm" label="商号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="brand" label="品牌">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="op" label="运营">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="categories" label="大类">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="proLine" label="产品线">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="minLine" label="细分品线">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="SPU" label="SPU">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="fASIN" label="父ASIN">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>
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

        },
        dialog: false,
      }
    },
    watch: {},
    computed: {
      chageOp() {

      }
    },
    methods: {
      async initData() {
        this.tableData = await getFirmList()
      },
      // 多选
      handleSelectionChange() { },
      // 处理op结构
      changeOp(ops) {
        return ops.slice(1, -1).split(',').map(op => {
          return op.trim().slice(1, -1)
        })
      },

      // 控制tag颜色
      getTagType(status) {
        if (status === true) {
          return 'success' // 在售状态使用成功色
        } else {
          return 'danger' // 解约状态使用危险色
        }
      },
      addFirm() {
        this.dialog = true
      },
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
