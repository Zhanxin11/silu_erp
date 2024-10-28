<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-23 13:59:43
 * @FilePath: \vue-element-admin\src\views\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row style="padding-bottom: 20px">
        <el-button @click="showDailog">新增</el-button>
        <el-button>删除</el-button>
      </el-row>
      <el-table :data="tableData" border :header-cell-style="tableHeaderColor">
        <el-table-column prop="name" label="用户名" align="center" fixed>
        </el-table-column>
        <el-table-column label="部门" align="center" fixed>
        </el-table-column>
        <el-table-column label="角色" align="center" fixed>
        </el-table-column>
        <el-table-column label="数据权限组" align="center" fixed>
        </el-table-column>
        <el-table-column label="登录名" align="center" fixed>
        </el-table-column>
        <el-table-column label="登录秘钥" align="center" fixed>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" fixed>
          <template slot-scope="scope">
            <el-tag :type="getTagType(scope.row.status)">{{scope.row.status?'在职':'离职'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="!scope.row.isEdit" @click="changeUser(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog class="dialog-box" title="新增用户" width="33%" :visible.sync="userDialog">
      <el-form :inline="true" label-width="80px" :model="listFrom" ref="listFrom" :rules="userRules">
        <el-form-item prop="name" label="用户名">
          <el-input v-model="listFrom.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <!-- <el-input v-model="listFrom.status" placeholder="请输入用户名"></el-input> -->
          <el-select v-model="listFrom.status" placeholder="请选择状态">
            <el-option v-for="(item,index) in userForm.status" :key="index" :label="item ? '在职' : '离职'" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="skus" label="sku分配">
          <el-input v-model="listFrom.skus" placeholder="请输入skus,以逗号分隔"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser('listForm')">确 定</el-button>
      </div>
    </el-dialog>
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
            dp: 'BG2',
            director: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }]
          },
        ],
        userDialog: false,
        listFrom: {
          name: '',
          status: '',
          skus: ''
        },
        userForm: {},
        // 校验规则
        userRules: {
          name: [{ required: true, message: '用户名必填', trigger: 'blur' }],
          status: [{ required: true, message: '状态为必选项', trigger: 'blur' }],
          status: [{ required: true, message: '状态为必选项', trigger: 'blur' }]
        },
      }
    },
    watch: {},
    computed: {

    },
    methods: {
      async initOpData() {
        // this.tableData = await getOpListApi()
        this.userForm.status = [true, false]
      },
      changeUser(row, value) {
        this.userDialog = true
      },
      showDailog() {
        this.userDialog = true
      },
      saveUser(name) {
        this.listFrom.status = this.listFrom.status.some(value => value === true)
        console.log(this.listFrom)
        createOpApi(this.listFrom).then(response => {
          console.log('新增成功:', response)
          this.$message({
            message: "新增成功",
            type: 'success'
          })
          this.initOpData()
          // 处理响应数据...
        })
      },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
      getTagType(status) {
        if (status === true) {
          return ''
        } else if (status === false) {
          return 'danger'
        }
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
