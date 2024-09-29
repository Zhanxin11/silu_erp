<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-09-04 17:37:16
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-09-11 10:41:38
 * @FilePath: \vue-element-admin\src\views\proManage\proInformantion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <el-row style="padding-bottom: 20px">
      <el-button type="info" @click="addFirm">新增商号</el-button>
      <el-button type="danger" @click="delFirmList">删除商号</el-button>
      <el-button type="primary" @click="uploadFirmExcel">导入商号</el-button>
      <el-button type="primary" @click="saveFirm">保存导入</el-button>
      <el-button type="primary" @click="downloadFirmToExcel">导出</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="site1" label="站点">
      </el-table-column>
      <el-table-column prop="name" label="商号">
      </el-table-column>
      <el-table-column prop="brands" label="品牌">
      </el-table-column>
      <el-table-column prop="ops" label="运营">
        <template slot-scope="scope">
          {{ changeOp(scope.row.ops)}}

        </template>
      </el-table-column>
      <el-table-column prop="dp" label="部门">
      </el-table-column>
      <el-table-column prop="team" label="团队">
      </el-table-column>
      <el-table-column prop="unit1" label="小组">
      </el-table-column>
      <el-table-column prop="status" label="团队状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.status)">{{ scope.row.status === true? '在售' : '解约' }}</el-tag>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getFirmList, getFirmLine } from '@/api/manage'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [

        ],
        firmForm: {

        }
      }
    },
    watch: {},
    computed: {
      chageOp() {

      }
    },
    methods: {
      async initData() {
        this.tableData = await getFirmList()
      },
      // 处理op结构
      changeOp(op) {
        const cleanedStr = op.slice(2, -2).replace(/'/g, '')
        // 使用逗号分隔元素
        const items = cleanedStr.split(', ')
        // 如果需要，可以进一步处理或格式化 items 数组
        // 这里我们直接将其连接成一个字符串
        return items.join(', ')
      },

      // 控制tag颜色
      getTagType(status) {
        if (status === true) {
          return 'success' // 在售状态使用成功色
        } else {
          return 'danger' // 解约状态使用危险色
        }
      },
      addFirm() { },
      delFirmList() { },
      uploadFirmExcel() { },
      saveFirm() { },
      downloadFirmToExcel() { }
    },
    created() {
      this.initData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>