<template>

  <div class="hotel" >
    <div class="left">
      <div class="message">
        <p>基本信息</p>
        <ul>
          <li> <span style="vertical-align:top;">酒店全称：</span><div ></div></li>
          <li> <span>酒店简称：</span><div ></div></li>
          <li> <span>代码：</span><div ></div></li>
          <li style="height: 46px;line-height: 46px">
            <span>审核状态：</span>
            <el-checkbox v-model="checked" disabled style="display: inline-block">已通过</el-checkbox>
            <el-checkbox v-model="checked" disabled style="display: inline-block">未通过</el-checkbox>
          </li>
          <li> <span>中文描述：</span><div ></div></li>
          <li> <span>英文描述：</span><div ></div></li>
        </ul>

      </div>
      <div class="contact">
        <p>联系方式</p>
        <ul>
          <li> <span>总计：</span><div ></div></li>
          <li> <span>国家：</span><div ></div></li>
          <li> <span>订房电话：</span><div ></div></li>
          <li> <span>州/省：</span><div ></div></li>
          <li> <span>服务电话：</span><div ></div></li>
          <li> <span>城市：</span><div ></div></li>
          <li> <span>传真：</span><div ></div></li>
          <li style="height: 46px;vertical-align: top">
            <span style="width: 132px;vertical-align: top;margin-top: 5px">地理位置经纬度：</span>
            <span style="font-size: 16px ;vertical-align: top ;margin-left: 20px;margin-top: 5px;width: 40px;" >东经：</span>
            <span style="width: 50px;height: 40px; border: 1px solid rgba(204,204,204,1);margin-left: 10px"></span>
            <span style="font-size: 16px;vertical-align: top;margin-top: 5px;margin-left: 15px;width: 40px">北纬：</span>
            <span style="width: 50px;height: 40px; border: 1px solid rgba(204,204,204,1);margin-left: 10px"></span>

          </li>
          <li style="height: 46px;line-height: 46px">
            <span>状态：</span>
            <el-checkbox v-model="checked" disabled style="display: inline-block">正常</el-checkbox>
            <el-checkbox v-model="checked" disabled style="display: inline-block">停用</el-checkbox>
          </li>
          <li> <span>官网：</span><div ></div></li>
          <li> <span>邮箱：</span><div ></div></li>
        </ul>

      </div>
      <div class="phone">
        集团照片

      </div>
    </div>
    <div class="right">
      <div class="log">log</div>
      <ul class="site">
        <li>
          <span>DNS ： </span>
          <div></div>
        </li>
        <li>
          <span>邮编 ： </span>
          <div></div>
        </li>
        <li>
          <span style="vertical-align: top">地址1 ：</span>
          <div style="width: 300px;height: 100px;"></div>
        </li>
        <li>
          <span style="vertical-align: top">地址2 ：</span>
          <div style="width: 300px;height: 100px;"></div>
        </li>
      </ul>
      <ul class="establish">
        <li><span>创建人 ： </span><span>admin</span></li>
        <li><span>创建日期 ： </span><span>2019.2.14</span></li>
        <li><span>修改日期 ： </span><span>2019.2.15</span></li>
        <li><span>修改人 ： </span><span>admin</span></li>
        <!--<li><button>保存</button> <button style="margin-left: 30px">重置</button></li>-->
      </ul>
    </div>
  </div>



</template>

<script>
  export default {
    name: "hotel",
    data(){
      return{
        input:'',
        checked: true,
        basic:false,//新增机构显示的页面
        info:true,//页面打开显示的页面
      }
    }
  }
</script>

<style lang="less" scoped>
  .hotel{
    width: 100%;
    .left{
      width: 1000px;

      float: left;
      .message{
        padding-left: 29px;
        p{
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          margin-top: 16px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        ul{
          overflow: hidden;

          li{
            float: left;
            width: 480px;
            font-size: 16px;
            margin-bottom: 5px;
            span{
              width: 78px;
              display: inline-block;
              vertical-align:top;
            }
            div{
              display: inline-block;width: 300px;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
            }
          }
        }
      }
      .contact{
        padding-left: 29px;
        p{
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          margin: 10px  0;
          font-weight: bold;
        }
        ul{
          overflow: hidden;

          li{
            float: left;
            width: 480px;
            font-size: 16px;
            margin-bottom: 5px;
            span{
              width: 78px;
              display: inline-block;
              vertical-align: top;
            }
            div{
              display: inline-block;width: 300px;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
            }

          }
        }
      }
      .phone{
        width:915px;
        height:327px;
        /*line-height: 398px;*/
        text-align: center;
        background: white;
        margin-left: 31px;
        margin-top: 32px;
        margin-bottom: 24px;
      }

    }
    .right{
      float: left;
      .log{
        width:227px;
        height:227px;
        background: white;
        margin-left: 180px;
        line-height: 227px;
        text-align: center;
        margin-top: 8px;
        margin-bottom: 42px;
      }
      .site{
        margin-left: 60px;
        font-size: 16px;
        li{
          margin-bottom: 10px;
          span{
            width: 70px;
            display: inline-block;
            text-align: left;
            vertical-align: top;
          }
          div{
            display: inline-block;width: 300px;
            height: 30px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 4px;
          }

        }
      }
      .establish{
        margin-left: 232px;
        font-size: 16px;
        li{
          margin-bottom: 32px;
          button{
            outline: none;
            width: 90px;
            height: 40px;
            background:rgba(68,136,233,1);
            border-radius:4px;
            color: white;
          }
        }
      }
    }
  }
</style>
<style>
  /*.el-select-dropdown{*/
  /*min-width: 1900px;*/
  /*}*/
  .el-input{
    width: 300px;
  }
</style>
