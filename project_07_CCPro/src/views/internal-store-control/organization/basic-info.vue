<template>

    <div class="basicInfo">
      <div class="left">
        <div class="message">
          <p>基本信息</p>
          <ul >
            <li> <span style="vertical-align:top;">集团全称：</span><div >{{group_list.full_name}}</div></li>
            <li> <span>集团简称：</span><div >{{group_list.short_name}}</div></li>
            <li> <span>代码：</span><div >{{group_list.code}}</div></li>
            <li style="height: 46px;line-height: 46px">
              <span>审核状态：</span>
              <el-checkbox v-if="group_list.creator==1" v-model="checked1" disabled style="display: inline-block">已通过</el-checkbox>
              <el-checkbox v-else="group_list.creator==0"    v-model="checked1" disabled style="display: inline-block">未通过</el-checkbox>
            </li>
            <li> <span>中文描述：</span><div >{{group_list.desc}}</div></li>
            <li> <span>英文描述：</span><div >{{group_list.desc_en}}</div></li>
          </ul>

        </div>
        <div class="contact">
          <p>联系方式</p>
          <ul>
            <li> <span>总机：</span><div >{{group_list.office_tel}}</div></li>
            <li> <span>国家：</span><div >{{group_list.country_code}}</div></li>
            <li> <span>订房电话：</span><div >{{group_list.reserve_tel}}</div></li>
            <li> <span>州/省：</span><div >{{group_list.province}}</div></li>
            <li> <span>服务电话：</span><div >{{group_list.service_tel}}</div></li>
            <li> <span>城市：</span><div >{{group_list.city}}</div></li>
            <li> <span>传真：</span><div >{{group_list.fax}}</div></li>
            <li style="height: 46px;vertical-align: top">
              <span style="width: 121px;vertical-align: top;margin-top: 5px">地理位置经纬度：</span>
              <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 60px;" >东经/北纬</span>
              <!--<span style="width: 50px;height: 40px; border: 1px solid rgba(204,204,204,1);margin-left: 10px;line-height: 40px;overflow: hidden;text-overflow: ellipsis"-->
                <!--v-for="item in ipaddrArray" :key="item">{{item}}</span>-->

              <span style="width: 50px;height: 40px; border: 1px solid rgba(204,204,204,1);margin-left: 10px;line-height: 40px;overflow: hidden;text-overflow: ellipsis">{{group_list.position}}</span>
              <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 40px">北纬：</span>
              <span style="width: 50px;height: 40px; border: 1px solid rgba(204,204,204,1);line-height: 40px;overflow: hidden;text-overflow: ellipsis">{{group_list.position}}</span>

            </li>
            <li style="height: 46px;line-height: 46px">
              <span>状态：</span>
              <el-checkbox v-if="group_list.creator==1"  v-model="checked" disabled style="display: inline-block">正常</el-checkbox>
              <el-checkbox  v-else="group_list.creator==0"   v-model="checked" disabled style="display: inline-block">停用</el-checkbox>
            </li>
            <li> <span>官网：</span><div >{{group_list.web_site}}</div></li>
            <li> <span>邮箱：</span><div >{{group_list.email}}</div></li>
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
            <div>{{group_list.dns}}</div>
          </li>
          <li>
            <span>邮编 ： </span>
            <div>{{group_list.postal_code}}</div>
          </li>
          <li>
            <span style="vertical-align: top">地址1 ：</span>
            <div style="width: 300px;height: 100px;">{{group_list.address_1}}</div>
          </li>
          <li>
            <span style="vertical-align: top">地址2 ：</span>
            <div style="width: 300px;height: 100px;">{{group_list.address_2}}</div>
          </li>
        </ul>
        <ul class="establish">
          <li><span>创建人 ： </span><span>{{group_list.creator }}</span></li>
          <li><span>创建日期 ： </span><span>{{group_list.create_time }}</span></li>
          <li><span>修改日期 ： </span><span>{{group_list.last_time}}</span></li>
          <li><span>修改人 ： </span><span>{{group_list.last_user }}</span></li>
          <li><button @click="amend">修改</button>  <button @click="omit">删除</button> <button @click="dialogVisibleApp = true; appObtain()">集团APP</button></li>

        </ul>
      </div>
     <!--查看集团的APP-->
        <!--编辑APp出现的页面-->
        <el-dialog
          title="集团APP"
          :visible.sync="dialogVisibleApp"
          width="60%"
          style="overflow: hidden"
          :before-close="handleClose" class="dialog-style" >
          <p style="display: inline-block;width: 198px;margin-bottom: 10px">集团名称 ：<span style="color:#4488e9"> {{group_list.full_name}}</span></p>
          <ul style="overflow: hidden">
            <el-transfer
              v-model="multipleSelection"
              style="float: left"
              :props="{key: 'id',label: 'name'}"
              :titles="['集团未拥有APP', '集团已添加APP ']"
              @change="handleChange"
              :data="appList"
            ></el-transfer>

          </ul>

          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleApp = false ;cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleApp = false; saveInfo_app()">确 定</el-button>
        </span>
        </el-dialog>






      <!--点击集团下的加号 显示的添加蒙版-->
      <div class="masking" v-show="masking">
        <div class="basicInfo"  >
          <div class="left">
            <div class="message">
              <p>基本信息</p>
              <ul>
                <li v-show="group_masking"> <span>集团全称：</span><el-input v-model="full_name " placeholder="请输入内容"></el-input></li>
                <!--<li v-show="hotel_masking"> <span>酒店全称：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>-->
                <li v-show="group_masking"> <span>集团简称：</span><el-input v-model="short_name " placeholder="请输入内容"></el-input></li>
                <!--<li v-show="hotel_masking"> <span>酒店简称：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>-->
                <li> <span>代码：</span><el-input v-model="code" placeholder="请输入内容"></el-input></li>
                <li style="height: 46px;line-height: 46px">
                  <span>审核状态：</span>
                  <el-radio v-model="radio" label="1">已通过</el-radio>
                  <el-radio v-model="radio" label="2">未通过</el-radio>
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
                <li style="height: 46px;vertical-align: top" >
                  <span style="width: 132px;vertical-align: top;margin-top: 5px">地理位置经纬度：</span>
                  <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 50px;display: inline-block" >东经：</span>
                  <input style="width: 55px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_east">
                  <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 50px;display: inline-block">北纬：</span>
                  <input style="width: 55px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_west">

                </li>
                <li style="height: 46px;line-height: 46px">
                  <span>状态：</span>
                  <el-radio v-model="normal" label="1">正常</el-radio>
                  <el-radio v-model="normal" label="2">停用</el-radio>
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
              <li style="margin-top: 40px">
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
              <li v-show="group_masking">
                <button @click="save">保存</button>
                <!--<button style="margin-left: 30px">重置</button>-->
                <button style="margin-left: 30px" @click="cancel">取消</button>
              </li>
              <!--<li v-show="hotel_masking">-->
                <!--<button @click="hold">保存</button>-->
                <!--<button style="margin-left: 30px">重置</button>-->
                <!--<button style="margin-left: 30px" @click="cancel">取消</button>-->
              <!--</li>-->
            </ul>
          </div>
        </div>
      </div>

    </div>

</template>

<script>
    export default {
        name: "basic-info",
      props:{
        // group:{required:true},
      },
      data(){
        return{
          api:'http://47.98.113.173:9519',
          input:'',
          checked1: true,
          checked:true,
          basic:false,//新增机构显示的页面
          info:true,//页面打开显示的页面,
          group_list:[],//后台传过来的值
          masking:false,//蒙版层
          dialogVisibleApp: false,//集团App的显示隐藏

          input:'',//
          // checked:'',//状态
          options: [{
            value: '0',
            name: '无登陆入口'
          }, {
            value: '1',
            name: '有登录入口'
          },],
          value: '',
          authorization_token:'',//获取token
           group:0,//集团信息的选择框
          hotel_masking:false,//酒店添加的蒙版显示
          group_masking:false,//集团添加的蒙版显示
          group_list:[],//获取后台的集团信息
          group_full_name:'',//集团信息
          id:'',//选取集团信息的id
          //集团蒙版的基本信息
          full_name :'', //集团全称
          short_name :'',   //集团简称
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
          position:'',//地理位置
          //状态
          normal:'1',//正常
          web_site:'',//官网
          email:'',//邮箱
          photo:'',//集团照片
          logo:'',//log
          dns:'',//DNS
          postal_code:'',//邮编
          address_1:'',//地址1
          address_2:'',//地址二
          //log里的东西
          dialogImageUrl: '',
          dialogVisible: false,
          appList:[],//后台传过来的app数组
          multipleSelection: [],//所选中的App数组
          dialogVisibleApp:false,



      }
      },
      created:function () {
        let that=this;
        this.group = that.$route.query.group,  //接受参数关键代码
        this.full();

      },

      watch:{
        $route: {
          handler: function(val, oldVal){
            console.log(val.query.group, 'valaaaaa');
            this.group=val.query.group;
            this.full();
          },
          // 深度观察监听
          deep: true
        }

      },

      computed:{
      // ipaddrArray:function(){
      //   return this.position.split(',')
      // }
    },
      methods:{
        //封装获取集团信息
        full(){
          // debugger
          let that=this;
          if(that.group===undefined){
            that.group=3;
          }
          that.$axios({
            url: ""+that.api+"/v1/common/hotel_group/get_info/"+that.group,
            method: "get",
            //headers: {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.group_list=res.data.data;
                // that.position=that.group_list.position
                // console.log(that.position);

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //点击修改
        amend(){
            this.masking=true;
            this.group_masking=true;

          //集团蒙版的基本信息
          this.full_name =this.group_list.full_name;//集团全称
            this. short_name=this.group_list.short_name;  //集团简称
            this. code =this.group_list.code;  //代码
            //审核状态
            if (this.creator==0){
              this.radio="2";
            }else if(this.creator==1){
              this.radio="1";
            }

            this. desc=this.group_list.desc; //中文描述
             this.desc_en=this.group_list.desc_en;//英文描述
            // // 集团蒙版的联系方式
            this.office_tel=this.group_list.office_tel;//总机
            this.country_code=this.group_list.country_code;//国家
            this.reserve_tel=this.group_list.reserve_tel;//订房电话
            this.province=this.group_list.province;//州/省
            this.service_tel=this.group_list.service_tel//服务电话
            this.city=this.group_list.city;//城市
            this.fax=this.group_list.fax;//传真
            // //地理位置
            // position_east:'',// 东经
            // position_west:'',// 北纬
           this.position=this.group_list.position_west+','+this.group_list.position_east
            // //状态
            // normal:'1',//正常
          if(this.normal==0){
            this.normal="2"
          }else if(this.normal=1){
             this.normal="1"
          }
            this. web_site=this.group_list.web_site//官网
            this.email=this.group_list.email//邮箱
            // photo:'',//集团照片
            // log:'',//log
            this.dns=this.group_list.dns;//DNS
             this.postal_code=this.group_list.postal_code;//邮编
            this.address_1=this.group_list.address_1;//地址1
            this.address_2=this.group_list.address_2;//地址二
            // //log里的东西
            // dialogImageUrl: '',
            // dialogVisible: false,








        },

        //点击删除
        omit(){

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            console.log(this.group);
            this.$axios({
              url:`"+that.api+"/v1/common/hotel_group/remove/`+this.group,
              method: "post",
              // params:{},
              data:{

              },
              //headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                if(res.data.message==="success"){
                  location.reload();  //强制刷新

                }else {
                  console.log(res.data.message)
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

        //集团App的隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});

      },

        handleChange(value, direction, movedKeys) {
          let that = this;
          console.log(value);
          console.log(direction);
          console.log(movedKeys);//发生移动数据的数组
          //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边


        },

        //点击app
        appObtain(){
          let that = this;
          that.multipleSelection=[];
          that.demandApp();
          that.$axios({
            url: ""+that.api+"/v1/common/app/info_list",
            method: "get",
            params:{
              page_size:999
            },
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res)
              that.appList=res.data.data.list;

              }
              else{
                this.error(res.data.message)
                console.log(res.data.message);
              }

            })
            .catch(error=>{
              console.log(error);
            })
        },

   //点击确定
        saveInfo_app(){
          let that = this;
          that.$axios({
            url: ""+that.api+"/v1/common/hotel_group/bind_app",
            method: "post",
            data:{
              hotel_group_id:that.group,//所点击的id
              apps:JSON.stringify(that.multipleSelection),//选中的app
            },
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res)

              }
              else{
                this.error(res.data.message)
                console.log(res.data.message);
              }

            })
            .catch(error=>{
              console.log(error);
            })
        },

       //封装查询集团下有哪些app
        demandApp(){
          let that = this;
          that.$axios({
            url: ""+that.api+"/v1/common/app/info_list",
            method: "post",
            data:{
              hotel_group_id:that.group
            },
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res)
                // 遍历拿到所需要APP
                res.data.data.list.forEach(item =>{
                  that.multipleSelection.push(item.id)
                });
                // that.multipleSelection=res.data.data.list;

              }
              else{
                this.error(res.data.message)
                console.log(res.data.message);
              }

            })
            .catch(error=>{
              console.log(error);
            })

        },



        //点击log上传的方法
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;


        },
        //点击log上传的方法结束

        //点击集团下的加号显示蒙版后的保存
        save(){
          if (this.radio=="1"){
            this.radio=1
          }else if (this.radio=="2"){
            this.radio=0
          }
          if (this.normal=="1"){
            this.normal=1
          }else if (this.normal=="2"){
            this.normal=0
          }
          this.$axios({
            url:""+this.api+"/v1/common/hotel_group/update/"+this.group,
            method: "post",
            // params:{},
            data:{
              //集团蒙版的基本信息
              full_name :this.full_name, //集团全称
              short_name :this.short_name,   //集团简称
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
              logo:'',//log
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
                this.full();
              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })
        },
        //点击蒙版里的取消
        cancel(){
          this.masking=false;
          //集团蒙版的基本信息
          this.full_name ='', //集团全称
            this.short_name ='',   //集团简称
            this.code ='',  //代码
            this.radio= "1",//审核状态
            this.desc='',//中文描述
            this.desc_en='',//英文描述
            // 集团蒙版的联系方式
            this.office_tel='',//总机
            this.country_code='',//国家
            this.reserve_tel='',//订房电话
            this. province='',//州/省
            this.service_tel='',//服务电话
            this.city='',//城市
            this.fax='',//传真
            //地理位置
            this.position_east='',// 东经
            this.position_west='',// 北纬
            //状态
            this.normal='1',//正常
            this.web_site='',//官网
            this.email='',//邮箱
            this.photo='',//集团照片
            this.logo='',//log
            this.dns='',//DNS
            this.postal_code='',//邮编
            this.address_1='',//地址1
            this.address_2=''//地址二
        },

      }
    }
</script>

<style lang="less" scoped>
   .basicInfo{
     width: 100%;
     /*height: 100%;*/
     /*min-width: 1400px;*/
     /*overflow: hidden;*/
     .left{
       width: 57%;
       min-width: 700px;
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
              width:320px;
              font-size: 16px;
              margin-bottom: 5px;
              span{
                width: 78px;
                display: inline-block;
                vertical-align:top;
              }
              div{
               display: inline-block;
                width: 220px;
                height: 30px;
                border: 1px solid rgb(204, 204, 204);
                border-radius: 4px;
                padding-left: 10px;
                line-height: 30px;
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
               width: 220px;
               display: inline-block;
               height: 30px;
               border: 1px solid rgb(204, 204, 204);
               border-radius: 4px;
               padding-left: 20px;
               line-height: 30px;
             }

           }
         }
       }
       .phone{
         width:80%;
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
       width:41%;
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
             display: inline-block;
             width: 260px;
             height: 30px;
             border: 1px solid rgb(204, 204, 204);
             border-radius: 4px;
             padding-left: 20px;
             line-height: 30px;
           }

         }
       }
       .establish{
         margin-left: 180px;
         font-size: 16px;
         li{
           margin-bottom: 22px;
           button{
             border: none;
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
     .masking{
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(7, 13, 32, 0.3);
       z-index: 9000;
       .basicInfo{
         width:85%;
         height:80%;
         background: white;
         overflow-y: scroll;
         margin: 3% 10% 2%  10%;
         .left{
           width: 47%;
           min-width: 800px;
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
             width:80%;
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
           width:31%;
           float: left;
           /*min-width: 400px;*/
           margin-left: 50px;
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
             margin-left: 60px;
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
             margin-left: 132px;
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
     .group_app{
       position: absolute;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       background: rgba(7, 13, 32, 0.3);
       /*z-index: 9000;*/

     }
   }
</style>
<style>
  /*.el-select-dropdown{*/
    /*min-width: 1900px;*/
  /*}*/
  .el-input{
    width: 210px;

  }

</style>
