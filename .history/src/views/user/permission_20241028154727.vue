<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-28 15:07:01
 * @FilePath: \vue-element-admin\src\views\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button>新增</el-button>
        <el-button>删除</el-button>
      </el-row>
      <el-row>
        <el-col :span="17">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span style="color: #403d3d;font-weight: 700;">权限数据列表</span>

            </div>
            <div>
              <el-table :data="tableData" :header-cell-style="perTableHeaderColor">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="数据权限组" align="center" fixed>
                </el-table-column>
                <el-table-column label="权限组用户" align="center" fixed>
                </el-table-column>
                <el-table-column label="权限组状态" align="center" fixed>
                </el-table-column>
                <el-table-column label="权限描述" align="center" fixed>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" fixed>
                </el-table-column>
                <el-table-column prop="edit" label="操作" align="center" fixed>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="change(scope.$index,scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>

        </el-col>
        <el-col :span="7">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span style="color: #403d3d;font-weight: 700;">菜单分配</span>
              <el-button type="primary" icon="el-icon-check" style="float: right;" circle size="mini"></el-button>
            </div>
            <div>
              <el-tree :data="dataTree" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"
                :props="defaultProps "  @check-change="handleCheckChange"
                >
              </el-tree>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import { getOpListApi, createOpApi, changeOpApi } from '@/api/userDemo'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        dataTree: [{
          id: 1,
          label: '用户管理',
          children: [{
            id: 3,
            label: '用户管理',
            children: [{
              id: 4,
              label: '用户新增'
            }, {
              id: 5,
              label: '用户修改',

            }]
          }, {
            id: 2,
            label: '部门管理',
            children: [{
              id: 6,
              label: '部门新增'
            }, {
              id: 7,
              label: '部门修改',
            }]
          }],
        },

        {
          id: 20,
          label: '产品资料',
          children: [{
            id: 6,
            label: '产品管理',
            children: [{
              id: 8,
              label: '产品新增'
            }],
          }, {
            id: 7,
            label: '商号资料',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }

      }
    },
    watch: {},
    computed: {},
    methods: {
      async initOpData() {
        this.tableData = await getOpListApi()
      },
      change() { },
      handleCheckChange(){}
      // 表头颜色
      perTableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return ' color:#999;'
      },
    },
    created() {
      this.initOpData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
  .box-card {
    margin-left: 30px;
  }
</style>
