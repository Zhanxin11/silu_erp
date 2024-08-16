<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-08 16:43:36
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-button type="danger" @click="delCheckList">批量删除</el-button>
      </el-row>
      <el-table style="width: 100%; height: 100%; margin-top: 20px" border :data="tableData" id="table"
        @selection-change="handleSelectionChange" @select="select">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="op_field" label="运营"></el-table-column>
        <el-table-column prop="sku_field" label="SKU"></el-table-column>
        <el-table-column prop="store_field" label="店铺"></el-table-column>
        <el-table-column prop="2024-06-24" label="2024-06-24"></el-table-column>
        <!-- <el-table-column prop="date" :key="index" :label="item">
        </el-table-column> -->
        <el-table-column v-for="(item, index) in tableData" :key="index" :label="item">

        </el-table-column>
        <!-- <el-table-column v-for="date in dates" :key="date" :label="date" :prop="`date.${date}`">
          <template slot-scope="scope">
            <span>{{ scope.row.date[date] || '-' }}</span>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" prop="edit" label="操作" width='150'>
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
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
    components: {},
    props: {},
    data() {
      return {
        rowTableData: [],
        tableData: [],
        delArr: [],
        dates: {},
        dateColumns: []
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    methods: {
      // 初始化数据Date
      changeTableData(obj) {
        const keys = Object.keys(obj) // 获取对象的所有键
        const newObj = {} // 创建一个新对象来存放结果
        for (let i = 4; i < keys.length; i++) {
          const key = keys[i]
          newObj[key] = obj[key]
        }
        return newObj
      },
      async initData() {
        const token = this.token
        if (!token) {
          console.log('Token is not available')
          return
        }
        try {
          this.tableData1 = await getDemo1(token)
          this.tableData.map(item => {
            item.date = this.changeTableData(item)
          })
          // this.dates = this.tableData.map(item => {
          //   return this.changeTableData(item)
          // })

          console.log(this.tableData, this.dates, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },

      handleSelectionChange(el) {
        // console.log(el, 222)
      },
      // 获取删除id
      select(selection, row) {
        selection.forEach(element => {
          this.delArr.push(element.id)
        })
      },
      // 批量删除
      async delCheckList() {

        if (this.delArr.length < 1) {
          console.log(this.delArr)
          return this.$message({
            message: "请选择删除行",
            type: 'warning'
          })
        } else {
          delLists(this.delArr).then(response => {
            console.log('请求成功:', response)
            this.initData()
            this.$message({
              message: "删除成功",
              type: 'success'
            })
            // 处理响应数据...
          }).catch(error => {
            console.error('请求失败:', error)
            if (error.response) {
              console.error('状态码:', error.response.status)
            } else if (error.request) {
              // error.request 来获取请求的配置信息
            }
            this.initData()
            // 处理错误...
          })
          console.log(this.delArr, 111)
        }
      },

    },
    mounted() {
      this.initData()
    },
    computed: {
      preprocessedData() {
        this.dates = []
        this.tableData = this.tableData1.data.map(item => {
          // 这里只是简单地返回原始对象，但你可以在这里进行更多的数据转换
          // 例如，将日期值转换为数字类型等
          Object.keys(item).forEach(key => {
            if (key.startsWith('2024-')) { // 检查是否为日期字符串
              this.dates.push(key)
            }
          })
          return item
        })

        // 去除重复的日期并排序
        this.uniqueDates = [...new Set(this.uniqueDates)].sort()

        // 注意：这里我们实际上没有改变tableData的结构，
        // 只是用它来存储原始数据以便在模板中使用
        // 如果需要，你可以在这里进行更复杂的数据转换

        return this.tableData // 但这个computed属性实际上没有被直接使用
      },
    }
  }

</script>
<style lang="scss" scoped>
</style>