<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-select v-model="BusinesValue" class="select-Bus" multiple placeholder="请选择商号(必选)" filterable collapse-tags
          @change="selectPro" @remove-tag="removeTag">
          <el-option label="全选" value="全选" @click.native="selectAll">全选</el-option>
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="padding: 0 10px" v-model="teamValues" multiple collapse-tags filterable placeholder="请选择团队">
          <el-option v-for="item in teamOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="OperationValues" multiple filterable collapse-tags placeholder="请选择运营">
          <el-option v-for="item in Operations" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="padding: 0 10px" v-model="spuValues" multiple filterable placeholder="请选择spu">
          <el-option v-for="item in spuOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-model="weekValue" type="week" format="yyyy 第 WW 周" placeholder="选择周">
        </el-date-picker>
        <el-date-picker style="margin: 0 10px" type="months" v-model="monthsValues" placeholder="选择一个或多个日期">
        </el-date-picker>
        <el-date-picker type="dates" v-model="dateValues" placeholder="选择一个或多个日期">
        </el-date-picker>
      </el-row>
      <el-table style="width: 100%; height: 100%; margin-top: 20px" :data="tableData" border class="computed-table"
        :header-cell-style="headerCellStyle" :cell-class-name="tableCellClassName" :cell-style="setStyle"
        @cell-click="cellClick">
        <!-- 横向时间表头 -->
        <el-table-column prop="parameter" label="时间" width="200" align="center" fixed highlight-current-row>
          <el-table-column prop="parameter" label="参数" align="center" width="200" fixed
            style="background-color: aliceblue">
          </el-table-column>
        </el-table-column>
        <!-- 纵向参数名表头 -->
        <el-table-column v-for="(time, index) in times" :key="index" :label="time" :header-row-style="headerCellStyle"
          align="center" width="100">
          <template slot-scope="scope">
            <span class="inner_span" :style="classObje(scope.row.values[index].value,scope.$index)"
              @click="changeValue(scope.$index,scope.row)" v-if="!scope.row.values[index].isCheck"> {{
              scope.row.values[index].value}}</span>
            <el-input v-else ref="inputs" @keydown.enter.native="handeBlur(scope.row, index)"
              v-model="scope.row.values[index].value"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="汇总" prop='sum' width="150" align="center">
          <template slot-scope="scope">
            <div :id="'main_'+scope.row.sum" style="width:70%;height:30px;margin: 0 auto;">{{scope.row.sum}}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button v-show="scope.row.parameter!='GMV'" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import *as echarts from 'echarts'
  export default {
    data() {
      return {
        tableData: [],
        BusinesValue: [],
        weekValue: '',
        monthsValues: '',
        dateValues: '',
        date: '',
        year: '',
        month: '',
        day: '',
        current: '',
        checkedAll: false,
        timeLength: [],
        visible: false,
        stateList: [],
        BusinesOptions: [
          {
            value: '选项1',
            label: '001'
          },
          {
            value: '选项2',
            label: '002'
          },
          {
            value: '选项3',
            label: '003'
          },
          {
            value: '选项4',
            label: '004'
          },
        ],
        teamValues: '',
        teamOptions: [
          {
            value: '选项1',
            label: 'bg1'
          },
          {
            value: '选项2',
            label: 'bg2'
          },
          {
            value: '选项3',
            label: 'bg3'
          },
          {
            value: '选项4',
            label: 'bg4'
          },
        ],
        OperationValues: '',
        Operations: [
          {
            value: '选项1',
            label: 'a'
          },
          {
            value: '选项2',
            label: 'b'
          },
          {
            value: '选项3',
            label: 'c'
          },
          {
            value: '选项4',
            label: 'd'
          },
        ],
        spuValues: '',
        spuOptions: [
          {
            value: '选项1',
            label: 'spu1'
          },
          {
            value: '选项2',
            label: 'spu2'
          },
          {
            value: '选项3',
            label: 'spu3'
          },
          {
            value: '选项4',
            label: 'spu4'
          },
        ],
        parameters: ['订单量', '销售件数', '每单件数', 'GMV', '利润', '利润率', '固定占比', '促销占比', '退款占比', '仓储占比', '回款率', '有效sku计数', '单sku均销量', '发货目标', '年度目标', '发货目标完成率', '年度目标完成率', '平均在库数量', '平均在途数量', '平均在库周转天数', '平均在途周转天数', '总周转天数'],
        times: [],
      }
    },
    // created() {
    //   this.tableData = this.generateTableData()
    // },
    mounted() {
      this.getDate()
      this.tableData = this.generateTableData()
      this.addTrue()
      this.initEcharts()
    },
    methods: {
      generateTableData() {
        const tableData = this.parameters.map(parameter => ({
          parameter: parameter,
          values: this.generateParameterValues()
        }
        ))
        return tableData
      },
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
        this.changeDate(this.year, startMonth, this.month, this.start, this.end)
      },
      // 截取展示时间段
      changeDate(year, startMonth, month, start, end) {
        var empty = []
        if (startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10 || startMonth == 12) {
          for (let i = 1; i <= 31; i++) {
            this.current = year + '-' + startMonth + '-' + i
            empty.push(this.current)
          }
        } else if (startMonth == 1 || startMonth == 4 || startMonth == 6 || startMonth == 9 || startMonth == 11) {
          for (let i = 1; i <= 30; i++) {
            this.current = year + '-' + startMonth + '-' + i
            empty.push(this.current)
          }
        } else {
          if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
            for (let i = 1; i <= 29; i++) {
              this.current = year + '-' + startMonth + '-' + i
              empty.push(this.current)
            }
          } else {
            for (let i = 1; i <= 28; i++) {
              this.current = year + '-' + startMonth + '-' + i
              empty.push(this.current)
            }
          }
        }
        for (var i = start; i <= end; i++) {
          this.current = year + '-' + month + '-' + i
          empty.push(this.current)
        }
        this.times = empty
      },
      generateParameterValues() {
        return Array.from({ length: this.times.length }, (_, i) =>
          Math.floor(Math.random() * 100)
        )
      },
      // 对表头样式进行修改
      headerCellStyle({ column, columnIndex }) {
        if (columnIndex === 0 || columnIndex) {
          return { backgroundColor: '#eeeeee', color: '#999' }
        }
        return {} // 其他列使用默认样式
      },
      // 商号全选
      selectAll() {
        if (this.BusinesValue.length < this.BusinesOptions.length) {
          this.BusinesValue = []
          this.BusinesOptions.map((item) => {
            this.BusinesValue.push(item.value)
          })
          this.BusinesValue.unshift('全选')
        } else {
          this.BusinesValue = []
        }
      },
      // 商号下拉
      selectPro(val) {
        if (!val.includes('全选') && val.length === this.BusinesOptions.length) {
          if (!this.BusinesValue.includes('全选')) {
            this.BusinesValue.unshift('全选')
          }
        } else if (this.BusinesValue.includes('全选') && val.length !== this.BusinesOptions.length) {
          this.BusinesValue = this.BusinesValue.filter((item) => {
            return item !== '全选'
          })
        } else if (this.BusinesValue.includes('全选') && val.length < this.BusinesOptions.length + 1) {
          this.BusinesValue = this.BusinesValue.filter((item) => {
            return item !== '全选'
          })
        }
      },
      // 删除tag
      removeTag(val) {
        if (val === '全选') {
          this.BusinesValue = []
        }
      },

      // 获取单元格索引
      cellClick(row, column, cell, event) {
        // console.log(row.index, column.index, '索引')
        this.tableData.forEach(item => {
          if (item.index == row.index) {
            item.values = item.values.map((i, k) => {
              // console.log((k - 1) == column.index, '确定行')
              if ((k + 1) === column.index) {
                i.isCheck = true
                const inputRef = `input-${row.index}-${column.index}`
                // console.log(inputRef)
                this.$nextTick(() => {
                  if (this.$refs[inputRef]) {
                    this.$refs[inputRef].focus()
                  }
                })
              }
              return i
            })
          }
        })
      },
      // 失焦保存
      handeBlur(row, index) {
        // console.log(row, index, '失焦')
        row.values[index].isCheck = false
        // console.log(row, '失焦')
      },
      //  添加单元格类名
      tableCellClassName({ row, column, rowIndex, columnIndex }) {
        row.index = rowIndex
        column.index = columnIndex
        // if (columnIndex === 0 && columnIndex === 1) {
        //   console.log(row, 'status-on')
        //   return 'status-on'
        // }
      },
      // 设置单元格样式
      setStyle({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          // console.log(row, column, rowIndex, 'row')
          row.values.map((item) => {
            if (item.value >= 50) {
              // console.log(item.value, 'background1')
              return 'background: pink !important;color:white'
            }
          })
        }
      },
      // 添加标记
      addTrue() {
        this.tableData.map(item => {
          item.values = item.values.map(i => {
            return {
              value: i,
              isCheck: false
            }
          })
        })
      },
      // 修改value
      changeValue(index, row) {
        console.log(index, row.values, 'chenge', new Date())
      },
      // 添加图表
      initEcharts() {
        this.stateList = this.tableData.map(item => {
          return item.values.map(i => {
            return i.value
          })
        })
        this.tableData.map((item, index) => {
          item.sum = this.stateList.map((i, lab) => {
          re  i[lab]
            console.log(i[0], i[1])
          })
          console.log(item, this.stateList, 'item')
        })
        this.$nextTick(function () {
          console.log(this.stateList.length)
          for (let i = 0; i < this.stateList.length; i++) {
            let myChart = echarts.init(document.getElementById("main_" + this.tableData[i].parameter))
            // console.log(myChart, 111, this.tableData)
            // 绘制图表
            myChart.setOption({
              xAxis: {
                show: false, //取消显示坐标轴,坐标轴刻度, 坐标值(如果是y轴,默认的网格线也会取消显示)
                type: 'category',
                boundaryGap: false,
                splitLine: {
                  show: false
                },
                data: []
              },
              grid: {
                left: "0",
                top: "0",
                right: "0",
                bottom: "0",
                containLabel: true,
              },
              yAxis: {
                axisLabel: { // 取消显示坐标值
                  show: false
                },
                splitLine: { //取消网格线
                  show: false
                },
                type: 'value'
              },
              series: [
                {
                  symbol: "none",
                  smooth: true,//平滑
                  type: "line",
                  data: this.tableData[i].sum,
                  areaStyle: {}
                }
              ]
            })
            console.log(this.stateList, 10, this)
            window.onresize = function () { // 自适应大小
              myChart.resize()
            }
          }
        })
      },
    },
    computed: {
      classObje(value, index) {
        // console.log(index, value)
        return (value) => {
          if (value >= 50) {
            return { background: '#333', color: "red" }
          } else if (value === 0) {
            return { color: "#000000" }
          } else if (value > 0) {
            return { color: "#369" }
          }
        }
      },
    }
  }
</script>
<style lang="scss">
  .el-table {
    &.computed-table {
      thead.is-group th {
        background: none;
        padding: 0px;
      }

      thead.is-group tr:first-of-type th:first-of-type,
      thead.is-group tr:last-of-type th:first-of-type {
        background: #fff !important;
      }

      thead.is-group tr:first-of-type th:first-of-type {
        border-bottom: none;
      }

      thead.is-group tr:first-of-type th:first-of-type div.cell {
        text-align: right;
      }

      thead.is-group tr:last-of-type th:first-of-type div.cell {
        text-align: left;
      }

      thead.is-group tr:first-of-type th:first-of-type:before {
        content: "";
        position: absolute;
        width: 1px;
        height: 102px;
        top: 0;
        left: 0;
        background-color: #a42626;
        display: block;
        transform: rotate(-77deg);
        -webkit-transform-origin: top;
        transform-origin: top;
      }

      thead.is-group tr:last-of-type th:first-of-type:before {
        content: "";
        position: absolute;
        width: 1px;
        height: 102px;
        bottom: 0;
        right: 0;
        background-color: #db2525;
        display: block;
        transform: rotate(-77deg);
        -webkit-transform-origin: bottom;
        transform-origin: bottom;
        z-index: inherit;
      }
    }

    td.el-table_1_column_1_column_2.is-center {
      background: #eeeeee;
      color: #634b4b;
      font-weight: 700;
    }

    .is-group .cell:first-child {
      background-color: #eeeeee;
    }
  }

  .select-Bus .el-input__inner::placeholder {
    color: rgb(195, 51, 51);
  }

  .inner_span {
    padding: 15px 30px;
  }
</style>
