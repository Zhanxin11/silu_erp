<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-row style="padding: 20px 0; text-align: center">
        <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
          <el-select
            v-model="listQuery.importance"
            placeholder="select"
            clearable
            style="width: 60%"
            class="filter-item"
          >
            <el-option
              v-for="item in importanceOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
          <el-select
            v-model="listQuery.importance"
            placeholder="select"
            clearable
            style="width: 60%"
            class="filter-item"
          >
            <el-option
              v-for="item in importanceOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
          <el-select
            v-model="listQuery.importance"
            placeholder="select"
            clearable
            style="width: 60%"
            class="filter-item"
          >
            <el-option
              v-for="item in importanceOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row> -->
      <el-row style="padding-bottom: 20px">
        <el-popover placement="left" trigger="click" class="popover" @show="showPopover">
          <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
            <!-- <el-checkbox v-model="checkAll" @change="checkAllChangeFn"
            >列展示</el-checkbox
          > -->
            <el-button type="text" @click="reset(true)">重置</el-button>
          </div>
          <el-divider />
          <el-checkbox-group v-model="checkColumns" @change="changeColumns">
            <el-checkbox v-for="(item, key) in columns" :key="key" :label="item.label" />
          </el-checkbox-group>
          <!-- <i class="el-icon-s-tools" slot="reference"></i> -->
          <el-button slot="reference" class="el-icon-s-tools">隐藏列</el-button>
        </el-popover>

        <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 250px" :clearable="false"
          :picker-options="pickerOptions" @change="changeData(searchDate)" />
        <!-- <el-input
          v-model="search"
          style="width: 200px; margin: 0 20px"
          placeholder="输入关键字搜索"
        /> -->
        <el-input v-model="search" placeholder="请输入搜索内容" class="input-with-select" style="width: 200px; margin: 0 20px">
          <el-button slot="append" icon="el-icon-search" style="margin: 0; padding: 0" @click="searchInput()" />
        </el-input>
        <el-select v-model="tableName" clearable placeholder="请选择" @change="getName($event)">
          <el-option v-for="item in tableData" :key="item.name" :label="item.name" :value="item.name" />
        </el-select>
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd()">添加</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="reset(true)">重置</el-button>
      </el-row>
      <el-table ref="table" :data="tableData" height="100%" border style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }">
        <!-- <el-table-column prop="date" sortable label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column> -->
        <template v-for="item in columns">
          <el-table-column v-if="showColumn(item.prop)" :key="item.label" :prop="item.prop" :label="item.label" />
        </template>
        <el-table-column prop="edit" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改表格 -->
    <el-dialog :title="form.id ? '修改' : '添加'" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-input v-model="form.date" autocomplete="off" />
          <!-- <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker> -->
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { getUser } from '@/api/table'
  export default {
    name: 'Tables',
    components: {},
    props: {},
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        dialogFormVisible: false,
        tableData: [{
          id: 1,
          date: '2024-04-01',
          name: '王小虎A',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2024-03-31',
          name: '王小虎B',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 3,
          date: '2024-03-30',
          name: '王小虎C',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 4,
          date: '2024-03-29',
          name: '王小虎D',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 5,
          date: '2024-03-28',
          name: '王小虎E',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 6,
          date: '2024-03-27',
          name: '王小虎F',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 7,
          date: '2024-04-02',
          name: '王小虎G',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        columns: [
          { label: '日期', prop: 'date', isShow: true },
          { label: '姓名', prop: 'name', isShow: true },
          { label: '地址', prop: 'address', isShow: true }
        ],
        checkColumns: [],
        checkAll: false,
        form: {
          id: '',
          date: '',
          name: '',
          address: ''
        },
        formLabelWidth: '120px',
        search: '',
        searchDate: '',
        pickerOptions: {
          disabledDate: (time) => {
            const currentDate = new Date()
            return time.getTime() > currentDate.getTime()
          }
        },
        tableName: ''
      }
    },
    computed: {
      // searchInput: () => {
      //   if (this.search) {
      //     return this.tableData.filter(item => {
      //       return (
      //         item.date.includes(this.search) ||
      //         item.name.includes(this.search)
      //       )
      //       console.log(item, "search")
      //     })
      //   } else {
      //     return this.tableData
      //   }
      // },
    },
    watch: {
    },
    created() {
      // getUser()
    },
    mounted() { },
    methods: {
      // 修改
      handleEdit(index, row) {
        this.dialogFormVisible = true
        // this.form.date = row.date
        this.form = { ...row }
        // console.log(index, row, this.form, this.form.date)
      },
      // 添加
      handleAdd() {
        this.dialogFormVisible = true
        this.form = {
          id: '',
          date: '',
          name: '',
          address: ''
        }
      },
      // 删除
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
      // 保存
      save(a) {
        if (a.id) {
          this.tableData.forEach((item, index, arr) => {
            console.log(item.id)
            if (item.id == a.id) {
              this.tableData.splice(index, 1, { ...a })
              console.log(this.tableData[index], a, 111)
            }
          })
        } else {
          this.tableData.unshift(a)
          console.log(this.tableData)
        }
        console.log(this.tableData, 'newTabledata')
        this.dialogFormVisible = false
      },
      // 判断是否显示
      // 全选复选框事件监听
      // checkAllChangeFn(val) {
      //   if (val) {
      //     // 全选
      //     this.reset(true)
      //   } else {
      //     // 反全选
      //     this.reset(false)
      //   }
      // },
      // 重置，flag: Boolean，全部重置为flag
      reset(flag) {
        this.columns.forEach(item => {
          item.isShow = flag
        })
        this.showPopover()
        this.refreshTable()
      },
      // 表格列是否显示的方法
      showColumn(currentColumn) {
        return this.columns.find(item => item.prop == currentColumn).isShow
      },
      /* 选择列 */
      changeColumns(val) {
        this.columns.forEach(item => {
          item.isShow = false
        })
        // columns将val数组存在的值设为true，不存在的设为false
        val?.forEach(item => {
          const current = this.columns.find(i => i.label == item)
          current.isShow = true
        })
        // 判断是否全选
        this.judgeIsCheckAll()
        this.refreshTable()
      },
      // 重新渲染表格
      refreshTable() {
        this.$nextTick(() => {
          this.$refs.table.doLayout()
        })
      },
      // 气泡框出现
      showPopover() {
        this.checkColumns = []
        this.columns.forEach(item => {
          if (item.isShow) {
            this.checkColumns.push(item.label)
          }
        })
        // 判断是否全选
        this.judgeIsCheckAll()
      },
      // 判断是否全选
      // judgeIsCheckAll() {
      //   // 选中的长度 = 表格列的长度  全选按钮就选中
      //   if (this.checkColumns.length == this.columns.length) { this.checkAll = true } else { this.checkAll = false }
      // },
      changeData(dateRange) {
        console.log(dateRange[0], dateRange[1])
        // 确保传入的日期字符串是有效的
        const startDate = new Date(dateRange[0])
        const endDate = new Date(dateRange[1])
        // 如果日期无效，则不执行过滤操作
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error('Invalid date range provided')
          return
        }
        // 包含当天
        endDate.setDate(endDate.getDate() + 1)
        endDate.setHours(0, 0, 0, 0)
        // 过滤表格数据
        this.tableData = this.tableData.filter(item => {
          const itemDate = new Date(item.date)
          // 判断日期有效
          if (isNaN(itemDate.getTime())) {
            return false
          }
          return itemDate >= startDate && itemDate < endDate
        })
      },
      searchInput() {
        const tableList = this.tableData
        if (this.tableData.length != tableList.length) {
          return this.tableData = tableList
        }
        this.tableData = tableList.filter(
          (item) =>
            !this.search || item.name.includes(this.search) || item.date.includes(this.search)
        )
        console.log(this.tableData)
      },
      getName(a) {
        const selectTable = this.tableData
        console.log(selectTable, 'selectTable1')
        if (a) {
          this.tableData = this.tableData.filter(item => {
            console.log(item.name, 'item.name')
            return item.name == a
          })
        } else {
          console.log(selectTable, 'selectTable')
          return this.tableData = selectTable
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .filter-container .filter-item {
    margin: 0;
  }

  .el-button+.el-button {
    margin: 0;
  }

  /* .el-input {
  width: 170px;
} */
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  @media only screen and (min-width: 1180px) {
    .el-button {
      margin: 0 20px;
    }
  }
</style>
