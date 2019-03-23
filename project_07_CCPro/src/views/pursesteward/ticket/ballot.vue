<template>
  <div class="ballot">
    <!--头部的搜索-->
    <ul class="title">
      <li>
        <div class="block">
          <span class="demonstration">营业日期起 :</span>
          <el-date-picker
            style="width: 150px;"
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </li>
      <li>
        <div class="block">
          <span class="demonstration">营业日期止 :</span>
          <el-date-picker
            style="width: 150px;"
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </li>
      <li>
        <span style="margin-right: 10px">个人 ：</span>
        <el-checkbox v-model="checked"></el-checkbox>
      </li>
      <li>
        <span style="margin-right: 10px"> 公司 ：</span>
        <el-checkbox v-model="checked"></el-checkbox>
      </li>
    </ul>
    <!--支付方式 -->
    <div class="shopping">
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="tableData"
          size="mini"
          height="520"
          :header-cell-style="{background:'#68819EFF',color:'white',}"
          style="width: 100%;">
          <el-table-column
            prop="date"
            label="单据种类">
          </el-table-column>
          <el-table-column
            prop="name"
            width="110"
            label="个人/公司">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票1">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票2">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票3">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票4">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票5">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票6">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票7">
          </el-table-column>
          <el-table-column
            prop="address"
            label="票8">
          </el-table-column>
          <el-table-column
            prop="address"
            width="120"
            label="是否合并开票">
          </el-table-column>
          <el-table-column
            prop="address"
            width="100"
            label="总开票金额">
          </el-table-column>
          <el-table-column
            prop="address"
            width="160"
            label="合并开票账户的数量">
          </el-table-column>
          <el-table-column
            prop="address"
            label="开票日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="开票人">
          </el-table-column>
          <el-table-column
            prop="address"
            label="复核日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="复核人">
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
        name: "ballot",
        data() {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
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
  .ballot{
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
      margin-top: 20px;

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
