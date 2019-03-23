<template>
  <div class="cashiers">
    <!--票据种类 -->
    <div class="shopping">
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="tableData"
          size="mini"
          height="570"
          :header-cell-style="{background:'#68819EFF',color:'white',}"
          style="width: 100%;">
          <el-table-column
            prop="name"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="address"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="address"
            label="上缴现金">
          </el-table-column>
          <el-table-column
            prop="address"
            label="营业日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="开账次数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="开账时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="开账人">
          </el-table-column>
          <el-table-column
            prop="address"
            label="开账备用金">
          </el-table-column>
          <el-table-column
            prop="address"
            label="关账日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="关账用户">
          </el-table-column>
          <el-table-column
            prop="address"
            label="关账备用金">
          </el-table-column>
          <el-table-column
            prop="ad"
            width="180 "
            fixed="right"
            label="操作">
            <template slot-scope="scope" >
              <el-button  size="mini" type="danger"  >删除</el-button>
              <el-button size="mini" >修改</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination style="float: right;margin-right: 2%"
                       layout="prev, pager, next"
                       :page-size="pagesize"
                       @current-change="handleCurrentChange"
                       :total="total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "cashiers",
        data() {
        return {
          // 时间
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          value1: '',
          value2: '',
          checked:false,
          //  账户状态...
          tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
          multipleSelection: [],
          //分页
          total:20,
          pagesize:5,
          //消费清单
          activeName2: 'first',

        }
      },
         methods: {
        //账户状态
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //消费清单的table
        handleClick(tab, event) {
          console.log(tab, event);
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/common/module/info_list",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
      }
    }
</script>

<style lang="less" scoped>
  .cashiers{
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow: hidden;
    .title{
      margin-top: 23px;
      min-width:1200px ;
      li{
        display: inline-block;
        margin-left: 10px;
        button{
          width:80px;
          height:30px;
          background:rgba(68,136,233,1);
          border: none;
          border-radius:4px;
          color: white;
          margin-left: 20px;
        }
      }
    }
    .shopping{
      /*margin-top: 20px;*/
      .shopping_title{
        li{
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
  }
</style>
<style>
  .el-table .cell{
    text-align:center;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    z-index: 0;
  }
</style>
