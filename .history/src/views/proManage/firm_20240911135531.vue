<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-11 13:46:29
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
      :header-cell-style="tableHeaderColor">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="site1" label="站点">
      </el-table-column>
      <el-table-column prop="name" label="商号">
      </el-table-column>
      <el-table-column prop="brands" label="品牌">
        <template slot-scope="scope">
          <el-tag type="info" style="margin-right: 5px;margin-top: 5px;" v-for="op in changeOp(scope.row.brands)"
            :key="op">{{ op
            }}</el-tag>
        </template>
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
    <el-dialog title="新增商号" :visible.sync="dialog" width="35%" :inline="true">
      <el-form :inline="true" label-width="80px" :model="firmForm">
        <el-form-item prop="site" label="站点">
          <el-select v-model="siteValue" placeholder="请选择站点" filterable>
            <el-option v-for="(item,index) in firmForm.site" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="店铺">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="brand" label="品牌">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="ops" label="运营">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="dp" label="部门">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="team" label="团队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="unit1" label="小组">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="status" label="团队状态">
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
        tableData: [],
        firmForm: {
          site: [
            'US', 'CA', 'MX', 'UK', 'FR', 'DE', 'IT', 'JP'
          ],
          name:[]


        },
        siteValue: '',
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
      downloadFirmToExcel() { },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      }
    },
    created() {
      this.initData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
