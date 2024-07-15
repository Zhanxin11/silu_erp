<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-06-24 15:29:45
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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

      <el-table style="width: 100%; height: 100%; margin-top: 20px" border :data="tableData">

        <el-table-column prop="SPU" label="SPU" sortable width="180"></el-table-column>
        <el-table-column prop="sku计数" label="sku计数" width="180"></el-table-column>
        <el-table-column prop="开始时间" label="看结束时间" width="180"></el-table-column>
      </el-table>
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
        tableData: [],
        BusinesValue: '',
        dateValues: '',
        weekValue: '',
        monthsValues: '',
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
      }
    },
    watch: {},
    computed: {
      // columnDataList(){}
      // getHeaders() {
      //   return this.busTableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
      // },
      // getValues() {
      //   return this.columnDataList.map(item => {
      //     return this.busTableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { 'title': item.label, })
      //   })
      // }
    },
    methods: {
      async initData() {
        try {
          this.tableData = await getDemo()
          console.log(this.tableData, 'cs')
        } catch (err) {
          console.log('获取用户分布信息失败', err)
        }
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
