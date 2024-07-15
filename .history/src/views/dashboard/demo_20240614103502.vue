<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-select v-model="BusinesValue" multiple placeholder="请选择商号" filterable @change="selectPro(BusinesValue)">
          <el-option label="全选" value="全选" @blur="cl"></el-option>
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="padding: 0 10px" v-model="BusinesValue" multiple placeholder="请选择团队">
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="BusinesValue" multiple placeholder="请选择运营">
          <el-option v-for="item in BusinesOptions" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="padding: 0 10px" v-model="BusinesValue" multiple placeholder="请选择spu">
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-model="weekValue" type="week" format="yyyy 第 WW 周" placeholder="选择周">
        </el-date-picker>
        <el-date-picker type="months" style="margin: 0 10px;" v-model="monthsValues" placeholder="选择一个或多个日期">
        </el-date-picker>
        <el-date-picker type="dates" v-model="dateValues" placeholder="选择一个或多个日期">
        </el-date-picker>
      </el-row>
      <el-table style="width: 100%; height: 100%; margin-top: 20px" :data="tableData" border class="computed-table"
        :header-cell-style="headerCellStyle">
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
            {{ scope.row.values[index] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
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
        BusinesOptions: [
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
        parameters: ['订单量', '销售件数', '每单件数', 'GMV', '利润', '利润率', '固定占比', '促销占比', '退款占比', '仓储占比', '回款率', '有效sku计数', '单sku均销量', '发货目标', '年度目标', '发货目标完成率', '年度目标完成率', '平均在库数量', '平均在途数量', '平均在库周转天数', '平均在途周转天数', '总周转天数', '汇总'],
        times: []
      }
    },
    mounted() {
      this.getDate()
      // console.log(this.getDate(), this.times, 'shijian')
      this.tableData = this.generateTableData()
    },
    methods: {
      generateTableData() {
        const tableData = this.parameters.map(parameter => ({
          parameter: parameter,
          values: this.generateParameterValues()
        }))
        return tableData
      },
      generateParameterValues() {
        return Array.from({ length: 48 }, (_, i) =>
          Math.floor(Math.random() * 100)
        ) // 48个时间段，每30分钟一个
      },
      // generateTimeLabels() {
      //   const times = []
      //   var date = new Date()
      //   var year = date.getFullYear()
      //   var month = date.getMonth() + 1
      //   var day = date.getDate()
      //   var todayDateString = date.toISOString().split('T')[0] // 格式为 "YYYY-MM-DD"
      //   console.log(date, year, month, day, todayDateString)
      //   for (let hour = 0; hour < 24; hour++) {
      //     for (let minute = 0; minute < 60; minute += 30) {
      //       const time = `${hour.toString().padStart(2, '0')}:${minute
      //         .toString()
      //         .padStart(2, '0')}`
      //       times.push(time)
      //     }
      //   }
      //   return times
      // },
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
        // console.log(this.date, startTime, endTime, startMonth, this.start, this.end)
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
        // console.log(empty, 'empty')
        this.times = empty
      },
      // 对表头样式进行修改
      headerCellStyle({ column, columnIndex }) {
        if (columnIndex === 0 || columnIndex) {
          return { backgroundColor: '#eeeeee', color: '#999' }
        }
        return {} // 其他列使用默认样式
      },
      selectPro(value) {
        console.log(value)
      }
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
</style>
