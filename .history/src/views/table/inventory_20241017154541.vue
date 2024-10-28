<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 18:01:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-17 15:42:32
 * @FilePath: \vue-element-admin\src\views\proManage\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="danger" @click="delProList">批量删除</el-button>
      <el-button type="primary" @click="uploadExcel">文件上传</el-button>
      <!-- <el-button type="primary" v-if="!isCheck" @click="changeProList">批量编辑</el-button>
      <el-button type="primary" v-else @click="clearIscheck">取消编辑</el-button> -->
      <!-- <el-button type="primary" @click="saveChange">保存编辑</el-button> -->
      <el-button type="primary" @click="downloadExcelEG">下载上传模板示例</el-button>
      <el-button type="primary" @click="downloadExcel">下载</el-button>
      <el-button type="info" @click="addpro">新增</el-button>

    </el-row>
    <!-- <el-table :data=" tableData" id="table_out" ref="table" border style="width: 100%"
      :header-cell-style="tableHeaderColor" @select="selectPro" v-loading="loadingPro" show-summary
      :summary-method="proSum" @filter-change="proFilterChange()"> -->
    <el-table ref="table" :data=" tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" id="table_out"
      border style="width: 100%" :header-cell-style="tableHeaderColor" @select="selectPro" v-loading="loadingPro"
      @filter-change="proFilterChange">
      <el-table-column type="selection" width="50" align="center">
      </el-table-column>
      <el-table-column label="图片" prop='pic_pre' align="center" width="120">
        <template slot-scope="scope">
          <div style="height: 100px; display: flex;justify-content: center; ">
            <el-image :src="'http://192.168.5.174:8000' +scope.row.pic_pre" fit="fill"
              :preview-src-list="scope.row.pic_field"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop='store' label="商号" filter="firm" width="100" :filters='storeFilterValue'
        :filter-method="filterStore">
      </el-table-column>
      <el-table-column prop='brand' label="品牌" width="100" :filters='brandFilterValue' :filter-method="filterStore">
      </el-table-column>
      <el-table-column prop='op' label="运营" width="80" :filters='opFilterValue' :filter-method="filterStore">
      </el-table-column>
      <el-table-column prop='category' label="大类" width="100" :filters='catFilterValue' :filter-method="filterStore">
      </el-table-column>
      <el-table-column prop='category1' label="产品线" :filters='cat1FilterValue' :filter-method="filterStore">
      </el-table-column>
      <el-table-column prop='category2' label="细分品线" width="100" :filters='cat2FilterValue'
        :filter-method="filterStore">
      </el-table-column>
      <el-table-column prop='spu' label="SPU" width="120" :filters='spuFilterValue' :filter-method="filterStore">
      </el-table-column>
      <el-table-column prop='fasin' label="父ASIN" width='120'>
      </el-table-column>
      <el-table-column prop='asin' label="子ASIN" width='120'>
      </el-table-column>
      <el-table-column prop='sku' label="SKU" width='150'>
      </el-table-column>
      <el-table-column prop='description' label="产品描述" width='200'>
      </el-table-column>
      <el-table-column prop='sell_date' label="开售日期" width="100" :filters='dateFilterValue' :filter-method="filterDate">
      </el-table-column>
      <el-table-column prop='status' label="产品状态" width="100" :filters='statusFilterValue' :filter-method="filterStore">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.status)">{{scope.row.status}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop='eidt' fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button> -->
          <el-button type="text" size="small" @click="changePro(scope.$index,scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="proFormValues.id?'修改' :'新增'" :visible.sync="dialogVisible" width="50%" :inline="true">
      <el-form :inline="true" label-width="80px" :model="proFormValues" ref="proFormValues" :rules="proRules">
        <el-form-item prop="store" label="商号">
          <el-select v-model="proFormValues.store" placeholder="请选择商号" filterable collapse-tags style="width: 92%;">
            <el-option v-for="(item,index) in proForm.store_brands_ops" :key="index" :label="item.store"
              :value="item.store">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="brand" label="品牌">
          <el-select v-model="proFormValues.brand" placeholder="请先选择商号" filterable collapse-tags style="width:92%">
            <el-option v-for="(item,index) in brand" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="op" label="运营">
          <el-select v-model="proFormValues.op" placeholder="请先选择商号" filterable collapse-tags>
            <el-option v-for="(item,index) in op" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="category" label="大类">
          <el-input v-model="proFormValues.category"> </el-input>
        </el-form-item>
        <el-form-item prop="category1" label="产品线">
          <el-input v-model="proFormValues.category1"></el-input>
        </el-form-item>
        <el-form-item prop="category2" label="细分品线">
          <el-input v-model="proFormValues.category2"></el-input>
        </el-form-item>
        <el-form-item prop="spu" label="SPU">
          <el-input v-model="proFormValues.spu"></el-input>
        </el-form-item>
        <el-form-item prop="fasin" label="父ASIN">
          <el-input v-model="proFormValues.fasin"></el-input>
        </el-form-item>
        <el-form-item prop="asin" label="子ASIN">
          <el-input v-model="proFormValues.asin"></el-input>
        </el-form-item>
        <el-form-item prop="sku" label="SKU">
          <el-input v-model="proFormValues.sku"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="产品描述">
          <el-input v-model="proFormValues.description"></el-input>
        </el-form-item>
        <el-form-item prop="sell_date" label="开售日期">
          <el-input v-model="proFormValues.sell_date"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="产品状态">
          <el-select v-model="proFormValues.status" placeholder="产品状态" filterable collapse-tags>
            <el-option v-for="(item,index) in proForm.status" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="pic" label="图片" width="50%">
          <el-upload class="upload-demo" action="#" :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList"
            :before-upload="beforeUpload" :on-change="changePic" accept=".jpg,.jpeg,.png" :auto-upload="false"
            show-file-list>
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">只能上传jpg/png文件,大小5M</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPro">取 消</el-button>
        <el-button type="primary" @click="saveAddPro('proFormValues')">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog-box" title="批量上传产品资料" width="25%" :visible.sync="uploadProDialog">
      <el-upload class="upload-demo" ref="upload" action="#" :show-file-list="true" :before-upload="beforeUploadExecl"
        :http-request="uploadHttpRequest" :file-list="fileList" :on-change="handleUploadChange" :limit="5" drag
        multiple>
        <div class="border">
          <i class="el-icon-plus icon-center"></i>
        </div>
        <div slot="tip" class="el-upload-tip upload-tips">只能上传.xlsx文件</div>
      </el-upload>
      <span slot="footer">
        <el-button @click="submitUpload" type="primary">上传</el-button>
        <el-button @click="uploadProDialog = false" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
    <el-row style="display: flex;">
      <el-col :span="15" style="padding: 7px;"></el-col>
      <el-col :span="2" style="padding: 10px;">
        <el-tag>筛选结果：{{tableSum}}</el-tag>
      </el-col>
      <el-col :span="7.5" style="padding: 5px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getProductList, getProSelectList, postAddProApi, delProListApi, putChangeProApi } from '@/api/manage'
  import XLSX from "xlsx"
  import FileSaver from "file-saver"
  import table2excel from 'js-table2excel'
  export default {

    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        copyTableData: [],
        dialogVisible: false,
        proForm: [],
        proFormValues: {
          pic: '',
          store: '',
          brand: '',
          op: '',
          category: '一次性',
          category1: '盘子',
          category2: '盘子-纸',
          spu: '盘子-纸-卡纸',
          fasin: 'B0C7W233FS',
          asin: 'B08DXG7V1S',
          sku: 'C003-9-Clear-100-3',
          description: '2020-09-201111',
          sell_date: '2020-09-20',
          status: '',
        },
        rlues: {},
        fileList: [],
        brand: '',
        store: '',
        op: '',
        spus: [],
        proList: [],
        uploadProDialog: false,
        loadingPro: true,
        currentPage: 1, //当前页
        total: 0, //总条数
        pageSize: 5, //当前页容量
        pageSizes: [5, 10, 15, 20, 100],
        filterValue: null,
        filterKey: null,
        fresh_table: true,
        tableSum: 0,
        proRules: {
          store: [{ required: true, validator: this.validateName, trigger: 'change' },],
          brand: [{ required: true, message: '请选择店铺', trigger: 'change' }],
          op: [{ required: true, message: '请选择运营', trigger: 'change' }],
          category: [{ required: true, message: '请输入大类', trigger: 'blur' }],
          category1: [{ required: true, message: '请输入产品线', trigger: 'blur' }],
          category2: [{ required: true, message: '请输入细分品线', trigger: 'blur' }],
          spu: [{ required: true, validator: this.validateSpu, trigger: 'change' }],
          fasin: [{ required: true, message: '请输入父asin', trigger: 'blur' }],
          asin: [{ required: true, message: '请输入asin', trigger: 'blur' }],
          sku: [{ required: true, message: '请输sku', trigger: 'blur' }],
          description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
          sell_date: [{ required: true, message: '请输细开售时间', trigger: 'blur' }],
          status: [{ required: true, message: '请选择产品状态', trigger: 'blur' }],
          pic: [{ required: true, message: '请选择产品状态', trigger: 'blur' }]
        }
      }
    },
    watch: {
      store(v, d) {
        let storeForm = this.proForm.store_brands_ops
        console.log(storeForm)
        storeForm.map(i => {
          if (i.store == v) {
            i.childen.map(item => {
              this.brand = item.brands
              this.op = item.ops
            })
          } else if (i.store == d) {
            this.proFormValues.op = ''
            this.proFormValues.brand_name = ''
          }
        })
      }
    },
    computed: {
      // 筛选
      storeFilterValue() {
        return this.proForm.store_brands_ops?.map((i) => ({
          text: i.store, value: i.store
        }))
      },
      brandFilterValue() {
        let brand = this.proForm.store_brands_ops?.reduce((acc, parent) => {
          parent.childen.forEach(child => {
            const brandText = child.brands[0]

            // 使用 findIndex 检查是否已经存在
            if (!acc.some(item => item.text === brandText)) {
              acc.push({ text: brandText, value: brandText })
            }
          })
          return acc
        }, [])
        return brand
      },

      opFilterValue() {
        let op = this.proForm.store_brands_ops?.reduce((acc, parent) => {
          parent.childen.forEach(child => {
            child.ops?.forEach(opText => {
              if (!acc.some(item => item.text === opText)) {
                acc.push({ text: opText, value: opText })
              }
            })
          })
          return acc
        }, [])

        return op
      },
      catFilterValue() {
        const uniqueCategories = this.copyTableData.reduce((acc, i) => {
          const exists = acc.some(item => item.text === i.category)
          if (!exists) {
            acc.push({ text: i.category, value: i.category })
          }
          return acc
        }, [])
        return uniqueCategories
      },
      cat1FilterValue() {
        const uniqueCategories = this.copyTableData.reduce((acc, i) => {
          const exists = acc.some(item => item.text === i.category1)
          if (!exists) {
            acc.push({ text: i.category1, value: i.category1 })
          }
          return acc
        }, [])
        return uniqueCategories
      },
      cat2FilterValue() {
        const uniqueCategories = this.copyTableData.reduce((acc, i) => {
          const exists = acc.some(item => item.text === i.category2)
          if (!exists) {
            acc.push({ text: i.category2, value: i.category2 })
          }
          return acc
        }, [])
        return uniqueCategories
      },
      spuFilterValue() {
        const uniqueCategories = this.copyTableData.reduce((acc, i) => {
          const exists = acc.some(item => item.text === i.spu)
          if (!exists) {
            acc.push({ text: i.spu, value: i.spu })
          }
          return acc
        }, [])
        return uniqueCategories
      },
      dateFilterValue() {
        const uniqueCategories = this.copyTableData.reduce((acc, i) => {
          const year = i.sell_date.substring(0, 4)
          const exists = acc.some(item => item.text === year)
          if (!exists) {
            acc.push({ text: year, value: year })
          }
          return acc
        }, [])
        return uniqueCategories
      },
      statusFilterValue() {
        const uniqueCategories = this.copyTableData.reduce((acc, i) => {
          const exists = acc.some(item => item.text === i.status)
          if (!exists) {
            acc.push({ text: i.status, value: i.status })
          }
          return acc
        }, [])
        return uniqueCategories
      },
    },
    methods: {
      // 获取
      async initProData() {
        this.tableData = await getProductList()
        this.total = this.tableData.length
        this.copyTableData = this.tableData
        this.loadingPro = false
        this.tableData.map(item => {
          if (item.pic_field) {
            item.pic_field = ['http://192.168.5.174:8000' + item.pic_field]
          } else {
            item.pic_field = []
          }
        })
      },
      //  获取select新增列表
      async getProSelect() {
        this.proForm = await getProSelectList()
      },
      // 表单验证
      validateName(rule, value, callback) {
        // 方案1
        this.store = value
        callback()
      },
      // spu校验
      validateSpu(rule, value, callback) {
        this.spus = this.proForm.spu
        if (this.spus.includes(value)) {
          callback()
        } else {
          callback(new Error('请输入已有的SPU,格式为xx-xx-xx'))
        }
      },
      // 获取删除sku
      selectPro(selection, row) {
        this.proList = selection.map(element =>
          element.sku
        )

      },
      // 删除
      async delProList() {
        if (this.proList.length < 1) {
          console.log(this.proList, 'this.FirmList')
          return this.$message({
            message: "请选择删除行",
            type: 'warning'
          })
        } else {
          delProListApi(this.proList).then(response => {
            console.log('请求成功:', response)
            this.$message({
              message: "删除成功",
              type: 'success'
            })
            this.initProData()
            // 处理响应数据...
          }).catch(error => {
            console.error('请求失败:', error)
            if (error.response) {
              console.error('状态码:', error.response.status)
            }
            this.initProData()
            // 处理错误...
          })
        }
      },
      // 批量修改
      // changeProList() { },
      // 批量上传
      uploadExcel() {
        this.uploadLoading = false
        this.fileList = []
        this.uploadProDialog = true
      },
      // 限制文件上传的个数只有一个，获取上传列表的最后一个
      handleUploadChange(file, fileList) {
        console.log(this.fileList)
        // if (fileList.length > 0) {
        //   this.fileList = [fileList[fileList.length - 1]]
        // }
        this.fileList = fileList
      },
      // 上传文件之前，判断文件后缀和大小
      beforeUploadExecl(file) {
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
        if (!!this.file.file) {
          this.downloadLoading = this.$loading({
            lock: true,
            text: '数据上传中...',
            color: '#1800FF',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
          let formData = {}
          formData.bulk_create = true
          formData.file = this.file.file
          postAddProApi(formData).then(response => {
            console.log('请求成功:', response)
            this.$message({
              message: "上传成功,请查看上传数据",
              type: 'success'
            })
            // if ('http://192.168.5.174:8000/' + response.file_url) {
            //   let url = window.URL.createObjectURL('http://192.168.5.174:8000/' + response.file_url)
            //   window.open(url)
            // }
            let fileUrl = 'http://192.168.5.174:8000/' + response.file_url
            window.location.href = fileUrl
            this.uploadProDialog = false
            this.downloadLoading.close()
            this.initProData()

          }).catch(error => {
            console.error('请求失败:', error, '1111')
            if (error.response) {
              console.error('状态码:', error.response.status)
            }
            this.uploadProDialog = false
            this.downloadLoading.close()
            this.initProData()
            // 处理错误...
          })
        }
      },
      // 下载
      downloadExcel() {
        const tableHeader = [
          {
            title: '图片',
            key: 'pic_field',
            type: 'image',
            width: 50,
            height: 50
          },
          {
            title: '商号',
            key: 'store',
            type: 'text'
          },
          {
            title: '品牌',
            key: 'brand',
            type: 'text'
          },
          {
            title: '运营',
            key: 'op',
            type: 'text'
          },
          {
            title: '大类',
            key: 'category',
            type: 'text'
          },
          {
            title: '产品线',
            key: 'category1',
            type: 'text'
          },
          {
            title: '细分品线',
            key: 'category2',
            type: 'text'
          }, {
            title: 'SPU',
            key: 'spu',
            type: 'text'
          },
          {
            title: '父asin',
            key: 'fasin',
            type: 'text'
          },
          {
            title: 'asin',
            key: 'asin',
            type: 'text'
          },
          {
            title: 'sku',
            key: 'sku',
            type: 'text'
          },
          {
            title: '描述',
            key: 'description',
            type: 'text'
          },
          {
            title: '开售时间',
            key: 'sell_date',
            type: 'text'
          },
          {
            title: '产品状态',
            key: 'status',
            type: 'text'
          },

        ]
        let tableDatas = JSON.parse(JSON.stringify(this.tableData))
        let fileName = this.$route.name + new Date().toISOString().replace(/:/g, '-') + '.xlsx'
        table2excel(tableHeader, tableDatas, fileName)
      },
      // 打开新增dailog
      addpro() {
        this.dialogVisible = true
      },
      changePro(i, row) {
        console.log(i, row)
        this.dialogVisible = true
        this.proFormValues = row
      },
      // 保存新增
      saveAddPro(formName) {
        console.log(this.$refs[formName].validate, this.proFormValues.pic, 111)
        if (this.proFormValues.id) {
          console.log(this.proFormValues.pic, 'xiyu')
          if (!this.proFormValues.pic) {
            delete this.proFormValues.pic_field
            delete this.proFormValues.pic_pre
            console.log(this.proFormValues, 'pic')
          } else {
            delete this.proFormValues.pic_field
            delete this.proFormValues.pic_pre
            console.log(this.proFormValues, 'haspic')
          }
          putChangeProApi(this.proFormValues).then(response => {
            console.log('请求成功:', response)
            this.$message({
              message: "修改成功",
              type: 'success'
            })
            this.dialogVisible = false
            this.initProData()
            this.proFormValues = {}
          })
        } else {
          this.$refs[formName].validate(valid => {
            if (valid) {
              console.log(valid, this.proFormValues, '测试')
              postAddProApi(this.proFormValues).then(response => {
                console.log('请求成功:', response)
                this.$message({
                  message: "新增成功",
                  type: 'success'
                })
                this.dialogVisible = false
                this.proFormValues = {}
                this.initProData()
              }).catch(error => {
                this.$message({
                  message: '新增失败' + error || 'Error',
                  type: 'error',
                  duration: 5 * 1000
                })
                console.error('新增失败:', error)
                if (error.response) {
                  console.error('状态码:', error.response.status)
                }
                this.initProData()
                // 处理错误...
              })
            }

          })
        }
      },
      // 取消修改表单
      cancelPro() {
        this.dialogVisible = false
        this.proFormValues = {}
      },
      // 保存编辑
      saveChange() { },
      // 图片上传
      handleRemove(file, fileList) {
        console.log(file, fileList, 'shangchuan')
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件,本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}?`)
      },
      beforeUpload(file) {
        console.log(file)
        if (file.size / 1024 / 1024 > 5) {
          this.$message.error({
            message: `上传文件大小不能超过5M!`,
          })
          return false
        }
      },
      changePic(file) {

        this.proFormValues.pic = file.raw
      },
      // 下载上传模板示例
      downloadExcelEG() {
        const fileUrl = 'http://192.168.5.174:8000/statics/data/sku上传模板.xlsx' // 替换为你的文件路径
        window.location.href = fileUrl
      },
      // 表头筛选
      filterStore(value, row, column) {
        const property = column['property']
        this.filterValue = value
        this.filterKey = property
        return row[property] === value
      },
      filterDate(value, row, column) {
        this.filterValue = value
        this.filterKey = column['property']
        if (row.sell_date.includes(value)) {
          return true
        }
      },

      proSum({ columns, data }) {
        const proSum = []
        let isShow = 0
        columns.forEach((column, index) => {
          if (index === 0) {
            // 第一列通常是选择框，不需要汇总
            proSum[index] = '汇总'
            return
          } else if (index === 12) {
            proSum[index] = '筛选条数:' + this.tableSum
            return
          } else if (index === 11) {
            proSum[index] = '总条数:' + this.tableData.length
            return
          }
        })
        return proSum
      },
      // 分页
      handleSizeChange(val) {
        this.currentPage = 1
        this.pageSize = val
        this.initProData()
      },
      //切换当前页
      handleCurrentChange(val) {
        this.currentPage = val
        // this.initProData()
      },
      proFilterChange(value) {

        console.log(value)
        if (!this.filterValue) {
          // 如果用户没有选择任何筛选条件，直接返回原始表格数据
          this.tableData = this.copyTableData
        }
        // 使用 filter 方法过滤表格数据
        console.log(this.tableData)
        this.tableData = this.copyTableData.filter((row) => row[this.filterKey] === this.filterValue)
        // this.pageSize = this.tableData.length
        this.fresh_table = !this.fresh_table
      },
      // tag颜色
      getTagType(status) {
        if (status === '新品') {
          return 'success' // 在售状态使用成功色
        } else {
          return 'danger' // 解约状态使用危险色
        }
      },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      this.initProData(),
        this.getProSelect()
    },
    mounted() { }

  }
</script>
<style lang="scss" scoped>
  .el-form-item__content {
    width: 90%;

    .el-select {
      width: 93%;

      .el-input {
        width: 187px !important;
      }
    }

    .el-form-item__label {
      width: 30px !important;
    }
  }

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

  /*
  ::v-deep .el-table {
    display: flex;
    flex-direction: column;
  }

  ::v-deep .el-table__footer-wrapper {
    order: -1;
  }

  ::v-deep .el-table__footer-wrapper tbody td.el-table__cell {
    mix-blend-mode: multiply;
  } */
  /* 设置flex并配合order将本来放在最后位置的 */
  ::v-deep .el-table__fixed {
    display: flex;
    flex-direction: column;
  }

  /* ::v-deep .el-table__fixed-footer-wrapper,
  ::v-deep .el-table__fixed-body-wrapper,
  ::v-deep .el-table__fixed-header-wrapper {
    position: initial;
  } */

  ::v-deep .el-table__fixed-body-wrapper {
    order: 1;
  }

  ::v-deep .el-table__fixed-footer-wrapper tbody td.el-table__cell {
    border-top: none;
  }

  /* 默认有1px去掉样式影响 */
  ::v-deep .el-table__fixed::before {
    height: 0;
  }
</style>
