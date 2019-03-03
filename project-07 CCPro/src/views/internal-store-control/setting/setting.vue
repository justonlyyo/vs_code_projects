<template>
 <div class="setting">
    <ul class="navigation">
      <router-link :to="item.path"  v-for="(item,index) in itemList " :key="index">
        <li :class="activeClass == index ? 'active':''" @click="getItem(index)">{{item.projectName}}</li>
      </router-link>

    </ul>

    <div class="router">
      <router-view></router-view>
      <div class="ini"><logon-view></logon-view></div>
    </div>
 </div>

</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        name: "setting",
      data(){
          return{
            activeClass: 0,
            itemList: [
              {
                projectName: '证件',
                path:'/setting/papers',
                parent_code:'idcode'

              },
              {
                projectName: '市场销售',
                path:'/setting/marketing'
              },
              {
                projectName: '房态',
                path:'/setting/room-status'
              },
              {
                projectName: '预定',
                path:'/setting/reserve'
              },
              {
                projectName: '前台',
                path:'/setting/reception'
              },
              {
                projectName: '客房',
                path:'/setting/guest-room'
              },
              {
                projectName: '其他',
                path:'/setting/else'
              }


            ]
          }
      },
      methods:{
        getItem(index){
          this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
        }
      },
      created: function () {
        // this.$axios.post('/api/customer/member/update_card_type/'+26+'/',
        //   qs.stringify({"id":2,"hotel_group_id":1,"hotel_id":1,"create_user":"王微","create_datetime":"2019-01-23T16:46:43.042822","modify_user":"王微","modify_datetime":"2019-01-23T16:46:43.042854","code":"XXX","descript":"测试","descript_en":"测试","is_point":false,"is_point_in_self":false,"is_point_out_self":false,"point_valid_days":0,"is_account":false,"is_pay_self_hotel":false,"is_post_self":false,"is_anonymous":false,"is_auto_activated":false,"is_allow_online_use":false,"registered_limit":"A","num_generate_rule":"","last_generated_no":"","valid_days":null,"init_password":"666666","is_physical":false,"is_must_read":false,"is_must_password_validate":false,"remark":"","is_halt":false,"iss_mode":"SC"})
        // ).then(function (res) {
        //   console.log(res.data.data);
        //
        // }).catch(function (error) {
        //
        // })
        // this.$axios.get('/api/v1/system/settings/get_code_base_list/?parent_code=idcode',{
        //   params: {
        //
        //   }
        // })
        //   .then(res=>{
        //     console.log(res.data);
        //   })
        //   .catch(error=>{
        //     console.log(error);
        //   })
      },

    }
</script>

<style  lang="less" scoped>

  .active {
    /* background: #eee; */
   background: white;
    font-weight: bolder;
  }
  .setting{
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 60px);
    overflow: hidden;
    overflow-y: scroll;
   // min-width: 1900px;
    .navigation{
      float: left;
      width: 250px;
      height: 100%;
      background:#f7f7f7;
      li{
        height: 50px;
        padding-left: 40px;
        line-height: 50px;
      }
    }
    /*显示子路由*/
    .router{
      width:calc(100% - 350px);
      margin-right: 100px;
      height: 100%;
      font-size:20px;
      float: left;
      min-width: 50px;
      /*min-height: 1000px;*/
      white-space:nowrap;
      .ini{
        height: calc(100% - 30px);

        position: absolute;
        right: 0;
        top: 30px;

      }
    }
  }

</style>
