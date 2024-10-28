<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-25 16:40:26
 * @FilePath: \vue-element-admin\src\views\proManage\proInformantion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="info" @click="addSpu">新增品类</el-button>
      <el-button @click="changeCat(1)">修改大类</el-button>
      <!-- <el-button @click="changeCat(2)">修改产品线</el-button> -->
      <el-button type="danger" @click="delSpuList">删除品类</el-button>
      <el-button type="primary" @click="downloadSpuToExcel">下载</el-button>
      <el-button type="primary" @click="uploadSpuToExcel">上传</el-button>
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
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="tableHeaderColor"
          v-loading="loadingSpu" @select="selectId">
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
          <el-select v-model="spuFromValues.category2" placeholder="请输入" allow-create filterable collapse-tags
            clearable>
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
          <el-select v-model="catChangeValue.oldVal" filterable allow-create clearable>
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
  </div>
</template>
<script>
  import { getCatListApi, getCatSelectApi, postAddCatApi, delCatListApi, putChangeCatFatherApi } from '@/api/manage'
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
                  arr2.push(k.category2)
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
                      arr2.push(v.spu)
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
        let arr = []
        this.catSelectForm.map(i => {
          if (i.childen) {
            i.childen.map(item =>
              arr.push({
                text: item.category1, value: item.category1
              }))
          }
        })
        return arr
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
        return categoryArr2
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
                      arr2.push({ text: v.spu, value: v.spu })
                    })
                  }
                })
              }
            })
          }
        })
        return spuArr
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
        console.log(this.delId)
      },
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
        for (const key in this.spuFromValues) {

          this.spuFromValues[key] = this.spuFromValues[key].replace(/^\s*|\s*$/g, '')
          console.log(this.spuFromValues[key])
        }

        console.log(this.spuFromValues)
        this.$refs[formName].validate(valid => {
          if (valid) {
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
      },
      downloadSpuToExcel() { },
      uploadSpuToExcel() { },
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
</style>