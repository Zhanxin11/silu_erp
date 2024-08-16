<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-07 17:03:33
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
      </el-row>
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
          const res = await getDemo1()
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

    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>