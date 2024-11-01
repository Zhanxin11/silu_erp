<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-11-01 10:56:57
 * @FilePath: \vue-element-admin\src\views\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button @click="addOp">新增</el-button>
        <el-button>删除</el-button>
      </el-row>
      <el-table :data="tableData" :header-cell-style="tableHeaderColor" row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="dp" label="部门" align="center" fixed>
        </el-table-column>
        <el-table-column prop="director" label="主管" align="center" fixed>
        </el-table-column>
        <el-table-column prop="op" label="成员" align="center" fixed>
        </el-table-column>
        <el-table-column label="sku" align="center" fixed>
        </el-table-column>
        <!-- <el-table-column prop="role" label="数据权限组" align="center" fixed>
        </el-table-column> -->
        <!-- <el-table-column prop="status" label="状态" align="center" fixed>
          <template slot-scope="scope">
            <el-tag>{{scope.row.status?'在职':'离职'}}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="!scope.row.isEdit" @click="changeUser(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增人员" :visible.sync="dialog" width="35%" :inline="true">
      <el-form :inline="true" label-width="80px" :model="opFrom" ref="opFrom" :rules="opRules">
        <el-form-item prop="op" label="部门">
          <el-cascader :options="options" clearable></el-cascader>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveAddOp('opFrom')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserListApi, createOpApi, changeOpApi } from '@/api/userDemo'
  export default {
    components: {},
    props: {},
    data() {
      return {
        dialog: false,
        opFrom: {
          dpValue: '',
          der: '',
          op: '',
          sku: ''
        },
        tableData: [{
          id: 1,
          dp: 'BG2',
          director: 'lisa管理员',
          op: '',
          sku: '',
          children: [{
            id: 5,
            dp: 'BG2A',
            director: 'lisa',
            op: '',
            sku: '',
            children: [{
              id: 3,
              dp: 'BU1',
              director: '李媛媛',
              sku: '',
              children: [{
                id: 33,
                op: '组员1',
                sku: '',
              }, {
                id: 44,
                op: '组员2',
                sku: '',
              }
              ]
            }]
          },
          {
            id: 2,
            dp: 'BG2B',
            director: 'bella',
            children: [{

              id: 21,
              dp: 'BU2',
              director: '张兰',
              op: '组员',
            },
            {
              id: 22,
              dp: 'BU3',
              director: '蔡蔡',
              op: '组员',
            }]
          }]
        },
        ],
        opRules: {
          op: [{}]
        }
      }
    },
    watch: {},
    computed: {},
    methods: {
      async initOpData() {
        // this.tableData = await getUserListApi()
      },
      addOp() {
        this.dialog = true
      },
      saveAddOp() { },
      cancel() {
        this.dialog = false
      },
      changeUser() { },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      this.initOpData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
