<template>
  <div class="warp-main">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="warp-tab">
      <el-tab-pane label="客人资料" name="first">
        <div class="main-top">
          <label>房间号：</label>
          <input/>
          <label>房间号：</label>
          <input/>
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
              prop="name"
              width="50px"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="cardnum"
              width="150"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="phonenum"
              width="100px"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="roomnum"
              width="60px"
              label="房间号">
            </el-table-column>
            <el-table-column
              prop="roomtype"
              label="房间类型">
            </el-table-column>
            <el-table-column
              prop="roomprice"
              width="70px"
              label="房价">
            </el-table-column>
            <el-table-column
              prop="indate"
              width="120px"
              label="入住时间">
            </el-table-column>
            <el-table-column
              prop="resdate"
              width="120px"
              label="预定时间">
            </el-table-column>
            <el-table-column
              prop="resleave"
              width="40px"
              label="预离">
            </el-table-column>
            <el-table-column
              prop="unit"
              width="40px"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="passsource"
              width="40px"
              label="客源">
            </el-table-column>
            <el-table-column
              prop="hourroom"
              width="70px"
              label="钟点房">
            </el-table-column>
            <el-table-column
              prop="pay"
              width="70px"
              label="付款">
            </el-table-column>
            <el-table-column
              prop="consume"
              width="70px"
              label="消费">
            </el-table-column>
            <el-table-column
              prop="prompt"
              label="催款">
            </el-table-column>
            <el-table-column
              prop="breakfast"
              label="含早">
            </el-table-column>
            <el-table-column
              prop="blacklist"
              label="黑名单">
            </el-table-column>
            <el-table-column
              prop="badrecord"
              width="70px"
              label="不良记录">
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
      <el-tab-pane label="客人发票信息" name="second">
        客人发票信息
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        value1:'',
        value2:'',
        activeName2: 'first',
        tableData :[{
            num : '001',
            name : 'jim',
            cardnum : '41225199408287039',
            phonenum :'17767259614',
            roomnum : '8301',
            roomtype : '风雅大床房',
            roomprice : '￥599.00',
            indate : '2018/05/20 8:00',
            resdate : '2018/05/21 12:00',
            resleave : '✔',
            unit : '',
            passsource : '',
            hourroom : '',
            pay : '',
            consume : '',
            prompt : 'no',
            breakfast : 'yes',
            blacklist : '无',
            badrecord : '无',
        }, {
            num : '001',
            name : 'jim',
            cardnum : '41225199408287039',
            phonenum :'17767259614',
            roomnum : '8301',
            roomtype : '风雅大床房',
            roomprice : '￥599.00',
            indate : '2018/05/20 8:00',
            resdate : '2018/05/21 12:00',
            resleave : '✔',
            unit : '',
            passsource : '',
            hourroom : '',
            pay : '',
            consume : '',
            prompt : 'no',
            breakfast : 'yes',
            blacklist : '无',
            badrecord : '无',
          }],
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
  .warp-main{
    .warp-tab{
      margin-left: 0.5%;
      width: 99%;
      .main-top{
        width: 100%;
        height: 40px;
        background: #F7F7F7;
        label{
          margin-left: 10px;
          font-size: small;
          color: #333333;
        }
        input{
          margin-top: 7.5px;
          width: 120px;
          height: 25px;
        }
        button{
          width: 80px;
          height: 30px;
          color: #fff;
          background: #4488E9;
          border: none;
          margin-left: 10px;
          border-radius: 4px;
        }
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
