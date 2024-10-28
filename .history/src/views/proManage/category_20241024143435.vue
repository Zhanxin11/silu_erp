<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-24 14:31:15
 * @FilePath: \vue-element-admin\src\views\proManage\proInformantion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="info" @click="addSpu">新增品类</el-button>
      <el-button type="danger" @click="delSpuList">删除品类</el-button>
      <el-button type="primary" @click="downloadSpuToExcel">下载</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="tableHeaderColor" v-loading="loadingSpu">
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
    <el-dialog class="dialog-box" title="新增品类" width="36%" :visible.sync="spuDialog">
      <el-form :inline="true" label-width="80px" :model="spuFromValues" ref="spuFromValues" :rules="spuFromRules">
        <el-form-item prop="category" label="大类" clearable>
          <el-select v-model="spuFromValues.category" filterable allow-create>
            <el-option v-for="(i,index) in catSelectForm" :key="index" :label="i.category" :value="i.category">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="category1" label="产品线" filterable allow-create>
          <el-select v-model="spuFromValues.category1" placeholder="请输入" filterable collapse-tags clearable>
            <el-option v-for="(item,index) in category1Value" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="category2" label="细分品线" filterable allow-create>
          <el-select v-model="spuFromValues.category2" placeholder="请输入" filterable collapse-tags clearable>
            <el-option v-for="(item,index) in category2Value" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="spu" label="细分品线" filterable allow-create>
          <el-select v-model="spuFromValues.spu" placeholder="请输入" filterable collapse-tags clearable>
            <el-option v-for="(item,index) in spuValue" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="saveSpu('spuFromValues')" type="primary">确认</el-button>
        <el-button @click="spuDialog = false" class="cancelDialog">
          取消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getCatListApi, getCatSelectApi } from '@/api/manage'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        catSelectForm: [],
        spuDialog: false,
        loadingSpu: true,
        spuFromValues: {
          category: '',
          category1: '',
          category2: '',
          spu: ''
        },
        spuFromRules: {
          category: [{ required: true, message: '大类必须输入', trigger: 'blur' },],
          category1: [{ required: false, message: '请输入品线', trigger: 'blur' },],
          category2: [{ required: false, validator: this.validateCategory2, trigger: 'blur' },],
          spu: [{ required: false, validator: this.validateSpu, trigger: 'blur' },]
        },
        category1Filled: false,
        category2Filled: false,
      }
    },

    computed: {
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
      // categroyFormRules() {
      //   let rules = { ...this.spuFormRules }
      //   console.log(this.category1Filled)
      //   if (this.category1Filled) {
      //     console.log(rules.category1[0], 1111)
      //     rules.category1[0].required = true
      //     rules.category1[0].message = '填写细分品线后，品类为必填'
      //   }
      //   return rules
      // }
    },
    watch: {
      'spuFromValues.category2'(a, b) {
        this.category1Filled = a !== ''
      },
      'spuFromValues.spu'(a, b) {
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
        console.log(this.spuFromValues.category1)
        if (this.spuFromValues.category1) {
          return callback(new Error('请输入父级'))
        }
        callback()
      },
      addSpu() {
        this.spuDialog = true
      },
      delSpuList() { },
      saveSpu(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert('scuss')
          } else {
            alert('err')
          }
        })
      },
      downloadSpuToExcel() { },
      changeCategory() { },
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