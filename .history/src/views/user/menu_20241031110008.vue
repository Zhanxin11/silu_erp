<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-31 10:30:59
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
    <el-dialog style="color: rgb(36, 34, 34); font-weight: 700;" title="添加菜单" :visible.sync="dialogVisible" width="25%">
      <div>
        <el-form :inline="true" label-width="120px">
          <el-form-item label="新增类型：">
            <el-button-group>
              <el-button size="mini" :plain="currSelect1" @click="changeMenu(1)">目录</el-button>
              <el-button size="mini" :plain="currSelect2" @click="changeMenu(2)">菜单</el-button>
              <el-button size="mini" :plain="currSelect3" @click="changeMenu(3)">按钮</el-button>
            </el-button-group>
          </el-form-item>
          <div v-if=" show===1">
            <el-form-item label="是否可见：">
              <el-switch v-model="isShow" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="图标选择：">
              <el-popover placement="top-start" width="450" trigger="click" v-model="visible">
                <span slot="reference"
                  style="display:inline-block;width:180px;height:36px;line-height:36px; border:1px solid #DCDFE6;border-radius: 3px;">
                  <i style="margin: 10px;" :class="userChooseIcon" v-model="menuFrom.iconValue"></i>
                  {{chooseIcons}}
                </span>
                选择目录图标
                <span class="iconList">
                  <i v-for="item in iconFontList" :key="item" :class="item" @click="setIcon(item)"
                    style="font-size:20px;"></i>
                </span>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                </div>
              </el-popover>
            </el-form-item>

            <el-form-item label="菜单标题：">
              <el-input v-model="menuFrom.titelValue" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="上级类目：">
              <el-select v-model="menuFrom.menuLocationValue" placeholder="请选择目录位置">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单路径：">
              <el-input v-model="menuFrom.urlValue" placeholder="请输入路径" style="width: 100%;"></el-input>
            </el-form-item>
          </div>
          <div v-if=" show===2">
            <el-form-item label="是否可见：">
              <el-switch v-model="isShow" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="菜单标题：">
              <el-input v-model="menuFrom.titelValue" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="上级类目：">
              <el-select v-model="menuFrom.menuLocationValue" placeholder="请选择目录位置">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单路径：">
              <el-input v-model="menuFrom.urlValue" placeholder="请输入路径" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="权限标识：">
              <el-input v-model="menuFrom.urlValue" placeholder="请输入标识" style="width: 100%;"></el-input>
            </el-form-item>

          </div>
          <div v-if="show===3">
            <el-form-item label="是否可见：">
              <el-switch v-model="isShow" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="按钮名称：">
              <el-input v-model="menuFrom.titelValue" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="上级类目：">
              <el-select v-model="menuFrom.menuLocationValue" placeholder="请选择目录位置">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单路径：">
              <el-input v-model="menuFrom.urlValue" placeholder="请输入路径" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="权限标识：">
              <el-input v-model="menuFrom.urlValue" placeholder="请输入标识" style="width: 100%;"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMenu()">确 定</el-button>
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
        chooseIcons: '',
        currSelect1: false,
        currSelect2: false,
        currSelect3: false,
        userChooseIcon: '',
        visible: false,
        isShow: true,
        menuFrom: {
          isSHow: true,
          iconValue: '',
          titelValue: '',
          menuLocationValue: '',
          urlValue: ''
        },
        options: ['顶级', '目录', '菜单'],
        show: 1,

      }
    },
    watch: {},
    computed: {
      iconFontList() {
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
      //给icon绑定的点击事件
      setIcon(icon) {
        console.log(icon)
        this.userChooseIcon = icon//将i的样式设为选中的样式el-icon-xxx
        this.chooseIcons = ""
      },
      changeMenu(num) {
        this.show = num
      },
      saveMenu() {
        // this.dialogVisible = false
        console.log(this.menuForm)
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
  .iconList {
    width: 430px;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    i {
      display: inline-block;
      width: 45px;
      height: 45px;
      color: #000000;
      font-size: 20px;
      border: 1px solid #E6E6E6;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      line-height: 45px;
      margin: 5px;

      &:hover {
        color: #369;
        border-color: #333;
      }
    }
  }

  .chooseIcons {
    top: 250px !important;
  }

  .el-form-item {
    margin-bottom: 15px;
  }
</style>