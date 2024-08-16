<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-button type="danger" @click="delCheckList">批量删除</el-button>
      </el-row>
      <el-table style="width: 100%; height: 100%; margin-top: 20px" border :data="tableData"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="op_field" label="运营"></el-table-column>
        <el-table-column prop="sku_field" label="SKU"></el-table-column>
        <el-table-column prop="store_field" label="店铺"></el-table-column>
        <el-table-column v-for="(column, index) in dateColumns" :key="index" :label="column.label"
          :prop="column.prop"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getDemo1, delLists } from '@/api/demo'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        tableData: [],
        delArr: [],
        dateColumns: [],
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      processedTableData() {
        return this.tableData.map(item => ({
          ...item,
          dates: Object.keys(item.date).map(key => ({
            label: key,
            value: item.date[key]
          }))
        }))
      }
    },
    methods: {
      async initData() {
        // 假设getDemo1返回原始数据
        const data = await getDemo1(this.token)
        this.tableData = data
        this.processDateColumns()
      },
      processDateColumns() {
        const firstItem = this.processedTableData[0]
        if (firstItem && firstItem.dates) {
          this.dateColumns = firstItem.dates.map(date => ({
            label: date.label,
            prop: `date.${date.label}`
          }))
        }
      },
      handleSelectionChange(selection) {
        this.delArr = selection.map(item => item.id)
      },
      handleDelete(index, row) {
        // 这里可以添加更具体的删除逻辑，例如通过行索引或ID
        this.delArr.push(row.id)
        this.delCheckList()
      },
      async delCheckList() {
        if (this.delArr.length < 1) {
          this.$message({
            message: "请选择删除行",
            type: 'warning'
          })
          return
        }
      }
