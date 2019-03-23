<template>
  <div class="hotel" >
    <div class="left">
      <div class="message">
        <p>基本信息</p>
        <ul>
          <li> <span style="vertical-align:top;">酒店全称：</span><div >{{bit.full_name}}</div></li>
          <li> <span>酒店简称：</span><div >{{bit.short_name}}</div></li>
          <li> <span>代码：</span><div >{{bit.code}}</div></li>
          <li style="height: 46px;line-height: 46px">
            <span>审核状态：</span>
            <el-checkbox v-if="bit.audit==1" v-model="checked" disabled style="display: inline-block">已通过</el-checkbox>
            <el-checkbox v-else="bit.audit==0"   v-model="checked" disabled style="display: inline-block">未通过</el-checkbox>
          </li>
          <li> <span>中文描述：</span><div >{{bit.desc}}</div></li>
          <li> <span>英文描述：</span><div >{{bit.desc_en}}</div></li>
        </ul>

      </div>
      <div class="contact">
        <p>联系方式</p>
        <ul>
          <li> <span>总机：</span><div >{{bit.office_tel}}</div></li>
          <li> <span>国家：</span><div >{{bit.country_code}}</div></li>
          <li> <span>订房电话：</span><div >{{bit.reserve_tel}}</div></li>
          <li> <span>州/省：</span><div >{{bit.province}}</div></li>
          <li> <span>服务电话：</span><div >{{bit.service_tel}}</div></li>
          <li> <span>城市：</span><div >{{bit.city}}</div></li>
          <li> <span>传真：</span><div >{{bit.fax}}</div></li>
          <li style="width: 340px;height: 46px;vertical-align: top">
            <span style="width: 132px;vertical-align: top;margin-top: 5px">地理位置经纬度：</span>
            <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 40px;" >东经：</span>
            <span style="width: 40px;height:35px; line-height:40px; border: 1px solid rgba(204,204,204,1);margin-left: 10px;overflow: hidden;text-overflow: ellipsis">{{bit.position}}</span>
            <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 40px">北纬：</span>
            <span style="width: 40px;height: 35px; line-height:40px; border: 1px solid rgba(204,204,204,1);margin-left: 10px;overflow: hidden;text-overflow: ellipsis">{{bit.position}}</span>

          </li>
          <li style="height: 46px;line-height: 46px">
            <span>状态：</span>
            <el-checkbox  v-if="bit.status==1"     v-model="checked" disabled style="display: inline-block">正常</el-checkbox>
            <el-checkbox    v-else="bit.status==0"   v-model="checked" disabled style="display: inline-block">停用</el-checkbox>
          </li>
          <li> <span>官网：</span><div >{{bit.web_site}}</div></li>
          <li> <span>邮箱：</span><div >{{bit.email}}</div></li>
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
          <div>{{bit.dns}}</div>
        </li>
        <li>
          <span>邮编 ： </span>
          <div>{{bit.postal_code}}</div>
        </li>
        <li>
          <span style="vertical-align: top">地址1 ：</span>
          <div style="width: 300px;height: 100px;">{{bit.address_1}}</div>
        </li>
        <li>
          <span style="vertical-align: top">地址2 ：</span>
          <div style="width: 300px;height: 100px;">{{bit.address_2}}</div>
        </li>
      </ul>
      <ul class="establish">
        <li><span>创建人 ： </span><span>{{bit.creator }}</span></li>
        <li><span>创建日期 ： </span><span>{{bit.create_time }}</span></li>
        <li><span>修改日期 ： </span><span>{{bit.last_time }}</span></li>
        <li><span>修改人 ： </span><span>{{bit.last_user }}</span></li>
        <li><button @click="amend">修改酒店信息</button><button @click="remove">删除酒店</button><router-link to="/organizationchart/sections" style="display: inline-block"><button @click="examine">查看酒店部门</button></router-link></li>
         <li></li>
      </ul>
    </div>
    <div class="masking" v-show="masking">
      <div class="basicInfo"  >
        <div class="left">
          <div class="message">
            <p>基本信息</p>
            <ul>
              <li > <span>酒店全称：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
              <li > <span>酒店简称：</span><el-input v-model="hotel_input" placeholder="请输入内容"></el-input></li>
              <li> <span>代码：</span><el-input v-model="code" placeholder="请输入内容"></el-input></li>
              <li style="height: 46px;line-height: 46px">
                <span>审核状态：</span>
                <el-radio v-model="radio" label="1">已通过</el-radio>
                <el-radio v-model="radio" label="0">未通过</el-radio>
              </li>
              <li> <span>中文描述：</span><el-input v-model="desc " placeholder="请输入内容"></el-input></li>
              <li> <span>英文描述：</span><el-input v-model="desc_en " placeholder="请输入内容"></el-input></li>
            </ul>

          </div>
          <div class="contact">
            <p>联系方式</p>
            <ul>
              <li> <span>总机：</span><el-input v-model="office_tel " placeholder="请输入内容"></el-input></li>
              <li> <span>国家：</span><el-input v-model="country_code " placeholder="请输入内容"></el-input></li>
              <li> <span>订房电话：</span><el-input v-model="reserve_tel " placeholder="请输入内容"></el-input></li>
              <li> <span>州/省：</span><el-input v-model="province" placeholder="请输入内容"></el-input></li>
              <li> <span>服务电话：</span><el-input v-model="service_tel" placeholder="请输入内容"></el-input></li>
              <li> <span>城市：</span><el-input v-model="city" placeholder="请输入内容"></el-input></li>
              <li> <span>传真：</span><el-input v-model="fax" placeholder="请输入内容"></el-input></li>
              <li style="height: 46px;vertical-align: top">
                <span style="width: 132px;vertical-align: top;margin-top: 5px">地理位置经纬度：</span>
                <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 50px;display: inline-block;margin: 0" >东经：</span>
                <input style="width: 55px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_east">
                <span style="font-size: 16px;vertical-align: top;margin-top: 5px;margin-left: 15px;width: 50px;display: inline-block">北纬：</span>
                <input style="width: 55px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_west">

              </li>
              <li style="height: 46px;line-height: 46px">
                <span>状态：</span>
                <el-radio v-model="normal" label="1">正常</el-radio>
                <el-radio v-model="normal" label="0">停用</el-radio>
              </li>
              <li> <span>官网：</span><el-input v-model="web_site " placeholder="请输入内容"></el-input></li>
              <li> <span>邮箱：</span><el-input v-model="email" placeholder="请输入内容"></el-input></li>
            </ul>

          </div>
          <div class="phone">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将集团照片拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <div class="right">
          <div class="log">
            <el-upload
              style="margin-left: 5px;margin-top: 40px"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus" style="font-size: 16px">上传集团log</i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

          </div>
          <ul class="site">
            <li>
              <span>DNS ： </span>
              <el-input v-model="dns " placeholder="请输入内容"></el-input>
            </li>
            <li>
              <span>邮编 ： </span>
              <el-input v-model="postal_code" placeholder="请输入内容"></el-input>
            </li>
            <li>
              <span style="vertical-align: top">地址1 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_1 "></textarea>
            </li>
            <li>
              <span style="vertical-align: top">地址2 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_2 "></textarea>
            </li>
          </ul>
          <ul class="establish">
            <!--<li><span>创建人 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
            <!--<li><span>创建日期 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
            <!--<li><span>修改日期 ： </span><span>2019.2.15</span></li>-->
            <!--<li><span>修改人 ： </span><span>admin</span></li>-->
            <li >
              <button @click="save">保存</button>
              <!--<button style="margin-left: 30px">重置</button>-->
              <button style="margin-left: 30px" @click="cancel">取消</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import eventVue from './eventVue'
  export default {
    name: "hotel",
    props:{
      bit:{required:true},
    },
    data(){
      return{
        api:'http://47.98.113.173:9519',
        input:'',
        authorization_token:'',
        checked: true,
        //log
        dialogImageUrl: '',
        dialogVisible: false,
        masking:false,//修改酒店的页面
        basic:false,//新增机构显示的页面
        info:true,//页面打开显示的页面
        bits:'',//监测酒店数据id的变动
        hotel_list:[],//接受后台传过来的酒店数据
        section_list:[],//接收后台传的部门信息
         hotel_id:'',//修改酒店的id
       //蒙版信息
       //  full_name :'', //酒店全称
        short_name :'',   //酒店简称
        hotel_input:'',//酒店简称
        code :'',  //代码
        radio: "1",//审核状态
        desc:'',//中文描述
        desc_en:'',//英文描述
        // 集团蒙版的联系方式
        office_tel:'',//总机
        country_code:'',//国家
        reserve_tel:'',//订房电话
        province:'',//州/省
        service_tel:'',//服务电话
        city:'',//城市
        fax:'',//传真
        //地理位置
        position_east:'',// 东经
        position_west:'',// 北纬
        position:'',
        //状态
        normal:'0',//正常
        web_site:'',//官网
        email:'',//邮箱
        photo:'',//集团照片
        log:'',//log
        dns:'',//DNS
        postal_code:'',//邮编
        address_1:'',//地址1
        address_2:'',//地址二
      }
    },
    created:function () {
      let that=this;

    },
    watch:{
      // 监听后台传过来的值得变化
      bit(newValue, oldValue) {
        console.log(newValue)
        this.bits=newValue;
        // console.log(this.bits);

      },
      deep: true

    },
    methods:{
      //封装传值给兄弟关系
      breather(){
        eventVue.$emit("myFun",this.section_list)
      },
       //查看部门信息
      examine(){
        console.log(this.bit.id);
        this.$axios({
          url: ""+this.api+"/v1/common/dept/info_list",
          method: "post",
          data:{
            hotel_id:this.bit.id,
        },
          //headers: {"authorization": this.authorization_token}
        })
          .then(res => {
            if (res.data.message=="success"){
              console.log(res.data.data);
              this.section_list=res.data.data;
              if(this.section_list==res.data.data){
                //得到的值传给兄弟关系组件
                this.breather();
              }


            }
            else{
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },

     //修改酒店信息
      amend(){
        let bit = this.bit;
          this.masking=true;
        console.log(this.bit);
        this.input=bit.full_name;
        this.hotel_id=bit.id;
        this.hotel_input=bit.short_name;
        this.code=bit.code;
        if(bit.audit==0){
          this.radio="0";
        }else if(bit.audit==1){
          this.radio="1";
        }
        this.desc_en=bit.desc_en;
        this.desc=bit.desc;
        this.office_tel=bit.office_tel;
        this.country_code=bit.country_code;
        this.reserve_tel=bit.reserve_tel;
        this.province=bit.province;
         this.service_tel=bit.service_tel;
        this.city=bit.city;
        this.fax=bit.fax;
        this.position_east=bit.position;
        this.position_west=bit.position;
       if(bit.status==0){
         this.normal="0"
       }else if(bit.status==1){
         this.normal="1"
       }


          this.web_site=bit.web_site;//官网
          this.email=bit.email;//邮箱
          this.photo=bit.photo;//集团照片
          this.log=bit.log;//log
          this.dns=bit.dns;//DNS
          this.postal_code=bit.postal_code;//邮编
          this.address_1=bit.address_1;//地址1
          this.address_2=bit.address_2;//地址二

      },


      //点击修改酒店信息显示蒙版后的保存
      save(){
        if (this.radio=="0"){
          this.radio=0
        }else if (this.radio=="1"){
          this.radio=1
        }
        if (this.normal=="0"){
          this.normal=0
        }else if (this.normal=="1"){
          this.normal=1
        }
        this.$axios({
          url:""+this.api+"/v1/common/hotel/update/"+this.hotel_id,
          method: "post",
          // params:{},
          data:{
            //集团蒙版的基本信息

            full_name :this.input, //酒店全称
            short_name :this.hotel_input,   //酒店简称
            code :this.code, //代码
            audit:this.radio,//审核状态
            desc:this.desc,//中文描述
            desc_en:this.desc_en,//英文描述
            // 集团蒙版的联系方式
            office_tel:this.office_tel,//总机
            country_code:this.country_code,//国家
            reserve_tel:this.reserve_tel,//订房电话
            province:this.province,//州/省
            service_tel:this.service_tel,//服务电话
            city:this.city,//城市
            fax:this.fax,//传真
            position:this.position_west+','+this.position_east,
            //地理位置
            // position_east:'',// 东经
            // position_west:'',// 北纬

            status:this.normal,//状态
            web_site:this.web_site,//官网
            email:this.email,//邮箱
            photo:'',//集团照片
            log:'',//log
            dns:this.dns,//DNS
            postal_code:this.postal_code,//邮编
            address_1:this.address_1,//地址1
            address_2:this.address_2,//地址二
          },
          //headers: {'authorization': this.authorization_token}
        })
          .then(res=>{
            if(res.data.message==="success"){
              console.log(res);
              this.masking=false;
              location.reload(); // 强制刷新
            }else {
              console.log(res.data.message)
            }

          })
          .catch(error=>{
            console.log(error);
          })
      },

      //删除酒店
      remove(){
        console.log(this.bits);
        let hotel_id= this.bit.id;
        console.log(hotel_id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // list.splice(index, 1);
          this.$axios({
            url:""+this.api+"/v1/common/hotel/remove/"+hotel_id,
            method: "post",
            // params:{},
            // data:{},
            //headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res.message)
              if(res.data.message==="success"){
                location.reload(); // 强制刷新
              }

            })
            .catch(error=>{
              console.log(error);
            })



        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });



      },

      //取消
      cancel(){
          this.masking=false;
      },


      //点击log上传的方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;

      },
      //动态获取authorization
      authorization() {
        let that=this;
        //&hotel_id=&hotel_group_id=3
        this.$axios.get(""+that.api+"/v1/common/employee/create_token?user_id=1&user_name=super_root",
        )
          .then(res=>{
            if (res.data.message=="success"){
              console.log(res.data.authorization);
              that.authorization_token= that.authorization_token === ""? res.data.authorization: that.authorization_token;
              that.new_authorization(res.data.message)
            }else {
              console.log(res.data.message)
            }

          })
          .catch(error=>{
            console.log(error);
          })
      },
      //如果认证错误
      new_authorization(msg){
        let that=this;
        if(msg==="authorization invalid"){
          that.authorization()
        }
      },
    },

  }
</script>

<style lang="less" scoped>
  .hotel{
    width: 100%;
    .left{
      width:58%;

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
            width: 320px;
            font-size: 16px;
            margin-bottom: 5px;
            span{
              width: 78px;
              display: inline-block;
              vertical-align:top;
            }
            div{
              width: 220px;
              display: inline-block;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
              line-height: 30px;
              padding-left: 10px;
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
            width: 320px;
            font-size: 16px;
            margin-bottom: 5px;
            span{
              width: 78px;
              display: inline-block;
              vertical-align: top;
            }
            div{
              display: inline-block;
              width: 220px;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
              line-height: 30px;
              padding-left: 10px;
            }

          }
        }
      }
      .phone{
        width:600px;
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
            line-height: 30px;
            padding-left: 10px;
          }

        }
      }
      .establish{
        margin-left: 79px;
        font-size: 16px;
        li{
          margin-bottom: 32px;
          button{
            outline: none;
            width: 110px;
            height: 40px;
            background:rgba(68,136,233,1);
            border-radius:4px;
            color: white;
          }
        }
      }
    }
    .masking{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 13, 32, 0.3);
      z-index: 9000;
      .basicInfo{
        width:80%;
        height:90%;
        background: white;
        overflow-y: scroll;
        margin: 3% 10% 2%  10%;
        .left{
          /*min-width: 800px;*/
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
                width: 320px;
                font-size: 16px;
                margin-bottom: 15px;
                span{
                  width: 80px;
                  display: inline-block;
                  vertical-align:top;
                }
                div{
                  border: none;
                }
              }
            }
          }
          .contact{
            padding-left: 29px;
            p{
              font-size: 16px;
              margin: 10px  0;
              font-weight: bold;
            }
            ul{
              overflow: hidden;

              li{
                float: left;
                width: 320px;
                font-size: 16px;
                margin-bottom: 15px;
                span{
                  width: 80px;
                  display: inline-block;
                  vertical-align: top;
                }
                div{
                  border: none;
                }

              }
            }
          }
          .phone{
            width:600px;
            height:300px;
            /*line-height: 398px;*/
            text-align: center;
            background: white;
            margin-left: 31px;
            margin-top: 15px;
            margin-bottom: 24px;
            border: 1px solid rgb(204, 204, 204);
          }

        }
        .right{
          width:34%;
          float: left;
          /*min-width: 400px;*/
          /*margin-left: 50px;*/
          .log{
            width:227px;
            height:227px;
            background: white;
            /*margin-left: 180px;*/
            line-height: 227px;
            text-align: center;
            margin-bottom: 22px;
            border: 1px solid rgb(204, 204, 204);
            margin-top: 50px;

          }
          .site{
            font-size: 16px;
            margin-top: 60px;
            li{
              margin-bottom: 15px;
              span{
                width: 70px;
                display: inline-block;
                text-align: left;
                vertical-align: top;
              }

              div{
                border: none;
              }

            }
          }
          .establish{
            margin-top: 100px;
            font-size: 16px;

            li{
              margin-bottom: 22px;
              button{
                outline: none;
                border: none;
                /*width: 190px;*/
                height: 40px;
                background:rgba(68,136,233,1);
                border-radius:4px;
                color: white;
              }
            }
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
  /*.el-input{*/
    /*width: 300px;*/
  /*}*/
</style>
