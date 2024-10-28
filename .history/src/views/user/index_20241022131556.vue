<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-10-21 09:17:17
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-10-22 13:15:29
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
    <el-dialog class="dialog-box" title="批量上传产品资料" width="25%" :visible.sync="uploadProDialog">
      <el-upload class="upload-demo" ref="upload" action="#" :show-file-list="true" :before-upload="beforeUploadExecl"
        :http-request="uploadHttpRequest" :file-list="fileList" :on-change="handleUploadChange" :limit="5" drag
        multiple>
        <div class="border">
          <i class="el-icon-plus icon-center"></i>
        </div>
        <div slot="tip" class="el-upload-tip upload-tips">只能上传.xlsx文件</div>
      </el-upload>
      <span slot="footer">
        <el-button @click="submitUpload" type="primary">上传</el-button>
        <el-button @click="uploadProDialog = false" class="cancelDialog">
          取消
        </el-button>
      </span>
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
        tableData: [],
        listFrom: {
          name: '',
          status: '',
        }
      }
    },
    watch: {},
    computed: {},
    methods: {
      async initOpData() {
        this.tableData = await getOpListApi()
      },
      changeUser() { },
      // 表头颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        return 'background:	#F5F5F5; color:#000000;'
      },
      getTagType(status) {
        if (status === true) {
          return 'success'
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