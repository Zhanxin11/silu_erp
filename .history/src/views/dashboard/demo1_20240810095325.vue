<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-10 09:53:14
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-button type="danger" @click="delCheckList">批量删除</el-button>
        <el-button type="primary" @click="changeList">批量编辑</el-button>
        <el-button type="primary" @click="uploadExcel">批量上传</el-button>
        <el-button type="primary" @click="changeList">下载</el-button>
        <el-button type="info" @click="addList">新增</el-button>
      </el-row>
      <el-table style="width: 100%;    height: 100%; margin-top: 20px" border :data="tableData" id="table"
        @selection-change="handleSelectionChange" @select="select">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="op_field" label="运营"></el-table-column>
        <el-table-column prop="sku_field" label="SKU"></el-table-column>
        <el-table-column prop="store_field" label="店铺"></el-table-column>
        <el-table-column v-for="item in dates" :key="item" :prop="item" :label="item">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="趋势图" prop="date" width="250" height="50" align="center">
          <template slot-scope="scope">
            <div :ref="'echarts_' + scope.$index" style="width: 95%; height: 50px; margin: 0 auto; z-index: 999">
              {{ scope.row }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" prop="edit" label="操作" width='150'>
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog class="dialog-box" title="批量上传" width="25%" :visible.sync="uploadShowDialog">

        <el-upload class="upload-demo" ref="upload" action="#" :multiple="false" :show-file-list="true"
          :before-upload="beforeUpload" :http-request="uploadHttpRequest" :file-list="fileList"
          :on-change="handleUploadChange" :limit="1">
          <div class="border">
            <i class="el-icon-plus"></i>
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
  </div>
</template>

<script>
  import { getDemo1, delLists } from '@/api/demo'
  import { mapGetters } from 'vuex'

  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        delStrList: '',
        dateColumns: [],
        file: null,
        //加载动画
        uploadLoading: false,
        //上传的文件列表
        fileList: [],
        //控制弹出框显示与否
        uploadShowDialog: false,
        //上传地址
        uploadURL: '',
        //loading加载中
        downloadLoading: '',
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      dates() {
        if (this.tableData && this.tableData[0]?.date) {
          // 使用 Object.keys() 获取 date 对象的所有键
          return Object.keys(this.tableData[0].date)
        }
        return []
      },
      // echartsArr() {
      //   if (this.tableData && this.tableData[0]?.date) {
      //     return Object.values(this.tableData[0].date)
      //   }
      //   return []
      // }
    },
    methods: {
      // 初始化数据Date
      changeTableData(obj) {
        const keys = Object.keys(obj) // 获取对象的所有键
        const newObj = {} // 创建一个新对象来存放结果
        for (let i = 3; i < keys.length; i++) {
          const key = keys[i]
          newObj[key] = obj[key]
        }
        return newObj
      },
      async initData() {
        const token = this.token
        if (!token) {
          console.log('Token is not available')
          return
        }
        try {
          this.tableData = await getDemo1(token)
          this.tableData.map(item => {
            item.date = this.changeTableData(item)
          })
          this.addIsTrue()
          // console.log(this.tableData, this.dates, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },

      handleSelectionChange(el) {
        // console.log(el, 222)
      },
      // 获取删除id
      select(selection, row) {
        this.delStrList = selection.map(element =>
          element.id
        ).join(',')
      },
      // 批量删除
      async delCheckList() {
        if (this.delStrList.length < 1) {
          console.log(this.delArr)
          return this.$message({
            message: "请选择删除行",
            type: 'warning'
          })
        } else {
          delLists(this.delStrList).then(response => {
            console.log('请求成功:', response)
            this.initData()
            this.$message({
              message: "删除成功",
              type: 'success'
            })
            // 处理响应数据...
          }).catch(error => {
            console.error('请求失败:', error)
            if (error.response) {
              console.error('状态码:', error.response.status)
            }
            //  else if (error.request) {
            //   // error.request 来获取请求的配置信息
            // }
            this.initData()
            // 处理错误...
          })
          console.log(this.delArr, 111)
        }
      },
      // 添加标记
      addIsTrue() {
        console.log(this.tableData)
        // this.tableData.map(item => {
        //   console.log(item, 1)
        //   return Object.key(item).map(i => {
        //     if (i.date) {
        //       Object.key(i.date).map(d => {
        //         return { ...d, isCheck: false }
        //       })
        //     } else {
        //       return {
        //         ...i,
        //         isCheck: false
        //       }
        //     }
        //   })
        // })
      },
      // 批量修改
      changeList() { },
      // 新增
      addList() { },
      uploadExcel() {
        this.uploadLoading = false
        this.fileList = []
        this.uploadShowDialog = true
        // setTimeout(() => {
        //   //清空已上传的文件列表
        //   this.$refs.upload.clearFiles();
        // }, 100);
      },
      // 限制文件上传的个数只有一个，获取上传列表的最后一个
      handleUploadChange(file, fileList) {
        if (fileList.length > 0) {
          // 这一步，是展示最后一次选择的文件
          this.fileList = [fileList[fileList.length - 1]]
        }
      },
      // 上传文件之前，先判断文件后缀和大小
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
        if (fileSize > 1048576) {
          this.uploadShowDialog = false
          this.$message({
            type: 'error',
            showClose: true,
            duration: 3000,
            message: '文件不能大于1M!'
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
        console.log(this.file.file)
        formData.append('file', this.file.file)
        if (!!this.file.file) {
          this.downloadLoading = this.$loading({
            lock: true,
            text: '数据导入中...',
            color: '#0183FF',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
          //注：formData中的数据不能直接打印，需要用到get方法得到
          // batchuploadFile是接口
          batchuploadFile(formData).then(res => {
            this.uploadShowDialog = false
            this.handleQuery()
          })
        } else {
          this.downloadLoading.close()
        }
      }
    },
    mounted() {
      this.initData()

    },
    created() {

    }
  }

</script>
<style lang="scss" scoped>
  .upload-demo {
    text-align: center;

    .border {
      border: 1px dotted #c0acac;
      text-align: center;
      width: 100px;
      height: 100px;
    }

    .upload-tips {
      margin: left;
    }
  }
</style>