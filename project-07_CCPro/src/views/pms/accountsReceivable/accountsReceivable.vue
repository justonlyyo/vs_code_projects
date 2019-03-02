<template>
  <div class="warp-main">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="warp-tab">
      <el-tab-pane label="已结账" name="first">
        <div class="main-top">
          <label>入住时间：</label>
          <el-date-picker
            v-model="value1"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>离店时间：</label>
          <el-date-picker
            v-model="value2"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>结账营业日期：</label>
          <el-date-picker
            v-model="value2"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>姓名：</label>
          <input style="width: 70px"/>
          <input placeholder="手机号"/>
          <input placeholder="房间号" style="width: 50px"/>
          <input placeholder="团队名称" style="width: 60px"/>
          <input placeholder="账单编号"/>
          <button>查询</button>
          <button>打印</button>
          <button>导出Excel</button>
        </div>
        <div>

        </div>
        <div class="main-table">
          <el-table
            :data="tableData"
            stripe
            size="mini"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small'}"
            style="width: 100%">
            <el-table-column
              prop="num"
              width="50px"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="billnum"
              width="60px"
              label="账单号">
            </el-table-column>
            <el-table-column
              prop="teamname"
              width="100"
              label="团队名称">
            </el-table-column>
            <el-table-column
              prop="roomnum"
              width="60px"
              label="房间号">
            </el-table-column>
            <el-table-column
              prop="guestname"
              width="60px"
              label="客人姓名">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              width="60px">
            </el-table-column>
            <el-table-column
              prop="guestsource"
              width="70px"
              label="客源">
            </el-table-column>
            <el-table-column
              prop="roomprice"
              width="100px"
              label="房价">
            </el-table-column>
            <el-table-column
              prop="hourroom"
              width="100px"
              label="钟点房">
            </el-table-column>
            <el-table-column
              prop="phone"
              width="120px"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="inlivetime"
              width="140px"
              label="入住时间">
            </el-table-column>
            <el-table-column
              prop="leavetime"
              width="140px"
              label="预离/挂账时间">
            </el-table-column>
            <el-table-column
              prop="settletime"
              width="120px"
              label="结账时间">
            </el-table-column>
            <el-table-column
              prop="businetime"
              width="120px"
              label="结账营业日期">
            </el-table-column>
            <el-table-column
              prop="invoice"
              width="70px"
              label="开票">
            </el-table-column>
            <el-table-column
              prop="opeartion"
              label="操作人">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a
                  size="mini"
                  style="cursor: pointer"
                  @click="handleDelete(scope.$index)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="临客账" name="second">
        <div class="main-top">
          <label>姓名：</label>
          <input style="width: 70px"/>
          <label>入住时间：</label>
          <el-date-picker
            v-model="value1"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>离店时间：</label>
          <el-date-picker
            v-model="value2"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <input placeholder="手机号"/>
          <input placeholder="房间号" style="width: 50px"/>
          <input placeholder="团队名称" style="width: 60px"/>
          <input placeholder="账单编号"/>
          <button>查询</button>
          <button>打印</button>
          <button>导出Excel</button>
        </div>
        <div>
        </div>
        <div class="main-table">
          <el-table
            :data="tableData"
            stripe
            size="mini"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small'}"
            style="width: 100%">
            <el-table-column
              prop="num"
              width="50px"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="billnum"
              width="60px"
              label="账单号">
            </el-table-column>
            <el-table-column
              prop="teamname"
              width="100"
              label="团队名称">
            </el-table-column>
            <el-table-column
              prop="roomnum"
              width="60px"
              label="房间号">
            </el-table-column>
            <el-table-column
              prop="guestname"
              width="60px"
              label="客人姓名">
            </el-table-column>
            <el-table-column
              prop="guestsource"
              width="70px"
              label="客源">
            </el-table-column>
            <el-table-column
              prop="roomprice"
              width="100px"
              label="房价">
            </el-table-column>
            <el-table-column
              prop="balance"
              width="100px"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="phone"
              width="120px"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="hourroom"
              width="100px"
              label="钟点房">
            </el-table-column>

            <el-table-column
              prop="inlivetime"
              width="140px"
              label="抵达日期">
            </el-table-column>
            <el-table-column
              prop="leavetime"
              width="140px"
              label="挂账日期">
            </el-table-column>
            <el-table-column
              prop="invoice"
              width="70px"
              label="开票">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="reception"
              label="接待人员">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a
                  size="mini"
                  style="cursor: pointer"
                  @click="handleDelete(scope.$index)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="哑房账" name="three" class="three">
        <div>
          <button class="btn"></button>
        </div>
        <div class="main-top">
            <label>姓名：</label>
            <input style="width: 70px"/>
            <label>入住时间：</label>
            <el-date-picker
              v-model="value1"
              type="datetime"
              size="mini"
              prefix-icon="el-icon-date"
              style="width: 177px"
              placeholder="选择日期时间">
            </el-date-picker>
            <input placeholder="账单编号"/>
            <button>查询</button>
            <button>打印</button>
            <button>导出Excel</button>
        </div>
        <div class="main-table">
          <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="日期"
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    /**
     * 方法层
     */
    methods: {
      showcout:function () {
        this.show = !this.show;
      }
    },
    data: function(){
      return {
        value1:'',
        value2:'',
        activeName2: 'first',
        tableData :[
          ],
      };
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //删除
      handleDelete(index) {
        this.tableData.splice(index,1)
      }
    }
  }
</script>
<style lang="less" scoped>
  /**
   客人资料css样式
   */
  //导航栏的样式
  .all-label-input{
    label{
      margin-left: 10px;
      font-size: x-small;
      color: #333333;
    }
    input{
      margin-top: 7.5px;
      width: 110px;
      height: 25px;
      border: RGB(220 223 230);
      border-radius: 2px;
    }
    button{
      width: 65px;
      height: 30px;
      color: #fff;
      background: #4488E9;
      border: none;
      margin-left: 10px;
      border-radius: 4px;
    }
  }
  .warp-main{
    .warp-tab{
      margin-left: 0.5%;
      width: 99%;
      .main-top{
        width: 100%;
        height: 40px;
        background: #F7F7F7;
        .all-label-input
      }
      //第三部分样式
      .three{
        .btn{
          margin-top: -10px;
          width:80px;
          height:30px;
          border-radius:4px;
          border: none;
          color: #FFFEFE;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          line-height: 30px;
          background-image: url("../../../assets/images/pms/accountsReceivable/addinfo.png");
        }
        .all-label-input
      }
    }
  }
  .main-table{
    margin-top: 10px;
  }
  .el-tabs--top.el-tabs--border-card .el-tabs__item.is-active{
    //border: none;
    border-top: 2px solid #4488E9;
  }
</style>
