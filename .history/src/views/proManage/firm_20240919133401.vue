<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-19 13:33:43
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
      <el-table-column prop="site1" label="站点" :filters='siteFilterValue' :filter-method="siteFilter">
      </el-table-column>
      <el-table-column prop="name" label="商号">
      </el-table-column>
      <el-table-column prop="brands" label="品牌" :filters='brandFilterValue' :filter-method="brandFilter">
        <template slot-scope="scope">
          <el-tag type="info" style="margin-right: 5px;margin-top: 5px;" v-for="op in scope.row.brands" :key="op">{{
            op}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ops" label="运营">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px;margin-top: 5px;" v-for="op in scope.row.ops" :key="op">{{ op
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dp" label="部门" :filters='dpFilterValue' :filter-method="opFilter">
      </el-table-column>
      <el-table-column prop="team" label="团队" :filters='teamFilterValue' :filter-method="teamFilter">
      </el-table-column>
      <el-table-column prop="unit1" label="小组" :filters='unitFilterValue' :filter-method="unitFilter">
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
          <el-select v-model="firmFormValues.siteValue" placeholder="请选择站点" filterable>
            <el-option v-for="(item,index) in firmForm.site" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="商号">
          <el-select v-model="firmFormValues.nameValue" placeholder="请选择商号" filterable>
            <el-option v-for="(item,index) in firmForm.name" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="brand" label="品牌">
          <el-select v-model="firmFormValues.brandValue" placeholder="请选择品牌" filterable>
            <el-option v-for="(item,index) in firmForm.brand" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="ops" label="运营">
          <el-select v-model="firmFormValues.opValue" placeholder="请选择运营" filterable>
            <el-option v-for="(item,index) in firmForm.name" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dp" label="部门">
          <el-select v-model="firmFormValues.dpValue" placeholder="请选择部门" filterable>
            <el-option v-for="(item,index) in firmForm.dp" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="team" label="团队">
          <el-select v-model="firmFormValues.teamValue" placeholder="请选择团队" filterable>
            <el-option v-for="(item,index) in firmForm.team" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="unit" label="小组">
          <el-select v-model="firmFormValues.unitValue" placeholder="请选择小组" filterable>
            <el-option v-for="(item,index) in firmForm.unit" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="团队状态">
          <el-select v-model="firmFormValues.nameValue" placeholder="请选择团队状态" filterable>
            <el-option v-for="(item,index) in firmForm.name" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog-box" title="批量上传" width="25%" :visible.sync="uploadShowDialog">
      <el-upload class="upload-demo" ref="upload" action="#" :show-file-list="true" :before-upload="beforeUpload"
        :http-request="uploadHttpRequest" :file-list="fileList" :on-change="handleUploadChange" :limit="5" drag
        multiple>
        <div class="border">
          <i class="el-icon-plus icon-center"></i>
        </div>
        <div slot="tip" class="el-upload-tip upload-tips">只能上传.xlsx文件</div>
      </el-upload>
      <span slot="footer">
        <el-button @click="submitUpload" type="primary"> 上传 </el-button>
        <el-button @click="uploadShowDialog = false" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getFirmList, getFirmLine, getFirmSelectList } from '@/api/manage'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        firmForm: [],
        firmFormValues: {
          siteValue: '',
          teamValue: '',
          brandValue: '',
          dpValue: '',
          unitValue: '',
          nameValue: '',
          statusValue: '',
          opValue: '',
        },

        op: '',
        dp: '',
        team: '',
        unit: '',
        statu: '',
        dialog: false,
        uploadShowDialog
      }
    },
    watch: {},
    computed: {
      siteFilterValue() {
        return this.firmForm?.site?.map((i) => ({
          text: i, value: i
        }))
      },
      dpFilterValue() {
        return this.firmForm?.dp?.map((i) => ({
          text: i, value: i
        }))
      },
      brandFilterValue() {
        return this.firmForm.brand?.map((i) => ({
          text: i, value: i
        }))
      },
      teamFilterValue() {
        return this.firmForm.team?.map((i) => ({
          text: i, value: i
        }))
      },
      unitFilterValue() {
        return this.firmForm.unit?.map((i) => ({
          text: i, value: i
        }))
      },
    },
    methods: {
      async initData() {
        this.tableData = await getFirmList()
      },
      async getFirmFrom() {
        this.firmForm = await getFirmSelectList()
        // { site, dp, team, unit, brand } =  this.firmForm
      },
      // 多选
      handleSelectionChange() { },
      // 处理op结构
      // changeOp(ops) {
      //   return ops.slice(1, -1).split(',').map(op => {
      //     return op.trim().slice(1, -1)
      //   })
      // },

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
      // 筛选站点
      siteFilter(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      opFilter(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      brandFilter(value, row, column) {
        return row.brands.includes(value)
      },
      teamFilter(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      unitFilter(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      delFirmList() { },
      uploadFirmExcel() {

      },
      saveFirm() { },
      downloadFirmToExcel() { },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      }
    },
    created() {
      this.initData(),
        this.getFirmFrom()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
