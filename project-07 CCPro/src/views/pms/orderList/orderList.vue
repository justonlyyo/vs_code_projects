<template>
  <div>
    <el-card class="box-card">
      <div class="top_half">
        <div>
          <button class="btn" @click="showcout"></button>
        </div>
        <div>
          <img src="../../../assets/images/pms/orderList/room-typeinfo.png"/><span>房型信息</span>
        </div>
        <div>
          <el-table
            :data="tableData3"
            max-height="200"
            border
            style="width: 100%"
            size="small"
            :header-cell-style="{background:'#F4F4F4'}">
            <el-table-column
              prop="housetype"
              label="房型">
            </el-table-column>
            <el-table-column
              prop="houseprice"
              label="房价" :cell-style="{color: '#FF3B3B'}">
            </el-table-column>
            <el-table-column
              prop="reserve"
              label="预定">
            </el-table-column>
            <el-table-column
              prop="profits"
              label="已分">
            </el-table-column>
            <el-table-column
              prop="live"
              label="已住">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bottom_half">
        <div>
          <img src="../../../assets/images/pms/orderList/room-typeinfo.png"/><span>预定列表</span>
        </div>
        <div>
          <span>来店时间：</span>
          <el-date-picker
            v-model="value6"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            size="small"
            range-separator="至">
          </el-date-picker>
          <span> 编号：</span>
          <input/>
          <span> 预订人：</span>
          <input/>
          <span> 电话：</span>
          <input type="number"/>
          <span> 状态：</span>
          <el-select v-model="value8" filterable placeholder="请选择"  size="small" style="width: 8rem">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 1rem"> 当前数量：</span>
          <span> 0</span>
          <span> 订房数：</span>
          <span> 0</span>
          <span> 当前分房：</span>
          <span> 0</span>
        </div>
        <div>
          <el-table
            :data="tableData4"
            max-height="250"
            style="width: 100%"
            size="small" stripe="true"
            :header-cell-style="{background:'#303A41'}">
            <el-table-column
              prop="serialnum"
              label="预定编号">
            </el-table-column>
            <el-table-column
              prop="dueperson"
              label="预订人" style="color: #FF3B3B">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="princesch"
              label="房价方案">
            </el-table-column>
            <el-table-column
              prop="subscription"
              label="订金">
            </el-table-column>
            <el-table-column
              prop="roomnum"
              label="订房数">
            </el-table-column>
            <el-table-column
              prop="gettime"
              label="预抵时间">
            </el-table-column>
            <el-table-column
              prop="leavetime"
              label="预离时间">
            </el-table-column>
            <el-table-column
              prop="restime"
              label="预定时间">
            </el-table-column>
            <el-table-column
              prop="retaimtime"
              label="保留时间">
            </el-table-column>
            <el-table-column
              prop="operperson"
              label="操作人">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="ordernum"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作">
            </el-table-column>

          </el-table>
        </div>
        <div>
          <span>当前合计：</span>
          <span>￥500</span>
          <span>订金：</span>
          <span>￥500</span>
        </div>
        <div>
          <img src="../../../assets/images/pms/orderList/room-typeinfo.png" style="margin-left: 10px;"/>
          <span class="rowhouse">排房列表</span>
        </div>
        <div>
          <span> 房型：</span>
          <el-select v-model="value8" filterable placeholder="请选择"  size="small" style="width: 8rem">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span> 编号：</span>
          <input/>
          <button class="btn">快速分房</button>
          <button class="btn">保存</button>
          <button class="btn">批量制卡</button>
        </div>
      </div>
    </el-card>
    <div class="popContainer" v-if="!show">
            <div class="add-info-card">
              <div class="add-header">
                <span>新增预定</span>
                <span class="el-icon-close" @click="showcout"></span>
              </div>
              <div>
                <span>预订信息</span>
              </div>
              <div class="add-form">
              <!--这里是新增信息的窗体-->
              </div>
              <div>
                <span>房型信息</span>
              </div>
              <div>
                <el-table
                    :data="tableData5"
                    max-height="250"
                    style="width: 99%"
                    size="small"
                    :header-cell-style="{background:'#68819E',color:'white'}">
                    <el-table-column
                      prop="roomtype"
                      label="房间类型" width="140px">
                    </el-table-column>
                    <el-table-column
                      prop="count"
                      label="总数">
                    </el-table-column>
                    <el-table-column
                      prop="inlive"
                      label="在住">
                    </el-table-column>
                    <el-table-column
                      prop="eta"
                      label="预抵">
                    </el-table-column>
                    <el-table-column
                      prop="maintain"
                      label="维修">
                    </el-table-column>
                    <el-table-column
                      prop="inonself"
                      label="自用">
                    </el-table-column>
                    <el-table-column
                      prop="departure"
                      label="预离">
                    </el-table-column>
                    <el-table-column
                      prop="canorder"
                      label="可订">
                    </el-table-column>
                    <el-table-column
                      prop="roomprice"
                      label="房型价格">
                    </el-table-column>
                    <el-table-column
                      prop="resprice"
                      label="预定价格">
                    </el-table-column>
                    <el-table-column
                      prop="rescount"
                      label="预定数量">
                    </el-table-column>
                  </el-table>
              </div>
              <div class="last-btn">
                <button>取消</button>
                <button>保存</button>
              </div>
            </div>
    </div>
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
    /**
     * 数据渲染层
     * @returns {{value6: string,
     * tableData3: *[],
     * tableData4: {serialnum: string, dueperson: string, phone: string, princesch: string, subscription: string, roomnum: string, gettime: string, leavetime: string, restime: string, retaimtime: string, operperson: string, status: string, ordernum: string, remark: string, operation: string}[],
     * options: *[], value8: string}}
     */
    data() {
      return {
        show:true,
        value6: '',
        tableData3: [{
          housetype: '舒适大床房',
          houseprice: '￥588.00',
          reserve: '10',
          profits:'10',
          live:'10'
        },{
          housetype: '舒适双床房',
          houseprice: '￥598.00',
          reserve: '10',
          profits:'10',
          live:'10'
        },{
          housetype: '舒适家庭房',
          houseprice: '￥698.00',
          reserve: '10',
          profits:'10',
          live:'10'
        },{
          housetype: '风雅商务大床房',
          houseprice: '￥798.00',
          reserve: '10',
          profits:'10',
          live:'10'
        },{
          housetype: '风雅商务双床房',
          houseprice: '￥888.00',
          reserve: '10',
          profits:'10',
          live:'10'
        },{
          housetype: '风雅商务房',
          houseprice: '￥988.00',
          reserve: '10',
          profits:'10',
          live:'10'
        }],
        tableData4: [{
          serialnum: '0001875',
          dueperson: '彭莹',
          phone: '13845782549',
          princesch:'方案1',
          subscription:'￥500.00',
          roomnum :"5",
          gettime : "2018-05-20",
          leavetime :"2018-05-21",
          restime :"2018-05-20",
          retaimtime : "1天",
          operperson : "mr mary",
          status : "0",
          ordernum : "012214587",
          remark : "无",
          operation : "删除"

        }],
        tableData5: [{
          roomtype: '风雅大床房',
          count: '10',
          inlive: '',
          eta:'',
          maintain:'',
          inonself :"5",
          departure : "2018-05-20",
          canorder :"5",
          roomprice :"￥588.00",
          resprice : "￥500.00",
          rescount : "1",
        },{
          roomtype: '风雅大床房',
          count: '10',
          inlive: '',
          eta:'',
          maintain:'',
          inonself :"5",
          departure : "2018-05-20",
          canorder :"5",
          roomprice :"￥588.00",
          resprice : "￥500.00",
          rescount : "1",
      }],
        options: [{
          value: '选项1',
          label: '入住'
        }, {
          value: '选项2',
          label: '将离'
        }, {
          value: '选项3',
          label: '在住'
        }, {
          value: '选项4',
          label: '拒绝'
        }, {
          value: '选项5',
          label: '推迟'
        }],
        value8: ''
      }
    },
  }
</script>
<style scoped>
  .top_half div{
    margin-top: 10px;
  }
  .bottom_half div{
    margin-top: 10px;
  }
  .top_half div:nth-child(2) img{
    margin-left: 10px;
  }
  .top_half div:nth-child(2) span{
    color: #777777;
    font-size: 14px;
    margin-left: 5px;
    font-family: PingFangSC-Regular;
  }
  .bottom_half div:nth-child(1) img{
    margin-left: 10px;
  }
  .bottom_half div:nth-child(1) span{
    color: #777777;
    font-size: 14px;
    margin-left: 5px;
    font-family: PingFangSC-Regular;
  }
  .bottom_half div:nth-child(2) span{
    color: #777777;
    font-size: 14px;
    margin-left: 2px;
  }
  .bottom_half div:nth-child(2) input{
    width:100px;
    height:30px;
    border-radius:4px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(204,204,204,1);
  }
  .bottom_half div:last-child input{
    width:100px;
    height:30px;
    border-radius:4px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(204,204,204,1);
  }
  .bottom_half div:last-child button{
    width:100px;
    height:30px;
    background:rgba(68,136,233,1);
    border-radius:4px;
    margin-left: 4px;
  }
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
    background-image: url("../../../assets/images/pms/orderList/addinfo.png");
  }
  /*form表单的样式*/
  .add-form{
    margin-top: 14px;
    margin-bottom: 14px;
  }
  .add-form label{
    margin-left: 18px;
  }
  .add-form input{
    width: 140px;
    height: 30px;
    border: none;
    padding: 5px;
  }

  /**
  预定基础信息样式
  */
  .box-card {
    width: 99%;
    margin: 0% 0.5%;
  }
  .rowhouse{
    color: #777777;
    font-size: 14px;
    margin-left: 4px;
    font-family: PingFangSC-Regular;
  }
  /**
  新增订单的样式
   */
  /*蒙层样式*/
  div.popContainer{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
  }
  .add-info-card{
    position: absolute;
    width: 80%;
    margin: 5% 10%;
    background:rgba(246,250,255,1);
  }
  .add-header{
    width: 100%;
    height: 40px;
    border-radius: 2px;
    background:rgba(48,58,65,1);
  }
  .add-info-card div:first-child span{
    font-size: 15px;
    color: #FFFFFF;
    font-family: PingFangSC-Regular;
    line-height: 40px;
    margin-left: 20px;
  }
  .add-info-card div:first-child span:last-child{
    float: right;
    margin-right: 1.5rem;
  }
  .add-info-card div:nth-child(even) span{
    margin: 14px 0px 14px 19px;
    color: #333333;
    font-weight: bold;
  }
  .add-info-card div:nth-child(5){
    margin-top: 5px;
    margin-left: 14px;
  }
  .add-info-card div:last-child button{
    width:70px;
    height:30px;
    border: none;
    margin-top: 14px;
    background:rgba(104,129,158,1);
    border-radius:4px;
  }
  .last-btn{
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .last-btn button{
    color: #ffffff;
    margin-left: 5rem;
  }

</style>
