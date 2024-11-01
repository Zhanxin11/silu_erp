<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-29 16:38:10
 * @FilePath: \vue-element-admin\src\views\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button @click="dialogVisible=true">新增</el-button>
        <el-button>删除</el-button>
      </el-row>
      <el-table :data="tableData" :header-cell-style="tableHeaderColor"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="title" label="菜单标题" align="center" fixed>
        </el-table-column>
        <el-table-column prop="icon" label="图标" align="center" fixed>
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
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
    <el-dialog style="color: rgb(36, 34, 34); font-weight: 700;" title="添加菜单" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form>
          <el-form-item label="新增类型：">
            <el-button-group>
              <el-button size="mini">目录</el-button>
              <el-button size="mini">菜单</el-button>
              <el-button size="mini">按钮</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item label="图标选择：">
            <template >
              <div v-for="(name, index) in iconList.icons" :index="index" :key="index" class=" m-[4px] cursor-pointer"
                style="display: inline-block;">
                <div @click="chooseIcon(name)">

                  <el-icon style="font-size: 15px;">
                    <component :is="name" :index="index"></component>
                  </el-icon>
                </div>
              </div>
              <i :class="name"></i>
            </template>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getOpListApi, createOpApi, changeOpApi } from '@/api/userDemo'
  import { iconFontList } from '@/utils/icons'
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [
          {
            id: 1,
            icon: 'el-icon-user-solid',
            title: '用户管理',
            address: '',
            show: '是',
            url: 'user/index',
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
                per: 'user:add',
              },
              {
                id: 312,
                icon: '',
                title: '用户修改',
                address: '',
                show: '是',
                sort: 12,
                per: 'user:change',
              },
              {
                id: 313,
                icon: '',
                title: '用户删除',
                address: '',
                show: '是',
                sort: 13,
                per: 'user:del',
              },
              {
                id: 314,
                icon: '',
                title: '用户下载',
                address: '',
                show: '是',
                sort: 14,
                per: 'user:down',
              },
              {
                id: 315,
                icon: '',
                title: '用户上传',
                address: '',
                show: '是',
                sort: 15,

                per: 'user:up',
              }
              ]
            },]
          },
          {
            id: 2,
            icon: 'el-icon-notebook-2',
            title: '产品管理',
            address: '',
            show: '是',
            url: 'proManger/index',
            sort: 2,
            children: [{
              id: 22,
              icon: '',
              title: '产品管理',
              address: '',
              show: '是',
              sort: 2,
              url: 'proManger/index',
              per: 'pro:list',
              children: [{
                id: 211,
                icon: '',
                title: '产品新增',
                address: '',
                show: '是',
                sort: 21,
                per: 'pro:add',
              }]
            },
            ]
          }
        ],
        dialogVisible: false,
        activeName: 'first',
      }
    },
    watch: {},
    computed: {
      iconFontList() {
        console.log(iconFontList)
        return iconFontList()
      }
    },
    methods: {
      async initOpData() {
        this.tableData = await getOpListApi()
      },
      change() { },
      getInitIcons() {
        for (const name in Icon) {
          this.icons.push(name)
        }
        console.log(SvgIcon, 1, Icon.Icon, 2, icons)
        return this.icons
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
    },
    created() {
      // this.initOpData()
      // this.getInitIcons()
    },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
</style>
