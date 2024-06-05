<template>
  <div class="app-container haplotype-detail default-scrollbar">
    <div>
      <el-row style="padding: 10px 0"
        ><el-button
          type="primary"
          icon="el-icon-edit-outline"
          @click="addColSetting"
          >添加列</el-button
        >
        <el-button @click="addParamsSetting">添加行</el-button></el-row
      >
      <el-form ref="historyForm" :model="historyForm" size="small">
        <div
          class="table-box"
          @contextmenu.prevent.capture
          style="display: flex"
        >
          <el-table
            :header-cell-style="{ background: '#f2f2f2' }"
            :data="historyForm.tableData"
            :loading="loading"
            style="width: 97%"
            class="list-table default-scrollbar"
            size="mini"
            @header-contextmenu="rightClickColShowFun"
            @row-contextmenu="rightClickRowShowFun"
            :cell-class-name="tableClassName"
            :height="elTableHeight"
            border
          >
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in historyForm.tableHeader"
              :key="index"
              align="center"
              :prop="item.nameEn"
              class-name="cellDefault"
            >
              <template slot="header">
                <el-tooltip
                  effect="light"
                  placement="bottom"
                  trigger="hover"
                  :disabled="item.name ? false : true"
                >
                  <div slot="content" style="max-width: 200px">
                    {{ item.name }}
                  </div>
                  <el-input
                    style="background: #ddd"
                    class="headerBox"
                    v-model="item.name"
                    @change="
                      setColName(index, historyForm.tableHeader[index].name)
                    "
                  />
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <el-tooltip
                  effect="light"
                  placement="bottom"
                  trigger="hover"
                  :disabled="scope.row[item.nameEn] ? false : true"
                >
                  <div slot="content" style="max-width: 200px">
                    {{ scope.row[item.nameEn] }}
                  </div>
                  <el-input
                    v-model="scope.row[item.nameEn]"
                    @input="setInputVal"
                    class="name-input"
                  ></el-input>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "haplotypeDetail",
  data() {
    return {
      elTableHeight: 0,
      // 遮罩层
      loading: true,
      // 表单参数-表格内容数据
      historyForm: {
        // 表头列表数组
        tableHeader: [
          {
            name: '类型（1）',
            nameEn: 'typeSelf'
          },
          {
            name: '类型（2）',
            nameEn: 'typeProduct'
          },
          {
            name: '类型（3）',
            nameEn: 'typeEquipment'
          },
          {
            name: '类型（4）',
            nameEn: 'typeQuality'
          }
        ],
        tableData: [
          { index: 0, typeSelf: '1', typeProduct: '', typeEquipment: '', typeQuality: '' },
          { index: 1, typeSelf: '2', typeProduct: '', typeEquipment: '', typeQuality: '' },
          { index: 2, typeSelf: '3', typeProduct: '3', typeEquipment: '3', typeQuality: '3' },
          { index: 3, typeSelf: '4', typeProduct: '4', typeEquipment: '4', typeQuality: '4' },
          { index: 4, typeSelf: '5', typeProduct: '5', typeEquipment: '5', typeQuality: '5' },
          { index: 5, typeSelf: '6', typeProduct: '6', typeEquipment: '6', typeQuality: '6' },
          { index: 6, typeSelf: '7', typeProduct: '7', typeEquipment: '7', typeQuality: '7' },
          { index: 7, typeSelf: '8', typeProduct: '8', typeEquipment: '8', typeQuality: '8' },
          { index: 8, typeSelf: '9', typeProduct: '9', typeEquipment: '9', typeQuality: '9' },
          { index: 9, typeSelf: '10', typeProduct: '10', typeEquipment: '10', typeQuality: '10' },
          { index: 10, typeSelf: '11', typeProduct: '11', typeEquipment: '11', typeQuality: '11' },
          { index: 11, typeSelf: '附属11LV1', typeProduct: '附属11LV1', typeEquipment: '附属11LV1', typeQuality: '附属11LV1' },
          { index: 12, typeSelf: '附属11LV2', typeProduct: '附属11LV2', typeEquipment: '附属11LV2', typeQuality: '附属11LV2' },
          { index: 13, typeSelf: '附属11LV3', typeProduct: '附属11LV3', typeEquipment: '附属11LV3', typeQuality: '附属11LV3' },
        ]
      },
      isAddCol: true,
      currentClickRow: null,
      currentClickCol: null,
    }
  },
  mounted: function () {
    // 高度调整
    this.$nextTick(() => {
      this.elTableHeight = document.body.clientHeight - 130
      console.log(document.body.clientHeight)
      console.log(this.elTableHeight)
    })
  },
  methods: {
    // 新增行
    addParamsSetting() {
      let item = {
        typeEquipment: "",
        typeProduct: "",
        typeQuality: "",
        typeSelf: ""
      }
      for (let i in this.historyForm.tableHeader) {
        if (i > 3) {
          item[this.historyForm.tableHeader[i].nameEn] = ''
        }
      }
      this.historyForm.tableData.unshift(item)
      console.log(this.historyForm.tableData)
    },
    // 删除当前行
    deleteRow(index) {
      this.historyForm.tableData.splice(index, 1)
    },
    // 在数据最后新增一列
    addColSetting() {
      for (let i in this.historyForm.tableHeader) {
        if (this.historyForm.tableHeader[i].name === "") {
          this.isAddCol = false
        } else {
          this.isAddCol = true
        }
      }
      if (this.isAddCol) {
        this.addColList()
      } else {
        this.$message.success("还有未填写的列")
      }
    },
    // 新增列
    addColList() {
      let index = this.historyForm.tableHeader.length - 1
      this.historyForm.tableHeader.push({ name: '', nameEn: 'selfName' + index })
      let list = this.historyForm.tableData
      for (let i = 0; i < list.length; i++) {
        this.$set(list[i]['selfName' + index], '')
      }
    },
    // 修改表头名fun
    setColName(index, val) {
      let head = this.historyForm.tableHeader
      this.$set(head[index], 'name', val)
      this.$forceUpdate()
      console.log(head, this.historyForm.tableHeader, 'head')
    },
    // 输入内容数据的fun
    setInputVal(e) {
      for (let i in this.historyForm.tableHeader) {
        if (this.historyForm.tableHeader[i].name === "") {
          this.isAddCol = false
        } else {
          this.isAddCol = true
        }
      }
      if (!this.isAddCol) {
        this.$message.success("请先填写完成所有表头内容，且确保无误！")
      }
    },
    // 右键单击选中行-确认是否删除行
    rightClickRowShowFun(row, column, event) {
      this.currentClickRow = row.index
      this.$confirm('此操作将永久删除当前行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRow(this.currentClickRow)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 右键单击选中行-确认是否删除列
    rightClickColShowFun(column, event) {
      this.currentClickCol = column.index
      if (this.currentClickCol <= 3) {
        this.$message({
          type: 'info',
          message: '当前列不支持删除！'
        })
      } else {
        this.$confirm('此操作将永久删除当前列, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCol(this.currentClickCol)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 给数据的row、column赋index，便于进行删除行、删除列
    tableClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex - 1
    },
    // 删除当前列
    deleteCol(index) {
      let nameCur = this.historyForm.tableHeader[index].nameEn
      for (const key in this.historyForm.tableData) {
        // 删除nameEn属性
        let data = this.historyForm.tableData[key]
        console.log(data[nameCur])
        delete data[nameCur]
      }
      console.log(this.historyForm.tableData)
      this.historyForm.tableHeader.splice(index, 1)
    },
  },
}
</script>
<style lang="scss" scoped>
.haplotype-detail {
  .add-column,
  .add-line {
    background: #f2f2f2;
    width: 30px;
    cursor: pointer;
    font-size: 30px;
    color: #00c561;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display: flex;
  }
  .add-line {
    height: 30px;
    width: 97%;
  }
  .headerBox {
    padding: 0px;
  }
}
</style>
