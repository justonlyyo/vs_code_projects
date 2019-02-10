<template>
  <div :style="{backgroundColor:''}">
    <div class="right" :style="{width:'100%',height:'100%',float:'left',position: 'relative',top: '10px',left:'10px'}">
      <template>
        <!--tabs标签-->
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="会员列表" name="first">
            <div :style="{width:'100%',height:'1010px'}">
              <div class="menu" :style="{width:'98%',height:'40px',background:'rgba(247,247,247,1)'}">
                <ul>
                  <li>
                    <input type="text" value="会员卡号/姓名" placeholder="会员卡号/姓名" :style="{border:'1px solid rgba(204,204,204,1)',width:'150px',height:'30px',borderRadius:'2px'}"/>
                  </li>
                  <li>
                    <button :style="{backgroundColor:'#4488E9',borderRadius:'4px',border:'0px',width:'75px',height:'30px',color:'white'}">会员列表</button>
                  </li>
                  <li>
                    <button :style="{backgroundColor:'#4488E9',borderRadius:'4px',border:'0px',width:'75px',height:'30px',color:'white'}">添加</button>
                  </li>
                </ul>
              </div>
              <div :style="{float:'left',position: 'relative',left:'10px',top:'25px',right:'10px',width:'98%'}">
                <template>
                  <Table :data="tableData1" :columns="tableColumns1" stripe>
                    <template slot-scope="{ row, index }" slot="action">
                      <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
                      <Button type="error" size="small" @click="remove(index)">删除</Button>
                    </template>
                  </Table>
                  <div style="margin: 45px 10px;overflow: hidden">
                    <!--页码-->
                    <div style="float: right;width: 380px;">
                      <Page :total="100" :current="1" @on-change="changePage"></Page>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="..." name="second">
            <!--基本信息表格-->
            <div :style="{height:'1010px'}">
              <div class="basic_info">
                <div class="basic_head">
                  <span :style="{position:'relative',left:'21px',top:'12px',color:'white'}">基本信息</span>
                  <span >
                    <img :style="{width:'14px',height:'14px',float:'right',position: 'relative',top:'14px',right:'13px'}" src="../../assets/images/member/errorimg.png" />
                  </span>
                </div>
                <div class="basic_body">
                  <div class="base_left">
                    <div>
                      <label>姓名：</label>
                      <input />
                    </div>
                    <div>
                      <label>称呼：</label>
                      <input />
                    </div>
                    <div class="base_left_three">
                      <label>性别：</label>
                      <radio>男</radio>
                      <radio style="margin-left: 3rem">女</radio>
                    </div>
                  </div>
                  <div class="base_right">
                    <div>
                      <label>房间号：</label>
                      <input />
                    </div>
                    <div>
                      <div style="margin-left: 1rem">
                        <label >备注：</label>
                      </div>
                      <textarea></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="base_identity">
                <div class="basic_iden_head">
                  <span :style="{position:'relative',left:'21px',top:'12px',color:'white'}">身份信息</span>
                  <span >
                    <img :style="{width:'14px',height:'14px',float:'right',position: 'relative',top:'14px',right:'13px'}" src="../../assets/images/member/errorimg.png" />
                  </span>
                </div>
                <div class="basic_iden_body">
                  <div class="base_iden_left">
                    <div>
                      <label>证件类型：</label>
                      <input />
                    </div>
                    <div>
                      <label>证件号码：</label>
                      <input />
                    </div>
                    <div style="margin-left:4.7rem">
                      <label>生日：</label>
                      <input style="width: 120px;height: 30px" />
                      <div style="margin-left: 14rem;margin-top: -2rem">
                        <img style="height: 22px;width: 22px" src="../../assets/images/member/calendar.png"/>
                      </div>
                    </div>
                  </div>
                  <div class="base_iden_right">
                    <div>
                      <label>国籍：</label>
                      <input />
                    </div>
                    <div>
                      <label>语种：</label>
                      <input />
                    </div>
                    <div>
                      <label>民族：</label>
                      <input />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName2: 'first',
        tableColumns1: [
          {
            type: 'selection',
            title: 'Name',
            key: 'name'
          },
          {
            title: '会员卡号',
            key: 'idcard',
          },
          {
            title: '会员姓名',
            key: 'name'
          },
          {
            title: '会员计划',
            key: 'plan'
          },
          {
            title: '会员等级',
            key: 'scale'
          },
          {
            title: '手机号码',
            key: 'tel_num'
          },
          {
            title: 'OpenId',
            key: 'openid'
          },
          {
            title: '身份证号',
            key: 'id_num'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        tableData1:[
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '铂金卡'
          },
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '铂金卡'
          },
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '普卡'
          },
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '普卡'
          },
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '普卡'
          },
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '普卡'
          },
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '普卡'
          },
          {
            name: 'John Brown',
            idcard:'SC1001',
            plan: '股东',
            scale: '普卡'
          }
        ],
        columns12: [
          {
            type: 'selection',
            title: '全选',
            slot: 'name'
          },
          {
            title: '会员卡号',
            key: 'idcard'
          },
          {
            title: '会员姓名',
            key: 'name'
          },
          {
            title: '会员计划',
            key: 'plan'
          },
          {
            title: '会员等级',
            key: 'scale'
          },
          {
            title: '手机号码',
            key: 'tel_num'
          },
          {
            title: 'OpenId',
            key: 'openid'
          },
          {
            title: '身份证号',
            key: 'id_num'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data6: [


        ],
        data1: [
          {
            name: '',
            age: 18,
            address: 'New York No. 1 Lake Park',
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
        show (index) {
          this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.tableData1[index].name}<br>Age：${this.tableData1[index].age}<br>Address：${this.tableData1[index].address}`
          })
        },
        remove (index) {
          this.tableData1.splice(index, 1);
        },
    }
  }
</script>

<style scoped>
  .menu{
    position: relative;
    top: 14px;
    left: 10px;
  }
  .menu ul{
    list-style: none; /*去掉ul前面的符号*/
    width: auto;
  }
  .menu ul li{
    float: left;
    padding: 5px 5px 5px 65px;
  }
  /*基本信息样式*/
  .basic_info{
    background-color: #F6FAFF;
    height: 240px;
    width: 540px;
    float: left;
    margin-left: 2rem;
  }
  .basic_head{
    width:540px;
    height:40px;
    background:rgba(48,58,65,1);
  }
  .base_left{
    width: 45%;
    height: 200px;
    /*border:1px solid red;*/
    float: left;
  }
  .base_right{
    width: 45%;
    height: 200px;
    /*border:1px solid red;*/
    float: right;
  }
  .base_left div{
    margin-top: 2rem;
    margin-left:30px ;
  }
  .base_left div label{
    font-size: large;
    font-weight: bold;
  }
  .base_left div input{
    width: 150px;
    height: 30px;
  }
  .base_left div:first-child{
    margin-top: 1rem;
  }
  .base_right div{
    margin-top: 2rem;
  }
  .base_right div label{
    font-size: large;
    font-weight: bold;
  }
  .base_right div input{
    width: 150px;
    height: 30px;
  }
  .base_right div:first-child{
    margin-top: 1rem;
  }
  .base_right textarea{
    width: 150px;
    height: 100px;
    margin-left: 5.5rem;
    margin-top: -1.5rem;
  }
  /*身份信息样式*/
  .base_identity{
    margin-right: 35rem;
    border: 1px solid red;
    background-color: #F6FAFF;
    height: 240px;
    width: 540px;
    float: right;
  }
  .basic_iden_head{
    width:540px;
    height:40px;
    background:rgba(48,58,65,1);
  }
  .base_iden_left{
    width:55%;
    height: 200px;
    border:1px solid red;
    float: left;
  }
  .base_iden_right{
    width: 45%;
    height: 200px;
    /*border:1px solid red;*/
    float: right;
  }
  .base_iden_left div{
    margin-top: 2rem;
    margin-left:30px ;
  }
  .base_iden_left div label{
    font-size: large;
    font-weight: bold;
  }
  .base_iden_left div input{
    width: 150px;
    height: 30px;
  }
  .base_iden_left div:first-child{
    margin-top: 1rem;
  }
  .base_iden_right div{
    margin-top: 2rem;
  }
  .base_iden_right div label{
    font-size: large;
    font-weight: bold;
  }
  .base_iden_right div input{
    width: 150px;
    height: 30px;
  }
  .base_iden_right div:first-child{
    margin-top: 1rem;
  }
  .base_iden_three div input{
    width: 100px;
    height: 30px;
  }
</style>
