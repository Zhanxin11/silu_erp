<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-28 17:24:54
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
      :header-cell-style="tableHeaderColor" @select="selectFirm">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="site1" label="站点" :filters='siteFilterValue' :filter-method="siteFilter">
      </el-table-column>
      <el-table-column prop="name" label="商号">
      </el-table-column>
      <el-table-column prop="brands" label="品牌" :filters='brandFilterValue' :filter-method="brandFilter">
        <template slot-scope="scope">
          <el-tag type="info" style="margin-right: 5px;margin-top: 5px;" v-for="op in scope.row.brands"
            :key="op">{{op}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ops" label="运营">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px;margin-top: 5px;" v-for="op in scope.row.ops" :key="op">{{ op
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dp" label="部门" :filters='dpFilterValue' :filter-method="opFilter">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px;margin-top: 5px;" v-for="k in scope.row.dp" :key="k.dp">{{ k.dp
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="team" label="团队" :filters='teamFilterValue' :filter-method="teamFilter">
        <template slot-scope="scope">
          <span style="margin-right: 5px;margin-top: 5px;" v-for="op in scope.row.dp">
            <span v-for="i in op.children" :key="i.team">{{i.team}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="unit1" label="小组" :filters='unitFilterValue' :filter-method="unitFilter">
        <template slot-scope="scope">
          <span style="margin-right: 5px;margin-top: 5px;" v-for="item in scope.row.dp">
            <span v-for="i in item.children" :key="i.childen.unit"> {{i.childen.unit}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="团队状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.status)">{{ scope.row.status === true? '在售' : '解约' }}</el-tag>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增商号" :visible.sync="dialog" width="35%" :inline="true">
      <el-form :inline="true" label-width="80px" :model="firmFormValues" ref="firmFormValues" :rules="frimRules">
        <el-form-item prop="siteValue" label="站点">
          <el-select v-model="firmFormValues.siteValue" placeholder="请选择站点" filterable clearable>
            <el-option v-for="(item,index) in firmForm.site" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="nameValue" label="商号">
          <!-- <el-select v-model="firmFormValues.nameValue" placeholder="请选择商号" filterable>
            <el-option v-for="(item,index) in firmForm.name" :key="index" :label="item" :value="item">
            </el-option>
          </el-select> -->
          <el-input placeholder="请输入商号" v-model="firmFormValues.nameValue" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="brandValue" label="品牌">
          <el-select v-model="firmFormValues.brandValue" multiple placeholder="请选择品牌" filterable>
            <el-option v-for="(item,index) in firmForm.brand" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="opValue" label="运营" width="350px">
          <el-select v-model="firmFormValues.opValue" multiple placeholder="请选择运营(可多选)" filterable>
            <el-option v-for="(item,index) in firmForm.op" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="dp" label="部门">
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
        </el-form-item> -->
        <el-form-item prop="dpValue" label="团队">
          <el-cascader v-model="firmFormValues.dpValue" :options="teamValue" clearable></el-cascader>
        </el-form-item>
        <el-form-item prop="statusValue" label="商号状态">
          <el-select v-model="firmFormValues.statusValue" placeholder="请选择商号状态" filterable>
            <el-option v-for="(item,index) in firmForm.status" :key="index" :label="item ? '在售' : '解约'" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAddFirm('firmFormValues')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog-box" title="批量上传商号Excel" width="25%" :visible.sync="uploadFrimDialog">
      <el-upload class="upload-demo" ref="upload" action="#" :show-file-list="true" :before-upload="beforeUpload"
        :http-request="uploadHttpRequest" :file-list="fileList" :on-change="handleUploadChange" :limit="5" drag
        multiple>
        <div class="border">
          <i class="el-icon-plus icon-center"></i>
        </div>
        <div slot="tip" class="el-upload-tip upload-tips">只能上传.xlsx文件</div>
      </el-upload>
      <span slot="footer">
        <el-button @click="submitUpload" type="primary">上传</el-button>
        <el-button @click="uploadFrimDialog = false" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getFirmList, getFirmLine, getFirmSelectList, delFrimListApi, postAddFrimApi } from '@/api/manage'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        firmForm: [],
        FirmList: [],
        firmFormValues: {
          siteValue: '',
          brandValue: '',
          dpValue: '',
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
        uploadFrimDialog: false,
        uploadLoading: false,
        //上传的文件列表
        fileList: [],
        //控制弹出框显示与否
        uploadShowDialog: false,
        //上传地址
        uploadURL: '',
        //loading加载中
        downloadLoading: '',
        frimRules: {
          siteValue: [{ required: true, message: '请选择站点', trigger: 'blur' },
          ],
          nameValue: [{ required: true, message: '请输入商号，最后两位需与站点相同', trigger: 'blur' },
          ],
          brandValue: [{ required: true, message: '请选择品牌', trigger: 'blur' },
          ],
          opValue: [{ required: true, message: '请选择部门', trigger: 'blur' },
          ],
          dpValue: [{ required: true, message: '请选择团队', trigger: 'blur' },
          ],
          statusValue: [{ required: true, message: '请选择商号状态', trigger: 'blur' },
          ],
        },
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
        return this.firmForm.dp?.map((i) => ({
          text: i.dp, value: i.dp
        }))
      },
      brandFilterValue() {
        return this.firmForm.brand?.map((i) => ({
          text: i, value: i
        }))
      },
      teamFilterValue() {
        const team = []
        this.firmForm.dp?.map(i => {
          // console.log(i.childen[0].team)
          i.childen.map((item) => {
            team.push({ text: item.team, value: item.team })
            // console.log(item.team)
          })
        }
        )
        return team
      },
      unitFilterValue() {
        const unit = []
        this.firmForm.dp?.map(i => {
          i.childen.map((item) => {
            item.childen.map((k) => { unit.push({ text: k.unit, value: k.unit }) })
          })
        }
        )
        return unit
      },
      teamValue() {
        const dp = this.firmForm.dp
        return dp?.map(dpItem => ({
          value: dpItem.dp,
          label: dpItem.dp,
          children: dpItem.childen?.map(teamValue => (
            {
              value: teamValue.team,
              label: teamValue.team,
              children: teamValue.childen?.map(unitValue => ({
                value: unitValue.unit,
                label: unitValue.unit
              }))
            }
          ))
        }))
        // // 数据结构
        // return dp?.map(dpItem => ({
        //   value: dpItem,
        //   label: dpItem,
        //   children: team?.map(teamValue => (
        //     {
        //       value: teamValue,
        //       label: teamValue,
        //       children: units?.map(unitValue => ({
        //         value: unitValue,
        //         label: unitValue
        //       }))
        //     }
        //   ))
        // }))
      }
    },
    methods: {
      async initData() {
        this.tableData = await getFirmList()
      },
      async getFirmFrom() {
        this.firmForm = await getFirmSelectList()
        this.firmForm.status = [true, false]
        console.log(this.firmForm)
        // { site, dp, team, unit, brand } =  this.firmForm
      },
      // 新增接口
      async addFrimApi() {

      },
      // 保存新增商号
      saveAddFirm(formName) {
        console.log(this.firmFormValues, this.$refs[formName], 111)
        for (let key in this.firmFormValues) {
          if (Array.isArray(this.firmFormValues[key])) {
            // 如果是数组，则将其转换为字符串（这里使用逗号分隔）
            console.log(key)
            if (key=='dpValue') {

            }
            this.firmFormValues[key] = this.firmFormValues[key].join(", ")
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            postAddFrimApi(this.firmFormValues).then(response => {
              console.log('请求成功:', response)
              this.$message({
                message: "新增成功",
                type: 'success'
              })
              this.initData()
              // 处理响应数据...
            }).catch(error => {
              console.error('请求失败:', error)
              if (error.response) {
                console.error('状态码:', error.response.status)
              }
              this.initData()
              // 处理错误...
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      // 多选
      handleSelectionChange() { },
      // 控制tag颜色
      getTagType(status) {
        if (status === true) {
          return 'success' // 在售状态使用成功色
        } else {
          return 'danger' // 解约状态使用危险色
        }
      },
      // 打开添加页面
      addFirm() {
        this.dialog = true
        this.firmForm.status = [true, false]
        this.firmForm.name = ''
      },
      // 筛选站点
      siteFilter(value, row, column) {
        console.log(row, column, 'row')
        const property = column['property']

        return row[property] === value
      },
      opFilter(value, row, column) {
        // console.log(row, column, 'row')
        const property = column['property']
        // console.log(row[property].some(i => i.dp === value))
        return row[property].some(i => i.dp === value)
      },
      brandFilter(value, row, column) {
        console.log(row.brands.includes(value))
        return row.brands.includes(value)
      },
      teamFilter(value, row, column) {
        return row.dp.some(i => {
          console.log(i.dp, i.children, 'i.dp')
          if (i.children) {
            return i.children.some(item => item.team === value)
          }
        })
      },
      unitFilter(value, row, column) {
        return row.dp.some(i => {
          if (i.children) {
            console.log(i.children, 'i')
            i.children.some(item => {
              console.log(item.childen, 'item')
              if (item.childen) {
                return item.childen.some(k => k.unit === value)
              }
              return false
            })
          }
        })
      },
      // 获取删除商号
      selectFirm(selection, row) {
        console.log(selection)
        this.FirmList = selection.map(element =>
          element.name
        )

      },
      // 批量删除
      async delFirmList() {
        if (this.FirmList.length < 1) {
          console.log(this.FirmList, 'this.FirmList')
          return this.$message({
            message: "请选择删除行",
            type: 'warning'
          })
        } else {
          delFrimListApi(this.FirmList).then(response => {
            console.log('请求成功:', response)

            this.$message({
              message: "删除成功",
              type: 'success'
            })
            this.initData()
            // 处理响应数据...
          }).catch(error => {
            console.error('请求失败:', error)
            if (error.response) {
              console.error('状态码:', error.response.status)
            }
            this.initData()
            // 处理错误...
          })
        }
      },
      // 导入excel
      uploadFirmExcel() {
        this.uploadLoading = false
        this.fileList = []
        this.uploadFrimDialog = true
      },
      // 限制文件上传的个数只有一个，获取上传列表的最后一个
      handleUploadChange(file, fileList) {
        console.log(this.fileList)
        // if (fileList.length > 0) {
        //   // 这一步，是展示最后一次选择的文件
        //   this.fileList = [fileList[fileList.length - 1]]
        // }
        this.fileList = fileList
      },
      // 上传文件之前，判断文件后缀和大小
      beforeUpload(file) {
        //截取文件后缀名
        const fileName = file.name.substring(file.name.lastIndexOf('.'))
        if (
          fileName.toLowerCase() != '.xlsx'
        ) {
          this.$message.error('文件必须为.xlsx类型')
          this.fileList = []
          return false
        }
        //读取文件大小
        var fileSize = file.size
        console.log(fileSize)
        if (fileSize > 10485760) {
          this.uploadFrimDialog = false
          this.$message({
            type: 'error',
            showClose: true,
            duration: 3000,
            message: '文件不能大于10M!'
          })
          return false
        }
      },
      // 覆盖element的默认上传文件
      uploadHttpRequest(file) {
        this.file = file
      },
      //点击确定上传按钮
      submitUpload() {
        // loading加载中，通过this.downloadLoading.close()可关闭
        if (this.fileList.length === 0) {
          this.$message({
            type: 'error',
            showClose: true,
            duration: 3000,
            message: '请选择要上传的文件'
          })
          return false
        }
        //调接口上传
        let formData = new FormData()
        //控制台打印file，找到要上传的file，图中.raw
        console.log(this.file.file, 'file', this.file, this.file.raw, 'raw')
        formData.append('file', this.file.file)
        if (!!this.file.file) {
          this.downloadLoading = this.$loading({
            lock: true,
            text: '数据上传中...',
            color: '#1800FF',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
          //注：formData中的数据不能直接打印，需要用到get方法得到
          // batchuploadFile是接口
          batchuploadFile(formData).then(res => {
            this.uploadFrimDialog = false
            this.handleQuery()
          })
        } else {
          this.downloadLoading.close()
        }
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
  .upload-demo {
    text-align: center;

    .border {
      border: 1px dotted #c0acac;
      text-align: center;
      align-items: center;

      /* height: 100px; */
      .icon-center:before {
        line-height: 176px;
      }

      .el-icon-plus:before {
        /* line-height: 100px !important; */
        font-size: 30px;
        width: 30px;
      }
    }

    .upload-tips {
      position: inherit;
    }
  }
</style>
