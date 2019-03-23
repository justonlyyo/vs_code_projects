<template>
  <div>




    <p>this is  模块销售管理</p>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="descript"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_user"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="modify_datetime"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      @current-change="handleCurrentChange"
    :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        name: "module-sales-management",
      data() {
        return {
          //代表每页显示的条数
          pagesize:1,
          total:0,
          list:[],
          curPage:'',
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      created: function () {

          },
      methods: {
        handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          this.curPage=curPage;

        }
      }

    }
</script>

<style scoped>

</style>
