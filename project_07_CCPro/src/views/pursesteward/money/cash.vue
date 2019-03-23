<template>
  <div class="cash">
    <!--头部的搜索-->
    <ul class="title">
      <li style="margin-left: 34px">
        <span>收银点 : </span>
        <el-select v-model="value" placeholder="请选择"  >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
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
        <span style="margin-right: 10px">收入</span>
        <el-checkbox v-model="checked"></el-checkbox>
      </li>
      <li>
        <span style="margin-right: 10px">支付 : </span>
        <el-checkbox v-model="checked"></el-checkbox>
      </li>
    </ul>
    <!--支付方式 -->
    <div class="shopping">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="现金" name="first">
          <!--账户种类 状态 ... -->
          <div class="status">
            <el-table
              :data="tableData"
              size="mini"
              :header-cell-style="{background:'#68819EFF',color:'white',}"
              height="460"
              style="width: 100%;">
              <el-table-column
                prop="date"
                label="收/支">
              </el-table-column>
              <el-table-column
                prop="name"
                width="110"
                label="对应账户类型">
              </el-table-column>
              <el-table-column
                prop="address"
                label="对应账户">
              </el-table-column>
              <el-table-column
                prop="address"
                label="对方账户">
              </el-table-column>
              <el-table-column
                prop="address"
                width="110"
                label="对方账户类型">
              </el-table-column>
              <el-table-column
                prop="address"
                label="收支原因">
              </el-table-column>
              <el-table-column
                prop="address"
                label="收银点">
              </el-table-column>
              <el-table-column
                prop="address"
                label="收支状态">
              </el-table-column>
              <el-table-column
                prop="address"
                label="付款方式">
              </el-table-column>
              <el-table-column
                prop="address"
                label="收支金额">
              </el-table-column>
              <el-table-column
                prop="address"
                label="币种">
              </el-table-column>
              <el-table-column
                prop="address"
                label="营业日期">
              </el-table-column>
              <el-table-column
                prop="address"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核状态">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核人">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核时间">
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
        </el-tab-pane>
        <el-tab-pane label="POS" name="second">POS</el-tab-pane>
        <el-tab-pane label="支付宝" name="third">支付宝</el-tab-pane>
        <el-tab-pane label="微信" name="routing">微信</el-tab-pane>
        <el-tab-pane label="AR" name="brew">
          <!--账户种类 状态 ... -->
          <div class="status">
            <el-table
              :data="tableData"
              size="mini"
              :header-cell-style="{background:'#68819EFF',color:'white',}"
              height="460"
              style="width: 100%;">
              <el-table-column
                prop="date"
                label="账户种类">
              </el-table-column>
              <el-table-column
                prop="name"
                width="110"
                label="对应业务类型">
              </el-table-column>
              <el-table-column
                prop="address"
                label="业务主体">
              </el-table-column>
              <el-table-column
                prop="address"
                label="账户状态">
              </el-table-column>
              <el-table-column
                prop="address"
                label="营业日期">
              </el-table-column>
              <el-table-column
                prop="address"
                label="业务时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="对应模块">
              </el-table-column>
              <el-table-column
                prop="address"
                label="是否团队">
              </el-table-column>
              <el-table-column
                prop="address"
                label="出账部门">
              </el-table-column>
              <el-table-column
                prop="address"
                label="冲转平帐">
              </el-table-column>
              <el-table-column
                prop="address"
                label="对应市场">
              </el-table-column>
              <el-table-column
                prop="address"
                label="总消费">
              </el-table-column>
              <el-table-column
                prop="address"
                label="支付款">
              </el-table-column>
              <el-table-column
                prop="address"
                label="余额">
              </el-table-column>
              <el-table-column
                prop="address"
                label="总开票">
              </el-table-column>
              <el-table-column
                prop="address"
                label="早餐">
              </el-table-column>
              <el-table-column
                prop="address"
                label="摘要">
              </el-table-column>
              <el-table-column
                prop="address"
                fixed="right"
                width="150"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" >删除</el-button>
                  <el-button size="small" >修改</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="预授权" name="payment ">预授权</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cash",
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
  .cash{
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
