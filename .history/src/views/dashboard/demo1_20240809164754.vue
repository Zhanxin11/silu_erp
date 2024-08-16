<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-09 16:47:54
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-button type="danger" @click="delCheckList">批量删除</el-button>
        <el-button type="primary" @click="changeList">批量编辑</el-button>
        <el-button type="primary" @click="changeList">批量上传</el-button>
        <el-button type="primary" @click="changeList">选择导出</el-button>
        <el-button type="info" @click="addList">{{echartsArr}}</el-button>
        <el-button type="info" @click="addList">新增</el-button>
      </el-row>
      <el-table style="width: 100%;    height: 100%; margin-top: 20px" border :data="tableData" id="table"
        @selection-change="handleSelectionChange" @select="select">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="op_field" label="运营"></el-table-column>
        <el-table-column prop="sku_field" label="SKU"></el-table-column>
        <el-table-column prop="store_field" label="店铺"></el-table-column>
        <el-table-column v-for="item in dates" :key="item" :prop="item" :label="item">
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
        tableData: [],
        delStrList: '',
        dateColumns: []
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      dates() {
        if (this.tableData && this.tableData[0]?.date) {
          // 使用 Object.keys() 获取 date 对象的所有键
          return Object.keys(this.tableData[0].date)
        }
        return []
      },
      // echartsArr() {
      //   if (this.tableData && this.tableData[0]?.date) {
      //     return Object.values(this.tableData[0].date)
      //   }
      //   return []
      // }
    },
    methods: {
      // 初始化数据Date
      changeTableData(obj) {
        const keys = Object.keys(obj) // 获取对象的所有键
        const newObj = {} // 创建一个新对象来存放结果
        for (let i = 3; i < keys.length; i++) {
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
          this.tableData = await getDemo1(token)
          this.tableData.map(item => {
            item.date = this.changeTableData(item)
          })
          this.addIsTrue()
          // console.log(this.tableData, this.dates, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },

      handleSelectionChange(el) {
        // console.log(el, 222)
      },
      // 获取删除id
      select(selection, row) {
        this.delStrList = selection.map(element =>
          element.id
        ).join(',')
      },
      // 批量删除
      async delCheckList() {
        if (this.delStrList.length < 1) {
          console.log(this.delArr)
          return this.$message({
            message: "请选择删除行",
            type: 'warning'
          })
        } else {
          delLists(this.delStrList).then(response => {
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
            }
            //  else if (error.request) {
            //   // error.request 来获取请求的配置信息
            // }
            this.initData()
            // 处理错误...
          })
          console.log(this.delArr, 111)
        }
      },
      // 添加标记
      addIsTrue() {
        console.log(this.tableData)
        this.tableData.map(item => {
          console.log(item, 1)
          return Object.key(item).map(i => {
            if (i.date) {
              Object.key(i.date).map(d => {
                return { ...d, isCheck: false }
              })
            } else {
              return {
                ...i,
                isCheck: false
              }
            }
          })
        })
      },
      // 批量修改
      changeList() { },
      // 新增
      addList() { },
    },
    mounted() {
      this.initData()

    },
    created() {

    }
  }

</script>
<style lang="scss" scoped>
</style>
