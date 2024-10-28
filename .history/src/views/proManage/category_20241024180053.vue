<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-24 17:40:53
 * @FilePath: \vue-element-admin\src\views\proManage\proInformantion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="info" @click="addSpu">新增品类</el-button>
      <el-button @click="changeCat(1)">修改大类</el-button>
      <el-button @click="changeCat(2)">修改产品线</el-button>
      <el-button type="danger" @click="delSpuList">删除品类</el-button>
      <el-button type="primary" @click="downloadSpuToExcel">下载</el-button>
    </el-row>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="2"></el-col>
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="tableHeaderColor"
          v-loading="loadingSpu" @select="selectId">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="category" label="大类">
          </el-table-column>
          <el-table-column prop="category1" label="产品线">
          </el-table-column>
          <el-table-column prop="category2" label="细分品线">
          </el-table-column>
          <el-table-column prop="name" label="SPU">
          </el-table-column>
          <el-table-column prop='eidt' fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="changeCategory(scope.$index,scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-button @click="save('spuFromValues')" type="primary">确认</el-button>
        <el-button @click="cancel()" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialog-box" :title="level==1?'修改大类':'修改产品线'" width="34%" :visible.sync="changeDialog">
      <el-form :inline="true" label-width="80px" :model="catChangeValue" ref="catChangeValue" :rules="spuFromRules">
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
        <el-button @click="saveSpu('spuFromValues')" type="primary">确认修改</el-button>
        <el-button @click="cancelCat()" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getCatListApi, getCatSelectApi, postAddCatApi, delCatListApi } from '@/api/manage'
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
        spuFromRules: {
          category: [{ required: true, message: '大类必须输入', trigger: 'blur' },],
          category1: [{ required: false, message: '请输入品线', trigger: 'blur' },],
          category2: [{ required: false, validator: this.validateCategory2, trigger: 'blur' },],
          name: [{ required: false, validator: this.validateSpu, trigger: 'blur' },]
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
        let arr2 = []
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
        return arr2
      }
      ,
      spuValue() {
        let arr2 = []
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
        return arr2
      },
      // 筛选
      categoryFilter() {

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
        console.log(selection, row)
        this.delId = selection.map(element =>
          element.name
        )
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
        this.$refs[formName].validate(valid => {
          if (valid) {
            postAddCatApi(this.spuFromValues).then(response => {
              console.log('请求成功:', response)
              this.$message({
                message: "修改成功",
                type: 'success'
              })
              this.spuDialog = false
              this.initProData()
              this.proFormValues = {}
            })
          } else {
            alert('err')
          }
        })
      },
      downloadSpuToExcel() { },
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
          console.log(11, this.category1Value)
          this.catOptions = this.category1Value
        }
      },
      save() { },
      cancelCat() {
        this.changeDialog = false
        this.catOptions = {}
      },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      this.initData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
