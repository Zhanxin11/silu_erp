<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="info" @click="addSpu">新增品类</el-button>
      <el-button @click="changeCat(1)">修改大类</el-button>
      <!-- <el-button @click="changeCat(2)">修改产品线</el-button> -->
      <el-button type="danger" @click="delSpuList">删除品类</el-button>
      <el-button type="primary" @click="uploadSpuToExcel">上传</el-button>
      <el-button type="primary" @click="downloadSpuToExcel">下载</el-button>
      <el-button type="primary" @click="downloadToExcel">下载上传Execl模板示例</el-button>
    </el-row>
    <el-row>
      <!-- <el-col :span="6">
        <el-tree :data="dataTree" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => change(data)">
                修改
              </el-button>
              <el-button type="text" size="mini" @click="() => removeTree(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col> -->
      <el-col :span="24">
        <el-table id="table_out" :data="tableData" border style="width: 100%" :header-cell-style="tableHeaderColor"
          v-loading="loadingSpu" @selection-change="selectId">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="category" label="大类" :filters='categoryFilterValue' :filter-method="catfilter">
          </el-table-column>
          <el-table-column prop="category1" label="产品线" :filters='category1FilterValue' :filter-method="catfilter">
          </el-table-column>
          <el-table-column prop="category2" label="细分品线" :filters='category2FilterValue' :filter-method="catfilter">
          </el-table-column>
          <el-table-column prop="name" label="SPU" :filters='spuFilterValue' :filter-method="catfilter">
          </el-table-column>
          <el-table-column prop='eidt' fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="changeCategory(scope.$index,scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog class="dialog-box" :title="spuFromValues.id?'修改品类':'新增品类'" width="36%" :visible.sync="spuDialog">
      <el-form :inline="true" label-width="80px" :model="spuFromValues" ref="spuFromValues" :rules="spuFromRules">
        <el-form-item prop="category" label="大类">
          <el-select v-model="spuFromValues.category" filterable allow-create clearable :disabled="changeMin">
            <el-option v-for="(i,index) in categoryValue" :key="index" :label="i" :value="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="category1" label="产品线">
          <el-select v-model="spuFromValues.category1" placeholder="请输入" allow-create filterable collapse-tags clearable
            :disabled="changeMin">
            <el-option v-for="(item,index) in category1Value" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="category2" label="细分品线">
          <el-select v-model="spuFromValues.category2" placeholder="请输入" allow-create filterable collapse-tags clearable
            :disabled="changeMin">
            <el-option v-for="(item,index) in category2Value" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="spu">
          <el-select v-model="spuFromValues.name" placeholder="请输入" allow-create filterable collapse-tags clearable>
            <el-option v-for="(item,index) in spuValue" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="saveSpu('spuFromValues')" type="primary">确认</el-button>
        <el-button @click="cancel()" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog-box" :title="level==1?'修改大类':'修改产品线'" width="34%" :visible.sync="changeDialog">
      <el-form :inline="true" label-width="80px" :model="catChangeValue" ref="catChangeValue">
        <el-form-item prop="oldVal" :label="level==1?'大类:':'产品线:'">
          <el-select v-model="catChangeValue.oldVal" filterable>
            <el-option v-for="(i,index) in catOptions" :key="index" :label="i" :value="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="newVal" label="新值:">
          <el-input v-model="catChangeValue.newVal" placeholder="请输入需要修改的值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="save('catChangeValue')" type="primary">确认修改</el-button>
        <el-button @click="cancelCat()" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog-box" title="批量上传品类" width="25%" :visible.sync="uploadSpuDailog">
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
        <el-button @click="uploadSpuDailog = false" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getCatListApi, getCatSelectApi, postAddCatApi, delCatListApi, putChangeCatFatherApi, putChangeCatApi } from '@/api/manage'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        catSelectForm: [],
        spuDialog: false,
        loadingSpu: true,
        changeDialog: false,
        uploadSpuDailog: false,
        catChangeValue: {
          newVal: '',
          oldVal: ''
        },
        catOptions: [],
        level: '',
        spuFromValues: {
          category: '',
          category1: '',
          category2: '',
          name: ''
        },
        changeMin: false,
        delId: [],
        TreeData: [],
        spuFromRules: {
          category: [{ required: true, message: '大类必须输入', trigger: 'blur' },],
          category1: [{ required: true, message: '请输入品线', trigger: 'blur' },],
          category2: [{ required: true, validator: this.validateCategory2, trigger: 'blur' },],
          name: [{ required: true, validator: this.validateSpu, trigger: 'blur' },]
        },
        category1Filled: false,
        category2Filled: false,
        fileList: [],
      }
    },

    computed: {
      categoryValue() {
        let arr = []
        this.catSelectForm.map(i => {
          arr.push(i.category)
        })
        return arr
      },
      category1Value() {
        let arr = []
        this.catSelectForm.map(i => {
          if (i.childen) {
            i.childen.map(item => {
              arr.push(item.category1)
            })
          }
        })
        return arr
      },
      category2Value() {
        let categoryArr2 = []
        this.catSelectForm.map(i => {
          if (i.childen) {
            i.childen.map(item => {
              if (item.childen) {
                item.childen.map(k => {
                  categoryArr2.push(k.category2)
                })
              }
            })
          }
        })
        return categoryArr2
      }
      ,
      spuValue() {
        let spuArr = []
        this.catSelectForm.map(i => {
          if (i.childen) {
            i.childen.map(item => {
              if (item.childen) {
                item.childen.map(k => {
                  if (k.children) {
                    k.children.map(v => {
                      spuArr.push(v.spu)
                    })
                  }
                })
              }
            })
          }
        })
        return spuArr
      },
      // 筛选
      categoryFilterValue() {
        return this.catSelectForm.map((i) => ({
          text: i.category, value: i.category
        }))
      },
      category1FilterValue() {
        let categoryArr = []
        this.catSelectForm.map(i => {
          if (i.childen) {
            i.childen.map(item =>
              categoryArr.push({
                text: item.category1, value: item.category1
              }))
          }
        })
        const uniqueItems = categoryArr.filter((item, index, self) =>
          self.findIndex(t => t.value === item.value) === index
        )
        return uniqueItems
      },
      category2FilterValue() {
        let categoryArr2 = []
        this.catSelectForm.map(i => {
          if (i.childen) {
            i.childen.map(item => {
              if (item.childen) {
                item.childen.map(k => {
                  categoryArr2.push({
                    text: k.category2, value: k.category2
                  })
                })
              }
            })
          }
        })
        const uniqueItems = categoryArr2.filter((item, index, self) =>
          self.findIndex(t => t.value === item.value) === index
        )
        return uniqueItems
      },
      spuFilterValue() {
        let spuArr = []
        this.catSelectForm.map(i => {
          if (i.childen) {
            i.childen.map(item => {
              if (item.childen) {
                item.childen.map(k => {
                  if (k.children) {
                    k.children.map(v => {
                      spuArr.push({ text: v.spu, value: v.spu })
                    })
                  }
                })
              }
            })
          }
        })
        const uniqueItems = spuArr.filter((item, index, self) =>
          self.findIndex(t => t.value === item.value) === index
        )
        return uniqueItems
        // return spuArr
      },
    },
    watch: {
      'spuFromValues.category2'(a, b) {
        this.category1Filled = a !== ''
      },
      'spuFromValues.name'(a, b) {
        this.category2Filled = a !== ''
      }
    },
    methods: {
      async initData() {
        this.tableData = await getCatListApi()
        this.loadingSpu = false
        this.catSelectForm = await getCatSelectApi()

      },
      // 字段校验
      validateCategory2(rule, value, callback) {
        console.log(this.spuFromValues.category1, value, this.category1Filled)
        if (this.category1Filled) {
          if (!this.spuFromValues.category1) {
            return callback(new Error('请输入产品线'))
          } else if (!value.includes(this.spuFromValues.category1)) {
            return callback(new Error('请确认产品线和细分品线之间关联'))
          }
        }
        callback()
      },
      validateSpu(rule, value, callback) {
        if (this.category2Filled) {
          if (!this.spuFromValues.category2) {
            return callback(new Error('请输入细分品线'))
          } else if (!value.includes(this.spuFromValues.category2)) {
            return callback(new Error('请确认spu和细分品线之间关联'))
          }
        }
        callback()
      },
      addSpu() {
        this.spuDialog = true
        this.changeMin = false
      },
      selectId(selection, row) {
        console.log(selection, row, 111)
        this.delId = selection.map(element =>
          element.id
        )
        console.log(this.delId, 1)
      },
      handleSelectionChang(a) { console.log(a, 'a') },
      delSpuList() {
        console.log(this.delId)
        if (this.delId.length < 1) {
          return this.$message({
            message: "请选择需要删除的行",
            type: 'warning'
          })
        } else {
          delCatListApi(this.delId).then(response => {
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
      cancel() {
        this.spuDialog = false
        this.spuFromValues = {}
        this.category1Filled = false
        this.category2Filled = false
      },
      saveSpu(formName) {
        console.log(this.spuFromValues, 111)
        for (const key in this.spuFromValues) {
          const value = String(this.spuFromValues[key])
          this.spuFromValues[key] = value.replace(/^\s*|\s*$/g, '')
          console.log(this.spuFromValues[key])
        }
        console.log(this.spuFromValues, 111)
        if (this.spuFromValues.id) {
          this.$refs[formName].validate(valid => {
            let putValue =
            {
              spu: this.spuFromValues.name,
              id: this.spuFromValues.id
            }
            console.log(putValue, '杯套-纸-瓦楞纸')
            //   let putValue.spu = this.spuFromValues.spu
            // let putValue.id = this.spuFromValues.id
            if (valid) {
              putChangeCatApi(putValue).then(response => {
                console.log('修改成功:', response)
                this.$message({
                  message: "修改成功",
                  type: 'success'
                })
                this.spuDialog = false
                this.initData()
                this.proFormValues = {}
              })
            } else {
              alert('err')
            }
          })
        } else {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.spuFromValues.bulk_create = false
              postAddCatApi(this.spuFromValues).then(response => {
                console.log('请求成功:', response)
                this.$message({
                  message: "添加成功",
                  type: 'success'
                })
                this.spuDialog = false
                this.initData()
                this.proFormValues = {}
              })
            } else {
              alert('err')
            }
          })
        }
      },
      downloadSpuToExcel() {
        this.$refs.table_out = arguments
      },
      changeCategory(i, row) {
        this.spuDialog = true
        this.spuFromValues = row
        this.changeMin = true
        console.log(this.spuFromValues)
      },
      changeCat(value) {
        this.level = value
        this.changeDialog = true
        if (value == 1) {
          this.catOptions = this.catSelectForm.map(i => i.category)
        } else {
          this.catOptions = this.category1Value
        }
      },
      save() {
        putChangeCatFatherApi(this.catChangeValue).then(response => {
          console.log('请求成功:', response)
          this.$message({
            message: "修改大类成功",
            type: 'success'
          })
          this.changeDialog = false
          this.initData()
        })
      },
      cancelCat() {
        this.changeDialog = false
        this.catOptions = {}
      },
      change(a) {
        console.log(a)
      },
      removeTree(a, b) { console.log(a, b) },
      // 处理树形结构数据
      // changeTree(data) {
      //   console.log(this.catSelectForm, 1)
      //   return data.map(item => {
      //     let newNode = { label: item.category || item.category1 || item.category2, children: [] }
      //     if (item.childen && item.childen.length > 0) {
      //       newNode.children = changeTree(item.childen)
      //     } else if (item.children && item.children.length > 0) { // 处理嵌套的 children 字段
      //       newNode.children = item.children.map(child => ({
      //         label: child.category2 || child.spu,
      //         children: child.children ? changeTree(child.children) : []
      //       }))
      //     } else if (item.spu) { // 处理最底层的 spu 字段
      //       newNode.label = item.spu
      //     }
      //     return newNode
      //   })
      // },
      catfilter(value, row, column) {
        const property = column['property']
        this.filterValue = value
        this.filterKey = property
        return row[property] === value
      },
      // 批量上传
      uploadSpuToExcel() {
        this.uploadLoading = false
        this.fileList = []
        this.uploadSpuDailog = true
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
          postAddCatApi(formData).then(response => {
            console.log('请求成功:', response)
            this.$message({
              message: "上传成功,请查看上传数据",
              type: 'success'
            })
            // if ('http://121.41.171.227:8000/' + response.file_url) {
            //   let url = window.URL.createObjectURL('http://121.41.171.227:8000/' + response.file_url)
            //   window.open(url)
            // }
            // let fileUrl = 'http://192.168.5.174:8000/silu/' + response.file_url
            // window.location.href = fileUrl
            this.uploadSpuDailog = false
            this.downloadLoading.close()
            this.initData()

          }).catch(error => {
            this.$message({
              message: "上传失败",
              type: 'exception'
            })
            console.error('请求失败:', error, '1111')
            if (error.response) {
              console.error('状态码:', error.response.status)
            }
            this.uploadSpuDailog = false
            this.downloadLoading.close()
            this.initData()
            // 处理错误...
          })
        }
      },
      // downloadToExcel() { },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      this.initData()

    },
    mounted() {
    }
  };
</script>
<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .upload-demo {
    text-align: center;

    .border {
      border: 1px dotted #c0acac;
      text-align: center;
      align-items: center;

      .icon-center:before {
        line-height: 176px;
      }

      .el-icon-plus:before {
        font-size: 30px;
        width: 30px;
      }
    }

    .upload-tips {
      position: inherit;
    }
  }
</style>