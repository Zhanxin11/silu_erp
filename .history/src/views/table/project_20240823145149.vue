<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button @click="addKey()">增加列</el-button>
        <el-button @click="addLine()" style="margin-right: 10px">增加行</el-button>
        <el-popover placement="bottom" title="隐藏" width="300" trigger="click" @show="showPopover">
          <el-checkbox-group v-model="checkColumns" @change="changeColomns">
            <el-checkbox v-for="(item, key) in tableColumns" :key="key" :label="item.label">
            </el-checkbox>
            <div v-for="(item, key) in tableColumns" :key="key">
              <el-checkbox v-for="(i, k) in item.children" :key="k" :label="i.label">
              </el-checkbox>
            </div>
          </el-checkbox-group>
          <el-button slot="reference">隐藏列</el-button>
        </el-popover>
      </el-row>
      <el-table :data="tableData" border :columns="tableColumns" show-summary style="width: 100%"
        @row-click="handleRowClick" ref="tableRef">
      
        <template v-for="item in tableColumns">
          <el-table-column v-if="showColumn(item.prop)" :key="item.label" :prop="item.prop" :label="item.label"
            align="center">
            <template v-for="i in item.children">
              <el-table-column v-show="showColumn1(i.prop)" :key="i.label" :prop="i.prop" sortabel :label="i.label"
                :filters="i.filters" :filter-method="filterMethod">
              </el-table-column>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="统计" align="'center">
          <template>
            <el-table-column label="利率">
              {{ profit }}
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="showLine(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="medium" @click="changeLine(scope.row)">
              编辑</el-button>
            <el-button v-if="checkPermission(['admin'])" style="color: brown" size="medium"
              @click="delLine(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加列 -->
      <el-dialog title="添加列" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="120px" :model="formLabel">
          <el-form-item label="选择2级表头">
            <el-select v-model="formLabel.line" placeholder="请选择添加位置">
              <el-option v-for="item in tableColumns" :key="item.label" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="属性">
            <el-input v-model="formLabel.text"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save(formLabel)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改or添加 -->
      <el-dialog :title="form.id ? '修改' : '添加'" :visible.sync="diaForm" width="30%">
        <el-form label-width="120px" :model="form">
          <el-form-item v-for="(value, key) in form" :label="key" :key="key" v-show="key !== 'form.id'">
            <el-input v-model="form[key]"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="diaForm = false">取 消</el-button>
          <el-button type="primary" @click="saveForm(form)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import checkPermission from '@/utils/permission'
  export default {
    name: 'ProjectTable',
    components: {},
    props: {},
    data() {
      return {
        tableData: [
          {
            id: '12987122',
            name: '王小虎E',
            amount1: '234',
            amount2: '3.2',
            amount3: 10
          }, {
            id: '12987123',
            name: '王小虎F',
            amount1: '165',
            amount2: '4.43',
            amount3: 12
          }, {
            id: '12987124',
            name: '王小虎A',
            amount1: '324',
            amount2: '1.9',
            amount3: 9
          }, {
            id: '12987125',
            name: '王小虎B',
            amount1: '621',
            amount2: '2.2',
            amount3: 17
          }, {
            id: '12987126',
            name: '王小虎C',
            amount1: '539',
            amount2: '4.1',
            amount3: 15
          }],
        tableColumns: [{
          label: '基本信息',
          prop: 'inform1',
          isChangeShow: true,
          children: [
            {
              label: 'id',
              prop: 'id',
              isChangeShow: true
            },
            {
              label: 'name',
              prop: 'name',
              isChangeShow: true
            }
          ]
        },
        {
          label: '数据1',
          prop: 'data1',
          isChangeShow: true,
          children: [
            {
              label: '数值1',
              prop: 'amount1',
              isChangeShow: true
            },
            {
              label: '数值2',
              prop: 'amount2',
              isChangeShow: true
            },
            {
              label: '数值3',
              prop: 'amount3',
              isChangeShow: true
            }
          ]
        },
        {
          label: '数据2',
          prop: 'data2',
          isChangeShow: true,
          children: [
            {
              label: '数值1',
              prop: 'amount1',
              isChangeShow: true
            },
            {
              label: '数值2',
              prop: 'amount2',
              isChangeShow: true
            },
            {
              label: '数值3',
              prop: 'amount3',
              isChangeShow: true
            }
          ]
        }
        ],
        dialogVisible: false,
        value: '',
        formLabel: {
          line: '',
          text: '',
        },
        form: {},
        diaForm: false,
        checkColumns: [],
        checkAll: false,
        customFilters: [
          { text: '自定义条件1', value: 'custom1' },
          { text: '自定义条件2', value: 'custom2' },
          // ... 其他自定义筛选条件
        ],
        dynamicValue: null,
      }
    },
    computed: {
      profit: function () {
        let argument = 0.21
        return argument.toFixed(2) * 100 + '%'
      }
    },
    created() {
      this.generateFilters()
    },
    mounted() { },
    methods: {
      checkPermission,
      addKey() {
        this.dialogVisible = true
        // console.log(this.tableColumns)
        this.tableColumns.forEach(item => {
          // console.log(item.label),
        })
      },
      // 添加行
      addLine(label) {
        this.diaForm = true
        // this.tableData.splice(0, 1)
        const line = this.tableData[0]
        // line.forEach(item => {
        //   item[value] = ''
        // })
        let lineObj = {}
        for (const [k, v] of Object.entries(line)) {
          // line.k[v] = ''
          lineObj[k] = ''
          console.log(k, v, lineObj)
        }
        this.form = lineObj
        console.log(this.form, line, 'addline')
      },
      // 保存列
      save(i) {
        this.formLabel = {}
        this.tableColumns.forEach(item => {
          if (item.label == i.line) {
            console.log(item, 'item')
            item.children.push({
              label: i.text,
              prop: 'amount' + (item.children.length + 1)
            })
            this.tableData.forEach(ins => {
              ins[i.text] = ''
              // console.log(ins)
            })
          }
        })
        console.log(i, this.tableData, this.tableColumns, 'this.tableData+this.tableColumns')
        this.dialogVisible = false
      },
      // 编辑行
      changeLine(a) {
        this.diaForm = true
        const formArray = []
        this.tableColumns.forEach(item => {
          // console.log(item.label, item, '一级表头')
          item.children.forEach(i => {
            // console.log(i.label, '二级表头')
            formArray.push(i.label)
          })
        })
        // console.log(formArray, a, 'arr+obj')
        // // for (const [k, v] of Object.entries(a)) {
        // //   console.log(k, v, '对象', formArray)
        // //   this.form[k] = v
        // // }
        // formArray.splice(0, 5).forEach(item => {
        //   for (let [k, v] of Object.entries(a)) {
        //     console.log(k, v, item, '对象', formArray)
        //     // k = item.labe
        //     this.form[k] = v
        //   }
        //   console.log(item, 'a.label')
        // })
        let ArrKey = Object.keys(a)
        let ArrValue = Object.values(a)
        let endFormArray = formArray.splice(0, ArrKey.length)
        // console.log(this.form, a, ArrValue, ArrKey, formArray, endFormArray, 'arr+obj')
        if (ArrValue.length == endFormArray.length) {
          let obj = {}
          for (let i = 0; i < endFormArray.length; i++) {
            obj[endFormArray[i]] = ArrValue[i] //将键和值配对并添加到对象中
          }
          this.form = obj
          console.log(obj)
        } else {
          console.error('两个数组的长度不相等，无法合并为对象。')
        }
      },
      // 查看
      showLine(a, b) {
        console.log(a, b)
      },
      // 保存修改or添加表格
      saveForm(a) {
        var aKey = []
        var itemKey = []
        var aValue = Object.values(a)
        var obj = {}
        if (a.id) {
          this.tableData.forEach((item, index, arr) => {
            if (item.id == a.id) {
              itemKey = Object.keys(item)
              aKey = Object.keys(a)
              itemKey.splice(aKey.length - 1, 1, 'amount' + (aKey.length - 2))
              console.log('amount' + (item.length + 1), 'itemk')
              console.log(a, aKey, itemKey, aKey.length, itemKey.length, aKey.length, 'a[key], item[key]1')
              for (let i = 0; i < itemKey.length; i++) {
                obj[itemKey[i]] = aValue[i] // 将键和值配对并添加到对象中
              }
              this.tableData.splice(index, 1, { ...obj })
            }
            console.log(this.tableData, '编辑')
          })
        } else if (a.name) {
          this.tableData.forEach((item, index, arr) => {
            itemKey = Object.keys(item)
            aKey = Object.keys(a)
            console.log(a, aKey, itemKey, 'a[key], item[key]2')
            for (let i = 0; i < itemKey.length; i++) {
              obj[itemKey[i]] = aValue[i] //将键和值配对并添加到对象中
            }
          })
          console.log(a, obj, itemKey, aValue, 'obj')
          this.tableData.unshift(obj)
        } else {
          this.$message({
            type: 'info',
            message: '请填写准确数值'
          })
        }
        this.diaForm = false
      },
      handleRowClick(a, b, c) {
        // console.log(a, b, c)
      },
      // 删除
      delLine(index, row) {
        this.$confirm(`你确定删除${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData = this.tableData.filter(item =>
            item.id != row.id
          )
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 切换显示标记
      changeColomns(val) {
        console.log(this.tableColumns.children, 'children')
        this.tableColumns.forEach(item => {
          item.isChangeShow = false
          console.log(item, val, '1')
        })
        val?.forEach(item => {
          const cur = this.tableColumns.find(i => i.label == item)
          console.log(cur, '2')
          cur.isChangeShow = true
        })
      },
      // 一级表头
      showColumn(currentColumn) {
        return this.tableColumns.find(item => item.prop == currentColumn).isChangeShow
      },
      // 二级表头
      showColumn1(currentColumn) {
        this.tableColumns.forEach(item => {
          if (item.children) {
            // console.log(item.children.find(i => i.prop == currentColumn), item.children, 'isChangeShow1')
            return item.children.find(i => { i.prop == currentColumn })
          }
        })
        // console.log(currentColumn, 'showColumn11111', this.checkColumns)
      },
      showPopover() {
        this.checkColumns = []
        this.tableColumns.forEach(item => {
          if (item.isChangeShow) {
            // console.log(item.isChangeShow, 'true')
            this.checkColumns.push(item.label)
          }
          // console.log(item.isChangeShow, 'false')
        })
      },
      generateFilters() {
        this.tableColumns.forEach(column => {
          if (column.children) {
            column.children.forEach(i => {
              console.log(i, 'data')
              const uniqueValues = [...new Set(this.tableData.map(item => {
                // 使用正确的属性名来获取值
                return item[i.prop]
              }))]
              i.filters = uniqueValues.map(value => ({ text: value, value }))
            })
          }
        })
      },
      filterMethod(value, row, column) {
        return row[column.property] === value
      },
    },
    watch: {
      tableColumns: {
        handler(newVal, oldVal) {
          console.log('tableColumns changed:', newVal, oldVal)
          // this.form = newVal
        },
        deep: true,
        immediate: true
      },
      tableData: {
        handler(newVal, oldVal) {
          console.log('tableData changed:', newVal, oldVal)
        },
        deep: true,
      },
    }
  }
</script>
<style lang="scss" scoped>
  ::v-deep .el-icon-arrow-down::before {
    position: absolute;
    font-family: iconfont !important;
    /* background-size: 1em; */
    content: url(../../assets/other/筛选-01.png);
    margin-top: 13px;
    margin: -14px 0 0 5px;
  }
</style>
