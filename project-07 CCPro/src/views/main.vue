<template>
 <div class="homepage">
   <div class="topbar-account topbar-btn">
     <el-dropdown trigger="click" class="box">
          <span class="el-dropdown-link userinfo-inner">
            <i class="user"><img src="../assets/images/main/user.png" alt=""></i>
            <!--{{nickname}}   <i class="el-icon-caret-bottom"></i>-->
          </span>
       <el-dropdown-menu slot="dropdown">
         <el-dropdown-item>
           <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
         </el-dropdown-item>
         <el-dropdown-item>
           <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
         </el-dropdown-item>
       </el-dropdown-menu>
       <el-dropdown-item divided @click.native="logout" class="quit">退出</el-dropdown-item>
     </el-dropdown>
   </div>
   <div class="picture">
     <div class="picture-img">
       <img src="../assets/images/main/crownCrystal.png" alt="">
     </div>
   </div>
   <div class="conent">
     <div><img src="../assets/images/main/conent-li.png" alt=""></div>
     <ul>
       <li class="hover" v-for="(item,index) in itemList"  :key="index">
         <router-link :to="item.path"><p>{{item.projectName}}</p></router-link>
       </li>
       <!--<li><router-link to="/firstIndex"><p>内控店控 </p></router-link></li>-->
       <!--<li><router-link to="/firstIndex"><p>会员</p></router-link></li>-->
       <!--<li><router-link to="/firstIndex"><p>设置 </p></router-link></li>-->
       <!--<li><router-link to="/firstIndex"><p>客房宝</p></router-link></li>-->
       <!--<li><router-link to="/firstIndex"><p>销控宝</p></router-link></li>-->
       <!--<li><router-link to="/firstIndex"><p>发票</p></router-link></li>-->
       <!--<li><router-link to="/firstIndex"><p>协议公司</p></router-link></li>-->
     </ul>
   <div/>
   </div>
   </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            nickname: '',
            itemList:[
              {
                projectName:'PMS',
               path:'/firstIndex'
              },
              {
                projectName:'内控店控',
                path:'/module-tree/moduleinformation'
              },
              {
                projectName:'会员',
                path:'/member'
              },
              {
                projectName:'铁管家',
                path:'/ironsteward'
              },
              {
                projectName:'会管家',
                path:'/firstIndex'
              },

              {
                projectName:'销控宝',
                path:'/firstIndex'
              },
              {
                projectName:'库管家',
                path:'/firstIndex'
              },
              {
                projectName:'地管家',
                path:'/firstIndex'
              },
              {
                projectName:'钱管家',
                path:'/firstIndex'
              },
              {
                projectName:'车管家',
                path:'/firstIndex'
              },
              {
                projectName:'客管家',
                path:'/firstIndex'
              },
              {
                projectName:'任务体系',
                path:'/firstIndex'
              },



            ],
          }
      },
      methods:{
        jumpTo(url){
          this.defaultActiveIndex = url;
          this.$router.push(url); //用go刷新
        },
        logout(){
          //logout
          let that = this;
          this.$confirm('确认退出吗?', '提示', {
            confirmButtonClass: 'el-button--warning'
          }).then(() => {
            //确认
            localStorage.removeItem('access-user');
            that.$router.go('/login'); //用go刷新
          }).catch(() => {});
        }
      },
      mounted() {
        let user = localStorage.getItem('access-user');
        if (user) {
          user = JSON.parse(user);
          this.nickname = user.nickname || '';
        }
      },
    }
</script>

<style lang="less" scoped>
.homepage{
  width: 100%;
  background:rgba(244,244,244,1);
  .topbar-account{
    width: 100%;
    position: relative;
    .box{
      width: 100%;
      height: 80px;
      min-width: 900px;
      z-index: 1000;
      .el-dropdown-link{
        width: 100%;
        .user{
          img{
            margin-top: 14px;
            float: right;
            margin-right: 100px;
          }
        }
      }
      .quit{
        padding: 0;
        margin-right: 14px;
        float: right;
        margin-top:26px;
        border: none;
      }
    }
  }
  .picture{
    width: 100%;
    height: 700px;
    background-image: url("../assets/images/main/hotelPicture.png");
    position: relative;
    .picture-img{
      min-width: 1000px;
      position: absolute;
      left:740px;
      top:291px;
    }

  }
  .conent{
    width:500px;
    height:838px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 20px 0px rgba(204,204,204,1);
    border-radius:4px;
    position: absolute;
    left: 120px;
    top: 0;
    div{
      img{
        margin: 27px 197px  42px  197px;

      }
    }
    ul{
      li{
        width: 340px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: auto;
        border-radius:40px;
        p{
          font-size:26px;
          font-family:PingFangSC-Regular;
          font-weight:400;
        }
      }
      margin-bottom: 130px;
    }

  }
}
  .el-dropdown-menu__item--divided:before{
    height: 0;
  }
  a{
    color:rgba(119,119,119,1);
  }

li:hover
{
  background:rgba(68,136,233,1);

}
  li:hover a{
    color:rgba(255,255,255,1);
  }
</style>
