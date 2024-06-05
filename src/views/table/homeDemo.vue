<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-05-31 13:35:53
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-select v-model="BusinesValue" multiple placeholder="请选择商号">
          <el-option
            v-for="item in BusinesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="padding: 0 10px"
          v-model="BusinesValue"
          multiple
          placeholder="请选择团队"
        >
          <el-option
            v-for="item in BusinesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="BusinesValue" multiple placeholder="请选择运营">
          <el-option
            v-for="item in BusinesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="padding: 0 10px"
          v-model="BusinesValue"
          multiple
          placeholder="请选择spu"
        >
          <el-option
            v-for="item in BusinesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="weekValue"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
        >
        </el-date-picker>
        <el-date-picker
          type="months"
          style="margin: 0 10px"
          v-model="monthsValue"
          placeholder="选择一个或多个月"
        >
        </el-date-picker>
        <el-date-picker
          type="dates"
          v-model="dateValues"
          placeholder="选择一个或多个日期"
        >
        </el-date-picker>
      </el-row>
      <el-table
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
        <el-table-column prop="OrderQuantity" width="150">{{
          OrderQuantity
        }}</el-table-column>
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
      BusinesValue: [],
      weekValue: '',
      monthsValue: '',
      dateValues: '',
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
      // 表头
      columnDataList: [
        '06-01', '06-02', '06-03', '06-04'
      ],
      // 数据
      busTableData: [
        {
          name: '订单量',
          date: '',
          OrderQuantity: 1,
          SalesQuantity: 2,
          orderNum: 12,
          GMV: 6,
          profitMargin: 0.2,
          fixedPro: 0.2,
          salePro: 0.1,
          refundPro: 0.3,
          cpcPro: 0.02,
          storagePro: 0.3,
          repaymentpro: 0.01,
          effiSku: 22,
          SingleSkuAverage: 2,
          deliveryTarget: 20,
          targrtYear: 10,
          deliveryTarget: 0.8,
          completeDeliveryTarget: 0.2,
          AverageInVentory: 0.2,
          // 平均在途数量
          AverageTtransit: 20,
          AveragenventoryTurnoverDay: 20,
          // 平均在途天数
          AverageInVentoryDay: 10,
          // 总周转天数
          totalWeekToNumberDay: 30,
          // 汇总
          totle: []
        },
        {
          name: '销售件数 ',
          OrderQuantity: 1,
          SalesQuantity: 2,
          orderNum: 12,
          GMV: 6,
          profitMargin: 0.2,
          fixedPro: 0.8,
          salePro: 0.1,
          refundPro: 0.3,
          cpcPro: 0.02,
          storagePro: 0.3,
          repaymentpro: 0.01,
          effiSku: 22,
          SingleSkuAverage: 2,
          deliveryTarget: 20,
          targrtYear: 10,
          deliveryTarget: 0.8,
          completeDeliveryTarget: 0.2,
          AverageInVentory: 0.2,
          // 平均在途数量
          AverageTtransit: 20,
          AveragenventoryTurnoverDay: 20,
          // 平均在途天数
          AverageInVentoryDay: 10,
          // 总周转天数
          totalWeekToNumberDay: 32,
          // 汇总
          totle: []
        },
        {
          name: '每单件数',
          OrderQuantity: 11,
          SalesQuantity: 2,
          orderNum: 12,
          GMV: 6,
          profitMargin: 0.2,
          fixedPro: 0.8,
          salePro: 0.1,
          refundPro: 0.3,
          cpcPro: 0.02,
          storagePro: 0.3,
          repaymentpro: 0.01,
          effiSku: 22,
          SingleSkuAverage: 2,
          deliveryTarget: 20,
          targrtYear: 10,
          deliveryTarget: 0.8,
          completeDeliveryTarget: 0.2,
          AverageInVentory: 0.2,
          // 平均在途数量
          AverageTtransit: 20,
          AveragenventoryTurnoverDay: 20,
          // 平均在途天数
          AverageInVentoryDay: 10,
          // 总周转天数
          totalWeekToNumberDay: 32,
          // 汇总
          totle: []
        },
        {
          name: 'GMV利润',
          date: 1,
          date1: 2
        },
        {
          name: '利润率',
          date: 1,
          SalesQuantity: 2
        },
        {
          name: '固定占比',
          date: 1,
          date1: 2
        },
        {
          name: '促销占比',
          date: 1,
          date1: 2
        },
        {
          name: '退款占比',
          date: 1,
          date1: 2
        },
        {
          name: 'cpc占比',
          date: 1,
          date1: 2
        },
        {
          name: '回款率',
          date: 1,
          date1: 2
        },
        {
          name: '有效sku计数',
          date: 1,
          date1: 2
        },
        {
          name: '单sku均销量',
          date: 1,
          date1: 2
        },
        {
          name: '发货目标',
          date: 1,
          date1: 2
        },
        {
          name: '年度目标',
          date: 1,
          date1: 2
        },
        {
          name: '发货目标完成率',
          date: 1,
          date1: 2
        },
        {
          name: '年度目标完成率',
          date: 1,
          date1: 2
        },
        {
          name: '平均在库数量',
          date: 1,
          date1: 2
        },
        {
          name: '平均在途数量',
          date: 1,
          date1: 2
        },
        {
          name: '平均在库周转数量',
          date: 1,
          date1: 2
        },
        {
          name: '平均在途周转天数',
          date: 1,
          date1: 2
        },
        {
          name: '总周转天数',
          date: 1,
          date1: 2
        },
        {
          name: '汇总',
          date: 1,
          date1: 2
        },
      ]
    }
  },
  watch: {},
  computed: {
    // columnDataList(){}
  },
  methods: {
    changeDateList() {
      var date = new Date()
      var year = date.getFullYear()
      this.columnDataList = this.columnDataList.forEach(item => {

      })
      console.log(date)
    }
  },
  created() {
    // this.changeDateList()
  },
  mounted() { }
};
</script>
<style lang="scss" scoped>
</style>
