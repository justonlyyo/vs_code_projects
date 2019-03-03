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
        // 请求会员计划tabs数据

  //设置请求路径
            let url ="http://47.98.113.173:8098/v1/customer/member/get_card_type_list/",
              _this=this;
  // 发送请求:将数据返回到一个回到函数中
  // 并且响应成功以后会执行then方法中的回调函数
            axios.get(url).then(function(res) {
               if (res.data.message=="success"){
                 console.log(res.data.data.count);
                 _this.list=res.data.data.results;
                 console.log(_this.list)
                  _this.total=res.data.data.count
               }
            }).catch((error) => {
              _this.$message.error('请求服务器失败，稍后重试');
            });
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
