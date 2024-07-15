<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-06-24 15:18:30
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-select v-model="BusinesValue" multiple placeholder="请选择商号">
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="padding: 0 10px" v-model="BusinesValue" multiple placeholder="请选择团队">
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="BusinesValue" multiple placeholder="请选择运营">
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="padding: 0 10px" v-model="BusinesValue" multiple placeholder="请选择spu">
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-model="weekValue" type="week" format="yyyy 第 WW 周" placeholder="选择周">
        </el-date-picker>
        <el-date-picker type="months" style="margin: 0 10px" v-model="monthsValue" placeholder="选择一个或多个月">
        </el-date-picker>
        <el-date-picker type="dates" v-model="dateValues" placeholder="选择一个或多个日期">
        </el-date-picker>
      </el-row>
      <!-- <el-table
        :data="busTableData"
        height="100%"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column label="日期" align="right" width="150">
          <el-table-column prop="name" label="数据" width="150">
          </el-table-column>
        </el-table-column>
        <el-table-column
          v-for="(item, key) in busTableData"
          :key="key"
          :label="item.date"
          :prop="item.prop"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="name" label="表头" width="150"></el-table-column>
      </el-table> -->
      <el-table style="width: 100%; height: 100%; margin-top: 20px" border :data="tableData" :show-header="false"
        @render-header="renderTable(a, { b, c })">
        <!-- <el-table-column v-for="(item, index) in getHeaders" :key="index"
          @cell-mouse-enter="hoverTable(row, column, cell, event)">
          <template>{{ item }}</template>
        </el-table-column> -->
        <el-table-column prop="spu" label="spu" sortable width="180"></ </el-table>
    </div>
  </div>
</template>

<script>
  import { getDemo } from '@/api/demo'
  export default {

    components: {},
    props: {},
    data() {
      return {
        tableData: []
      }
    },
    watch: {},
    computed: {
      // columnDataList(){}
      getHeaders() {
        return this.busTableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
      },
      getValues() {
        return this.columnDataList.map(item => {
          return this.busTableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { 'title': item.label, })
        })
      }
    },
    methods: {
      async initData() {
        try {
          const tableData = await getDemo()
          console.log(res, 'cs')
        } catch (err) {
          console.log('获取用户分布信息失败', err)
        }
      },
      renderTable(h, { column, $index }) {
        console.log(h)
      },
      hoverTable(row, column, cell, event) {
        console.log(row, column, cell, event)
      }

    },
    created() {
      this.initData()
      // this.changeDateList()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>