<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-13 13:41:00
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-05-22 13:50:09
 * @FilePath: \v2-template\vue-element-admin\src\views\table\inventory.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addLine()"
          >添加</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit-outline"
          @click="changeLine()"
          >添加列</el-button
        >
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit"> {{ scope.row.name }}</span>
            <el-input
              v-else
              v-model="scope.row.name"
              :placeholder="scope.row.name"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit"> {{ scope.row.age }}</span>
            <el-input
              v-else
              v-model="scope.row.age"
              :placeholder="scope.row.age"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit"> {{ scope.row.number }}</span>
            <el-input
              v-else
              v-model="scope.row.number"
              :placeholder="scope.row.number"
            ></el-input>
          </template>
        </el-table-column>
        <span v-if="Object.keys(tableData[0]).length > 5">
          <el-table-column
            v-for="(item, key) in tableData"
            :prop="item.date"
            :label="item[date]"
            :key="key"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.isEdit">
                {{ scope.row.date }}{{ Object.keys(tableData[0]).lenght }}</span
              >
              <el-input
                v-else
                v-model="scope.row.date"
                :placeholder="scope.row.date"
              ></el-input>
            </template>
          </el-table-column>
        </span>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="!scope.row.isEdit"
              @click="changeEdits(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              v-else
              @click="saveLine(scope.$index, scope.row)"
              >保存</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="inDelete(scope.$index, scope.row)"
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
        { id: 1, name: '张三', age: 18, number: 20 },
        { id: 2, name: '李四', age: 28, number: 21 },
        { id: 3, name: '张三', age: 18, number: 22 },
        { id: 4, name: '李1', age: 28, number: 23 },
        { id: 5, name: '李2', age: 28, number: 24 },
      ],
    }
  },
  watch: {},
  computed: {
  },
  methods: {
    // 添加
    addLine() {
      console.log('adlin')
      this.tableData.forEach(item => {
      })
      this.tableData.push({})
    },
    // 编辑
    changeEdits(a, b) {
      this.tableData.forEach((item, index) => {
        if (b.id == item.id) {
          this.$set(item, 'isEdit', true)
          console.log(b.id, item.isEdit)
        }
      })
    },
    // 保存
    saveLine(a, b) {
      this.tableData.forEach(item => {
        if (item.id == b.id) {
          item.isEdit = false
        }
      })
    },
    // 删除行
    inDelete(index, row) {
      console.log(index, row.id)
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
    // 添加列
    changeLine() {
      this.tableData = this.tableData.map(item => ({
        ...item,
        date: '1'
      }))
      console.log('a', this.tableData, this.tableData[0].date == false)
    }
  },
  created() {
    var self = this;
    (function () {
      console.log(self.$route.meta.roles)
      self.$notify({
        title: '警告',
        message: '用户' + self.$route.meta.roles + "库存不足，仅剩" + self.tableData[0].number + "件",
        type: 'warning'
      })
    })(),
      // this.addIsEdit()
      this.tableData = this.tableData.map(item => ({
        ...item, // 复制当前对象的所有属性
        isEdit: false // 添加isEdit属性并设置为false
      }))
  },
  mounted() { }
}
</script>
<style lang="scss" scoped>
</style>
