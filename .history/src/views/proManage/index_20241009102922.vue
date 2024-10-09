<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 18:01:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-08 17:49:28
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
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="tableHeaderColor">
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
      <el-table-column prop='store_name' label="商号" filter="firm">
      </el-table-column>
      <el-table-column prop='brand_name' label="品牌">
      </el-table-column>
      <el-table-column prop='op_name' label="运营">
      </el-table-column>
      <el-table-column prop='category' label="大类">
      </el-table-column>
      <el-table-column prop='category1' label="产品线">
      </el-table-column>
      <el-table-column prop='category2' label="细分品线">
      </el-table-column>
      <el-table-column prop='spu_name' label="SPU">
      </el-table-column>
      <el-table-column prop='fasin' label="父ASIN" width='150'>
      </el-table-column>
      <el-table-column prop='asin' label="子ASIN" width='150'>
      </el-table-column>
      <el-table-column prop='sku' label="SKU">
      </el-table-column>
      <el-table-column prop='description' label="产品描述" width='200'>
      </el-table-column>
      <el-table-column prop='sell_date' label="开售日期">
      </el-table-column>
      <el-table-column prop='status_name' label="产品状态">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.status_name)">{{scope.row.status_name}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop='eidt' fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="48%" :inline="true">

      <el-form :inline="true" label-width="80px" :model="proFormValues" ref="proFormValues">
        <el-form-item prop="store_brands_ops" label="商号">
          <el-cascader v-model="proFormValues.store_brands_ops" :options="opsValue" clearable></el-cascader>
        </el-form-item>
        <!-- <el-form-item prop="store_name" label="商号"> -->
        <!-- <el-input v-model="proFormValues.store_name"></el-input>
        </el-form-item>
        <el-form-item prop="brand_name" label="品牌">
          <el-input v-model="proFormValues.brand_name"></el-input>
        </el-form-item>
        <el-form-item prop="op" label="运营">
          <el-input></el-input>
        </el-form-item> -->
        <el-form-item prop="category" label="大类">
          <el-input v-model="proFormValues.category"> </el-input>
        </el-form-item>
        <el-form-item prop="category1" label="产品线">
          <el-input v-model="proFormValues.category1"></el-input>
        </el-form-item>
        <el-form-item prop="category2" label="细分品线">
          <el-input v-model="proFormValues.category2"></el-input>
        </el-form-item>
        <el-form-item prop="spu_name" label="SPU">
          <el-input v-model="proFormValues.spu_name"></el-input>
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
          <el-select v-model="proFormValues.status" placeholder="请选择运营(可多选)" filterable collapse-tags>
            <el-option v-for="(item,index) in proForm.status" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item pro="pic" label="图片" width="50%">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1"
            :on-exceed="handleExceed" :file-list="fileList" :before-upload="beforeUpload" accept=".jpg,.jpeg,.png">
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">只能上传jpg/png文件,大小5M</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getProductList, getProSelectList } from '@/api/manage'
  export default {

    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        proForm: [],
        proFormValues: {
          pic_field: '',
          store_name: '',
          brand_name: '',
          op_name: '',
          category: '',
          category1: '',
          category2: '',
          spu_name: '',
          fasin: '',
          asin: '',
          sASInL: '',
          sku: '',
          description: '',
          sell_date: '',
          status_name: '',
        },
        rlues: {},
        fileList: [],
      }
    },
    watch: {},
    computed: {
      // opsValue() {
      //   const ops = this.proForm.store_brands_ops
      //   return ops?.map(item => ({
      //     value: item.store,
      //     label: item.store,
      //     children: item.childen?.map(i => (
      //       {
      //         value: i.brands,
      //         label: i.brands,
      //         // children: teamValue.childen?.map(unitValue => ({
      //         //   value: unitValue.unit,
      //         //   label: unitValue.unit
      //         // }))
      //       }
      //     ))
      //   }))
      // },

    },
    methods: {
      // 获取
      async initProData() {
        this.tableData = await getProductList()
        this.tableData.map(item => {
          console.log(item)
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
      // 删除
      delProList() { },
      // 批量修改
      changeProList() { },
      // 批量上传
      uploadExcel() { },
      // 下载
      downloadExcel() { },
      // 新增
      addpro() {
        this.dialogVisible = true

      },
      // 保存编辑
      saveChange() { },
      // 图片上传
      handleRemove(file, fileList) {
        console.log(file, fileList)
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
      this.initProData()
      this.getProSelect()
    },
    mounted() { }
  }
</script>
<style lang="scss" scoped>
</style>
