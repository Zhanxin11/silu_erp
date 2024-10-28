<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-26 17:23:39
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
      <el-table :data="tableData" :header-cell-style="tableHeaderColor"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="title" label="菜单标题" align="center" fixed>
        </el-table-column>
        <el-table-column prop="icon" label="图标" align="center" fixed>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" fixed>
        </el-table-column>
        <el-table-column prop="per" label="权限标识" align="center" fixed>
        </el-table-column>
        <el-table-column prop="url" label="路径" align="center" fixed>
        </el-table-column>
        <el-table-column prop="show" label="是否可见" align="center" fixed>
        </el-table-column>
        <el-table-column prop="edit" label="操作" align="center" fixed>
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button> -->
            <el-button type="text" size="small" @click="change(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        tableData: [
          {
            id: 3,
            icon: '',
            title: '用户管理',
            address: '',
            show: '是',
            sort: 1,
            children: [{
              id: 31,
              icon: '',
              title: '用户管理',
              address: '',
              show: '是',
              sort: 1,
              url: 'user/index',
              per: 'user:list',
              children: [{
                id: 311,
                icon: '',
                title: '用户新增',
                address: '',
                show: '是',
                sort: 11,
                url: 'user/index',
                per: 'user:add',
              },
              {
                id: 312,
                icon: '',
                title: '用户修改',
                address: '',
                show: '是',
                sort: 111,
                url: 'user/index',
                per: 'user:change',
              },
              {
                id: 313,
                icon: '',
                title: '用户删除',
                address: '',
                show: '是',
                sort: 111,
                url: 'user/index',
                per: 'user:del',
              },
              {
                id: 314,
                icon: '',
                title: '用户下载',
                address: '',
                show: '是',
                sort: 111,
                url: 'user/index',
                per: 'user:down',
              }，
              
              ]
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }]
          },
        ]
      }
    },
    watch: {},
    computed: {},
    methods: {
      async initOpData() {
        this.tableData = await getOpListApi()
      },
      change() { },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      // this.initOpData()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
