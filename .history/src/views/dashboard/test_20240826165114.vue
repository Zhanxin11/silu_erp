<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-05-24 14:36:34
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-26 16:51:13
 * @FilePath: \v2-template\vue-element-admin\src\views\dashboard\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-select v-model="BusinesValue" class="select-Bus" multiple placeholder="请选择商号(必选)" filterable collapse-tags
          @change="selectPro(BusinesValue,1)" @remove-tag="removeTag(BusinesValue,1)">
          <el-option label="全选" value="全选" @click.native="selectAll(1)">全选</el-option>
          <el-option v-for="item in BusinesOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="padding: 0 10px" v-model="teamValues" multiple collapse-tags filterable placeholder="请选择团队">
          <el-option v-for="item in teamOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="OperationValues" multiple filterable collapse-tags placeholder="请选择运营">
          <el-option v-for="item in Operations" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
        <el-select @change="selectPro(spuValues,4)" @remove-tag="removeTag(spuValues,4)" style="padding: 0 10px"
          v-model="spuValues" multiple collapse-tags filterable placeholder="请选择spu">
          <el-option label="全选" value="全选" @click.native="selectAll(4)">全选</el-option>
          <el-option v-for="item in spuOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option> </el-select>
        <el-date-picker v-model="weekValue" type="week" format="yyyy 第 WW 周" placeholder="选择周">
        </el-date-picker>
        <el-date-picker style="margin: 0 10px" type="months" v-model="monthsValues" placeholder="选择一个或多个日期">
        </el-date-picker>
        <el-date-picker type="dates" v-model="dateValues" placeholder="选择一个或多个日期">
        </el-date-picker>
        <el-row>
          <el-button @click="openDialog" style="margin:10px 10px  10px 0">增加</el-button>
          <el-button @click="exportExcel" style="margin-right: 10px">下载</el-button>
          <el-button @click="reset" style="margin-right: 10px">重置</el-button>
        </el-row>
      </el-row>
      <el-table style="width: 100%; height: 100%; margin-top: 20px" border :data="tableData" id="table">
        <el-table-column prop="SPU" label="SPU" sortable></el-table-column>
        <el-table-column prop="sku计数" label="sku计数"></el-table-column>
        <el-table-column prop="开始时间" label="开始时间"></el-table-column>
        <el-table-column prop="结束时间" label="结束时间"></el-table-column>
        <el-table-column prop="销量" label="销量"></el-table-column>
        <el-table-column fixed="right" prop="edit" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="formData.id?'增加':'修改'" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item v-for="(value,key, index) in formData" label-width="100px" :key="index" :label="key" :prop="key">
          <el-input v-model="formData[key]" style="width: 90%;" :disabled="key=='id'"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="saveForm(formData)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getDemo, CreateDemo, changeDemo, DeleteDemoList } from '@/api/demo'
  import FileSaver from "file-saver"
  import XLSX from "xlsx"
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        formData: {},
        formLabelWidth: '120px',
        dialogFormVisible: false,
        BusinesValue: '',
        dateValues: '',
        weekValue: '',
        monthsValues: '',
        BusinesOptions: [
          {
            value: '选项1',
            label: '001'
          },
          {
            value: '选项2',
            label: '002'
          },
          {
            value: '选项3',
            label: '003'
          },
          {
            value: '选项4',
            label: '004'
          },
        ],
        teamValues: '',
        teamOptions: [
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
        OperationValues: '',
        Operations: [
          {
            value: '选项1',
            label: 'a'
          },
          {
            value: '选项2',
            label: 'b'
          },
          {
            value: '选项3',
            label: 'c'
          },
          {
            value: '选项4',
            label: 'd'
          },
        ],
        spuValues: '',
        // spuOptions: [
        //   {
        //     value: '选项1',
        //     label: 'spu1'
        //   },
        //   {
        //     value: '选项2',
        //     label: 'spu2'
        //   },
        //   {
        //     value: '选项3',
        //     label: 'spu3'
        //   },
        //   {
        //     value: '选项4',
        //     label: 'spu4'
        //   },
        // ],
      }
    },
    watch: {
      spuValues(a, b) {
        console.log(a, b)
        let selectOption = []

        this.spuValues.forEach(item => {
          this.spuOptions.forEach(i => {
            if (item == i.value) {
              selectOption.push(i.label)
            }
          })
        })
        this.tableData = this.tableData.filter(item => {
          return selectOption.includes(item.SPU)
        })
      }
    },
    computed: {
      getHeaders() {
        return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
      },
      spuOptions() {
        const filteredOptions = this.tableData.map((item, index) => {
          const i = { value: '选项' + (index + 1), label: item.SPU }
          return i
        })
        return filteredOptions
      }
    },
    methods: {
      async initData() {
        try {
          this.tableData = await getDemo()
          console.log(this.tableData)
          // 动态获取form
          this.formData = await Object.keys(this.tableData[0]).reduce((newObj, key) => {
            newObj[key] = '' // 设置新对象的每个键的值为null
            return newObj
          }, {})
          // console.log(this.tableData, this.formData, 'cs')
        } catch (err) {
          console.log('获取用户信息失败', err)
        }
      },
      // 商号全选、select全选
      selectAll(val) {
        let selectItem
        let selectValue
        if (val == 1) {
          selectValue = this.BusinesValue
          selectItem = this.BusinesOptions
        } else {
          selectValue = this.spuValues
          selectItem = this.spuOptions
        }
        if (selectValue.length < selectItem.length) {
          selectValue = []
          selectItem.map((item) => {
            selectValue.push(item.value)
          })
          selectValue.unshift('全选')
        } else {
          selectValue = []
        }
        if (val == 1) {
          this.BusinesValue = selectValue
          // this.BusinesOptions = selectItem
        } else {
          this.spuValues = selectValue
          // this.spuOptions = selectItem
        }
      },
      // 商号下拉
      selectPro(val, num) {
        let selectItem
        let selectValue = [...val]
        if (num == 1) {
          selectItem = this.BusinesOptions
        } else {
          selectItem = this.spuOptions
        }
        if (!selectValue.includes('全选') && selectValue.length === selectItem.length) {
          selectValue.unshift('全选')
        }
        if (selectValue.includes('全选') && selectValue.length !== selectItem.length + 1) {
          selectValue = selectValue.filter((item) => {
            return item !== '全选'
          })
        }
        if (num == 1) {
          this.BusinesValue = selectValue
        } else {
          this.spuValues = selectValue
        }
      },
      // 删除tag
      removeTag(val, num) {
        // console.log(val, num)
        if (val.includes('全选') && num === 1) {
          this.BusinesValue = []
          this.initData()
        } else if (val.includes('全选') && num === 4) {
          this.spuValues = []
          this.initData()
        }
      },
      // 打开对话框
      async openDialog() {
        this.dialogFormVisible = true
        this.formData = await Object.keys(this.tableData[0]).reduce((newObj, key) => {
          newObj[key] = null // 设置新对象的每个键的值为null
          return newObj
        }, {})
      },
      // 保存：添加or修改
      saveForm(data) {
        const id = data.id
        for (var key in data) {
          if (key == 'id') {
            delete data[key]
          }
        }
        if (!id) {
          console.log(this.tableData.every(item => item.SPU == data.SPU))
          CreateDemo(data).then(response => {
            console.log('请求成功:', response)
            this.dialogFormVisible = false
            this.initData()
            // 处理响应数据...
          }).catch(error => {
            console.error('请求失败:', error)
            this.initData()
            // 处理错误...
          })
        } else {
          console.log(data, 'xiugai')
          changeDemo(id, data).then(response => {
            console.log('请求成功', response)
            this.dialogFormVisible = false
            this.initData()
            // 处理响应数据...
          }).catch(error => {
            console.error('请求失败:', error)
            this.initData()
            // 处理错误...
          })
          this.dialogFormVisible = false
        }
      },
      // 打开编辑
      handleEdit(a, b) {
        this.dialogFormVisible = true
        this.formData = b
      },
      // 删除
      handleDelete(a, b) {
        DeleteDemoList(b.id).then(response => {
          console.log('请求成功:', response)
          this.initData()
          // 处理响应数据...
        }).catch(error => {
          console.error('请求失败:', error)
          if (error.response) {
            console.error('状态码:', error.response.status)
          } else if (error.request) {
            // error.request 来获取请求的配置信息
          }
          this.initData()
          // 处理错误...
        })
      },
      // 下载
      exportExcel() {
        let wb
        let table = document.querySelector("#table")
        // 注意：这里不处理.el-table__fixed，因为它通常是一个独立的表格或表格部分
        wb = XLSX.utils.table_to_book(table)
        let wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        })
        try {
          // 文件名可以自定义
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
            "仪表数据.xlsx"
          )
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout)
        }
        return wbout
      },
      // 重置
      reset() {
        this.initData()
      }
    },
    created() {
      this.initData()
    },
    mounted() {

    },

  };
</script>
<style lang="scss" scoped>
</style>