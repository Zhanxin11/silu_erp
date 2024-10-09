<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 18:01:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-08 14:11:20
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="图片" prop='pics' align="center">
        <template slot-scope="scope">
          <div style="height: 100px; display: flex;justify-content: center; ">
            <el-image :src="'http://121.41.171.227:8000/' + scope.row.pics[0]" :preview-src-list="scope.row.pic_field"
              fit="fill" :alt="'http://121.41.171.227:8000/' + scope.row.pics[0]"></el-image>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop='pics' label="商号" filter="firm">
      </el-table-column>
      <el-table-column  prop='pics' label="品牌">
      </el-table-column>
      <el-table-column  prop='pics' label="运营">
      </el-table-column>
      <el-table-column  label="大类">
      </el-table-column>
      <el-table-column label="产品线">
      </el-table-column>
      <el-table-column label="细分品线">
      </el-table-column>
      <el-table-column label="SPU">
      </el-table-column>
      <el-table-column label="父ASIN">
      </el-table-column>
      <el-table-column label="子ASIN">
      </el-table-column>
      <el-table-column label="SKU">
      </el-table-column>
      <el-table-column label="产品描述">
      </el-table-column>
      <el-table-column label="开售日期">
      </el-table-column>
      <el-table-column label="产品状态">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%" :inline="true">
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
        <el-form-item prop="sASIN" label="子ASIN">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="SKU" label="SKU">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="proDsicription" label="产品描述">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="avaDate" label="开售日期">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="proState" label="产品状态">
          <el-input></el-input>
        </el-form-item>
        <el-form-item pro="pic" label="图片" width="50%">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1"
            :on-exceed="handleExceed" :file-list="fileList" :before-upload="beforeUpload">
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
  import { getProductList, } from '@/api/manage'
  export default {

    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        proForm: {
          pic: '',
          firm: '',
          brand: '',
          op: '',
          categories: '',
          proLine: '',
          minLine: '',
          SPU: '',
          fASIN: '',
          sASInL: '',
          SKU: '',
          proDsicription: '',
          avaDate: '',
          proState: '',
        },
        rlues: {},
        fileList: []
      }
    },
    watch: {},
    computed: {},
    methods: {
      // 获取
      async initProData() {
        this.tableData = await getProductList()
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
      }
    },
    created() { },
    mounted() { }
  }
</script>
<style lang="scss" scoped>
</style>
