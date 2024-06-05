<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button @click="addLine()" style="margin-right: 10px"
          >增加</el-button
        >
        <el-select
          v-model="valueName"
          placeholder="请选择"
          style="width: 100px"
          clearable
          @change="slectChange(valueName)"
          @clear="clearTable"
        >
          <el-option
            v-for="item in tableData"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <el-input
          placeholder="请输入搜素内容"
          style="width: 200px; margin-left: 10px"
          v-model="searchInput"
          clearable
          @clear="clearTable"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            style="width: 50px"
            @click="clickSearch(searchInput)"
          ></el-button>
        </el-input>
        <el-date-picker
          style="width: 250px; margin-left: 10px"
          v-model="pickValue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="changePicker(pickValue)"
        >
        </el-date-picker>
        <el-button @click="clearTable()" style="margin: 10px">重置</el-button>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" ref="table">
        <el-table-column label="基本信息" align="center" fixed width="200">
          <el-table-column label="姓名" prop="name" fixed width="100">
          </el-table-column>
          <el-table-column label="品牌" prop="brand" fixed width="100">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="amount1" label="值1" fixed> </el-table-column>
        <el-table-column prop="amount2" label="值2" fixed> </el-table-column>
        <el-table-column label="日期" align="center">
          <el-table-column
            width="100"
            v-for="item in transfer"
            :key="item.day"
            :label="item.day"
            prop="brand"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.isEdit">{{ scope.row.brand }}</span>
              <input
                v-else
                type="text"
                v-model="scope.row.brand"
                :placeholder="scope.row.brand"
              />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="!scope.row.isEdit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              v-else
              @click="handleSave(scope.$index, scope.row)"
              >保存
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          brand: 'E',
          name: '王小虎E',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          brand: 'F',
          name: '王小虎F',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          brand: 'A',
          name: '王小虎A',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          brand: 'B',
          name: '王小虎B',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          brand: 'C',
          name: '王小虎C',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
      tableDataLine: [],
      // 日期
      date: '',
      year: '',
      month: '',
      day: '',
      current: '',
      transfer: '',
      dialogVisible: false,
      form: {},
      input: '',
      valueName: '',
      searchInput: '',
      pickValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '当前月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            const day = start.getDate() - 1
            start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '近一年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    // 模糊搜索
    searchInput: {
      immediate: true,
      handler(val) {
        this.tableData = this.tableData.filter(item => {
          return item.name.indexOf(val) !== -1 || item.brand.indexOf(val) !== -1
        })
      }
    }
  },
  computed: {},
  methods: {
    getDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      var startMonth = date.getMonth()
      var startTime = year + '-' + month + '-' + '01'
      var endTime = year + '-' + month + '-' + day
      this.date = [startTime, endTime]
      this.year = this.date[0].substring(0, 4)
      this.month = month.toString().replace(/\b(0+)/gi, "")
      this.start = this.date[0].substring(8, 10).replace(/\b(0+)/gi, "")
      this.end = this.date[1].substring(8, 10).replace(/\b(0+)/gi, "")
      console.log(this.date, startTime, endTime, startMonth, this.start, this.end)
      this.changeDate(this.year, startMonth, this.month, this.start, this.end)
    },
    // 截取展示时间段
    changeDate(year, startMonth, month, start, end) {
      var empty = []
      if (startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10 || startMonth == 12) {
        for (let i = 1; i <= 31; i++) {
          this.current = year + '-' + startMonth + '-' + i
          var emp = {
            day: this.current
          }
          empty.push(emp)
        }
      } else if (startMonth == 1 || startMonth == 4 || startMonth == 6 || startMonth == 9 || startMonth == 11) {
        for (let i = 1; i <= 30; i++) {
          this.current = year + '-' + startMonth + '-' + i
          var emp = {
            day: this.current
          }
          empty.push(emp)
        }
      } else {
        if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
          for (let i = 1; i <= 29; i++) {
            this.current = year + '-' + startMonth + '-' + i
            var emp = {
              day: this.current
            }
            empty.push(emp)
          }
        } else {
          for (let i = 1; i <= 28; i++) {
            this.current = year + '-' + startMonth + '-' + i
            var emp = {
              day: this.current
            }
            empty.push(emp)
          }
        }
      }
      for (var i = start; i <= end; i++) {
        this.current = year + '-' + month + '-' + i
        // var weekday = new Date(this.current).getDay()
        var text = ""
        var thisDay = String(i)
        var emp = {
          day: this.current,
          isEdit: false,
        }
        empty.push(emp)
      }
      this.transfer = empty
      // console.log(this.transfer, 'this.transfer')
    },
    addLine() {
      var newTable = {}
      this.tableData.forEach(item => {
        for (let [key, value] of Object.entries(item)) {
          console.log(key, value)
          newTable[key] = ''
        }
      })
      this.tableData.unshift(newTable)
    },
    // 编辑
    handleEdit(a, b) {
      this.tableData.forEach((item, index) => {
        if (b.id == item.id) {
          this.$set(item, 'isEdit', true)
        }
      })
    },
    // 保存
    handleSave(a, b) {
      console.log(b, '保存')
      b.isEdit = false
    },
    handleDelete(index, row) {
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
    slectChange(value) {
      this.tableData = this.tableData.filter(item => {
        console.log(value, item.name)
        if (item.name == value) { return item }
      })
      console.log(this.tableData)
    },
    clickSearch(value) {
      this.tableData = this.tableData.filter(item => {
        if (value == item.amount1) {
          return item
        }
      })
    },
    // 切换时间
    changePicker(pick) {
      var pickStarTime = pick[0].getFullYear() + '-' + (pick[0].getMonth() + 1) + '-' + pick[0].getDate()
      var pickEndTime = pick[1].getFullYear() + '-' + (pick[1].getMonth() + 1) + '-' + pick[1].getDate()
      console.log(pick ? pick[0] : '', '时间段', pick ? pick[0] : '', this.transfer, pickStarTime, pickEndTime)
      var starIndex = ''
      var endIndex = ''
      // 获取起始时间和结束时间索引
      this.transfer.forEach((item, index) => {
        if (item.day == pickStarTime) {
          starIndex = index
        } else if (item.day == pickEndTime) {
          endIndex = index
        }
        console.log(starIndex, endIndex)
      })
      this.transfer = this.transfer.slice(starIndex, endIndex + 1)
      console.log(this.transfer, 'this.transfer')
    },
    pickDate(a = new Date().getDate()) {
      this.transfer = this.transfer.slice(a, this.transfer.length)
      console.log(a, '1')
    },
    // 重置
    clearTable() {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
  },
  created() {
    this.getDate()
    this.pickDate()
    this.tableData = this.tableData.map(item => ({
      ...item, // 复制当前对象的所有属性
      isEdit: false // 添加isEdit属性并设置为false
    }))
  },
  mounted() { }
};
</script>
<style lang="scss" scoped>
</style>

