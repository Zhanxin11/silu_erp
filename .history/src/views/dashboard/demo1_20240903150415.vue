<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-03 15:03:48
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-button type="danger" @click="delCheckList">批量删除</el-button>
        <el-button type="primary" @click="uploadExcel">批量上传</el-button>
        <el-button type="primary" v-if="!isCheck" @click="changeList">批量编辑</el-button>
        <el-button type="primary" v-else @click="clearIscheck">取消编辑</el-button>
        <el-button type="primary" @click="saveChange">保存编辑</el-button>
        <!-- <el-button v-for="(option, index) in Options" :key="index"
          :type="index === selectedIndex ? 'primary' : 'default'" @click="selectOption(index)">
          {{ option.label }}
        </el-button> -->
        <el-button type="primary" @click="downloadExcel">下载</el-button>
        <el-button type="info" @click="addList">新增</el-button>
      </el-row>
      <el-table id="table_out" style="width: 100%; height: 100%;margin-top: 20px" border :data="tableData"
        @selection-change="handleSelectionChange" @select="select" v-loading="loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="op_field" label="运营"></el-table-column>
        <el-table-column prop="sku_field" label="SKU"></el-table-column>
        <el-table-column prop="store_field" label="店铺"></el-table-column>
        <!-- <el-table-column prop="store_field" label="店铺">
          <template slot-scope="scope">
            {{ scope.row.pic_field}}
          </template>
        </el-table-column> -->
        <el-table-column prop="pic_field
        " label="图片">
          <template slot-scope="scope">
            <div sty>
              <el-image src="https://i-blog.csdnimg.cn/blog_migrate/24d876a11ff92c9453f3c2462d0f83de.png"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="(item,index) in dates" :key="item" :label="item" :prop="item">
          <template slot-scope="scope">
            <span v-if="!scope.row.date[index].isTrue">{{
              scope.row.date[index][item]}}--{{scope.row.date[index].isTrue}}</span>
            <el-input v-if="scope.row.date[index].isTrue" v-model="scope.row.date[index][item]"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="edit" label="操作" width='150'>
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
  import { getDemo1, delLists } from '@/api/demo'
  import { mapGetters } from 'vuex'
  import XLSX from "xlsx"
  import FileSaver from "file-saver"
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        delSkuList: '',
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
        loading: true,
        isCheck: false,
        newObjArray: [],
        Options: [
          { value: 'option1', label: '批量编辑' },
          { value: 'option2', label: '保存编辑' },
          { value: 'option3', label: '取消编辑' }
        ],
        selectedIndex: 0,
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      dates() {
        if (this.tableData && this.tableData[0]?.date) {
          // 使用 Object.keys() 获取 date 对象的所有键
          // console.log(this.tableData[0].date, 'oj')
          return this.tableData[0].date.map(i => {
            return Object.keys(i)[0]
          })
        }
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
        const values = Object.values(obj)
        const newObjArray = []
        for (let i = 5; i < keys.length; i++) {
          const key = keys[i]
          const value = values[i]
          // console.log(keys)
          newObjArray.push({
            [key]: value,
            isTrue: false,
          })
        }
        return this.newObjArray = newObjArray
      },
      async initData() {
        const token = this.token

        if (!token) {
          console.log('Token is not available')
          return
        }
        try {
          this.tableData = await getDemo1(token)
          this.loading = false
          this.tableData.map(item => {
            item.date = this.changeTableData(item)
          })
          // console.log(this.tableData, this.dates, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },
      handleSelectionChange(el) {
        // console.log(el, 222)
      },
      // 获取删除sku
      select(selection, row) {
        this.delSkuList = selection.map(element =>
          element.sku_field
        ).join(',')
      },
      // 批量删除
      async delCheckList() {
        if (this.delSkuList.length < 1) {
          console.log(this.delArr)
          return this.$message({
            message: "请选择删除行",
            type: 'warning'
          })
        } else {
          delLists(this.delSkuList).then(response => {
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

            this.initData()
            // 处理错误...
          })
          console.log(this.delArr, 111)
        }
      },
      // 批量编辑
      changeList() {
        this.isCheck = true
        let arr = this.delSkuList.split(',')
        if (this.delSkuList.length < 1) {
          return this.$message({
            message: "请选择编辑行",
            type: 'warning'
          })
        } else {
          this.tableData.forEach(item => {
            if (arr.includes(item.sku_field)) {
              item.date.forEach(dateItem => {
                // 确保 dateItem 是一个对象
                if (typeof dateItem === 'object' && dateItem !== null) {
                  // 使用 this.$set 来确保 Vue 能够追踪到这个变化
                  this.$set(dateItem, 'isTrue', true)
                  console.log(dateItem)
                } else {
                  console.error('dateItem 不是一个对象或为 null', dateItem)
                }
              })
            }
          }
          )
          console.log(this.tableData) // 这里应该反映 dataItem 中 isTrue 的变化（如果它们是响应式的）
        }
      },
      // 取消编辑
      clearIscheck() {
        this.isCheck = false
      },
      // 保存编辑
      saveChange() {
        this.tableData.forEach(item => [

        ])
      },
      // 切换编辑
      selectOption(index) {
        this.selectedIndex = index
        this.selectedOption = this.options[index]
      },
      // 下载
      downloadExcel() {
        var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
        let fix = document.querySelector(".el-table__fixed-right")
        let wb
        if (fix) {
          //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
          wb = XLSX.utils.table_to_book(
            document.querySelector("#table_out").removeChild(fix),
            xlsxParam
          )
          document.querySelector("#table_out").appendChild(fix)
        } else {
          wb = XLSX.utils.table_to_book(
            document.querySelector("#table_out"),
            xlsxParam
          )
        }
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        })
        try {
          let fileName = this.$route.name + new Date().toISOString().replace(/:/g, '-') + '.xlsx'
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            fileName
          )
        } catch (e) {
          if (typeof console !== "undefined") {
          }
        }
        return wbout
      },
      // 新增
      addList() { },
      // 上传
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
          this.uploadShowDialog = false
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
        console.log(this.file.file, 'file', this.file)
        formData.append('file', this.file.file)
        if (!!this.file.file) {
          this.downloadLoading = this.$loading({
            lock: true,
            text: '数据上传中...',
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
