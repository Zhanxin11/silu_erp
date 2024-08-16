<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-08 16:31:01
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
        <!-- <el-table-column v-for="(item, index) in dates" :key="index" :label="item">
{{item}}
        </el-table-column> -->
        <el-table-column v-for="date in dates" :key="date" :label="date" :prop="`date.${date}`">
          <template slot-scope="scope">
            <!-- 使用作用域插槽来访问动态属性 -->
            <span>{{ scope.row.date[date] || '-' }}</span>
          </template>
        </el-table-column>
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
      // changeTableData(obj) {
      //   const keys = Object.keys(obj) // 获取对象的所有键
      //   const newObj = {} // 创建一个新对象来存放结果
      //   for (let i = 4; i < keys.length; i++) {
      //     const key = keys[i]
      //     newObj[key] = obj[key]
      //   }
      //   return newObj
      // },
      async initData() {
        const token = this.token
        if (!token) {
          console.log('Token is not available')
          return
        }
        try {
          this.rowTableData = await getDemo1(token)
          // this.tableData.map(item => {
          //   item.date = this.changeTableData(item)
          // })
          // this.dates = this.tableData.map(item => {
          //   return this.changeTableData(item)
          // })

          console.log(this.tableData, this.dates, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },
      processData() {
      // 将原始数据处理为适合表格的格式
      // 同时提取所有唯一的日期作为列头
      this.tableData = this.rawData.data.map(item => {
        // 创建一个新对象来存储转换后的数据
        // 注意：这里我们没有直接修改原始数据中的结构
        const newData = {
          sku_field: item.sku_field,
          id: item.id,
          store_field: item.store_field,
          op_field: item.op_field,
          // 创建一个新的属性来存储日期数据
          date: {}
        };

        // 将日期数据移动到date对象中
        Object.keys(item).forEach(key => {
          if (key.startsWith('2024-')) {
            newData.date[key] = item[key];
          }
        });

        return newData;
      });

      // 提取所有唯一的日期作为列头
      this.dateColumns = Array.from(new Set(
        this.rawData.data.reduce((dates, item) => {
          return [...dates, ...Object.keys(item).filter(key => key.startsWith('2024-'))];
        }, [])
      ).sort();
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
    }
  }

</script>
<style lang="scss" scoped>
</style>
