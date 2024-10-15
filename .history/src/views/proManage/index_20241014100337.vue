<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 18:01:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-14 09:59:53
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
      <el-button type="primary" @click="saveChange">保存编辑</el-button>
      <el-button type="primary" @click="downloadExcel">下载</el-button>
      <el-button type="info" @click="addpro">新增</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="tableHeaderColor" @select="selectPro">
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
      <el-table-column prop='store' label="商号" filter="firm" width="100">
      </el-table-column>
      <el-table-column prop='brand' label="品牌" width="100">
      </el-table-column>
      <el-table-column prop='op' label="运营" width="80">
      </el-table-column>
      <el-table-column prop='category' label="大类" width="100">
      </el-table-column>
      <el-table-column prop='category1' label="产品线">
      </el-table-column>
      <el-table-column prop='category2' label="细分品线" width="100">
      </el-table-column>
      <el-table-column prop='spu' label="SPU" width="120">
      </el-table-column>
      <el-table-column prop='fasin' label="父ASIN" width='120'>
      </el-table-column>
      <el-table-column prop='asin' label="子ASIN" width='120'>
      </el-table-column>
      <el-table-column prop='sku' label="SKU" width='150'>
      </el-table-column>
      <el-table-column prop='description' label="产品描述" width='200'>
      </el-table-column>
      <el-table-column prop='sell_date' label="开售日期" width="100">
      </el-table-column>
      <el-table-column prop='status' label="产品状态">
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
    <el-dialog title=" 新增" :visible.sync="dialogVisible" width="50%" :inline="true">
      <el-form :inline="true" label-width="80px" :model="proFormValues" ref="proFormValues" :rules="proRules">
        <el-form-item prop="store" label="商号" width="350px">
          <el-select v-model="proFormValues.store" placeholder="请选择商号" filterable collapse-tags style="width: 92%;">
            <el-option v-for="(item,index) in proForm.store_brands_ops" :key="index" :label="item.store"
              :value="item.store">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="brand" label="品牌" width="350px">
          <el-select v-model="proFormValues.brand" placeholder="请先选择商号" filterable collapse-tags style="width:92%">
            <el-option v-for="(item,index) in brand" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="op" label="运营" width="350px">
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
        <el-form-item prop="status" label="产品状态" width="350px">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddPro('proFormValues')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getProductList, getProSelectList, postAddProApi, delProListApi, putChangeProApi } from '@/api/manage'
  export default {

    components: {},
    props: {},
    data() {
      return {
        tableData: [],
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
        
        proRules: {
          store: [{ required: true, validator: this.validateName, trigger: 'change' },],
          brand: [{ required: true, msg: '请选择店铺', trigger: 'change' }],
          op: [{ required: true, msg: '请选择运营', trigger: 'change' }],
          category: [{ required: true, msg: '请输入大类', trigger: 'change' }],
          // category1: [{ required: true, msg: '请输入大类',trigger: 'blur'}],
          category2: [{ required: true, msg: '请输入细分线', trigger: 'change' }],
          // spu: [{ required: true, validator: this.validateSpu, trigger: 'blur' }],
          fasin: [{ required: true, msg: '请输细分线', trigger: 'change' }],
          asin: [{ required: true, msg: '请输细分线', trigger: 'change' }],
          sku: [{ required: true, msg: '请输细分线', trigger: 'change' }],
          description: [{ required: true, msg: '请输细分线', trigger: 'change' }],
          sell_date: [{ required: true, msg: '请输细分线', trigger: 'change' }],
          status: [{ required: true, msg: '请输细分线', trigger: 'change' }],
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

      storeValue() {

      }
    },
    methods: {
      // 获取
      async initProData() {
        this.tableData = await getProductList()
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
        console.log(selection)
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
      uploadExcel() { },
      // 下载
      downloadExcel() { },
      // 打开新增dailog
      addpro() {
        this.dialogVisible = true
      },
      changePro(i, row) {
        console.log(i, row)
      },
      // 保存新增
      saveAddPro(formName) {
        console.log(this.$refs[formName].validate, 111)

        // postAddProApi(this.proFormValues).then(response => {
        //   console.log('请求成功:', response)
        //   this.$message({
        //     message: "新增成功",
        //     type: 'success'
        //   })
        // })
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(valid, this.proFormValues, '测试')
            postAddProApi(this.proFormValues).then(response => {
              let rq = response
              console.log('请求成功:', response)
              this.$message({
                message: "新增成功",
                type: 'success'
              })
              this.dialogVisible = false
              this.proFormValues = {}

            }).catch(error => {
              console.error('新增失败:', rq.msg)
              if (error.response) {
                console.error('状态码:', error.response.status)
              }
              this.initData()
              // 处理错误...
            })
          }

        })
      },
      // 保存编辑
      saveChange() { },
      // 图片上传
      handleRemove(file, fileList) {
        console.log(file, fileList, 'shangchuan')
        // if (file.size / 1024 / 1024 > 5) {
        //   this.$message.error({
        //     message: `上传文件大小不能超过5M!`,
        //   })
        //   return false
        // }
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
</style>
