<template>
  <div class="organization">
    <div class="tree" >
          <router-link to="">
            <div class="serialNumber" style="color: black" ><span>集团信息:</span>
              <span>{{group}}</span>
              <!--<span style=" font-size:26px; margin-left: 84px;margin-top: 10px;margin-bottom: 20px"  @click="group_add" >+</span>-->
            </div>

          </router-link>
          <el-select v-model="group" placeholder="请选择集团" clearable   @change="bloc"  >
            <el-option
              v-for="item in group_list"
              :key="item.value"
              :label="item.full_name"
              value-key="id"
              :value="item.id"

            >
            </el-option>
          </el-select>
       <div class="btn" style="margin-top: 30px">
         <button @click="group_add" >新增集团</button>
         <button @click="hotel_add">新增酒店</button>
       </div>
      <!--<div class="moduleTree" style="margin-top: 60px"><router-link to="/organizationchart/hotel"><span style="color: black">添加酒店</span></router-link></div>-->
          <div class="content">
            <div class="control">
              <router-link to="/organizationchart/hotel">
                <el-tree
                  :data="hotel_list"


                  node-key="node.id"
                  :expand-on-click-node="false"
                  node-contextmenu
                  @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }" >
                     <span class="my_node" :data-id="data.id " style="padding-left: 15px;">{{data.name}}</span>
                    <span style="margin-left: 50px ;" v-show="setpro">
                      <!--<i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>-->
                      <!--<i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px "></i>-->
                      <i class="el-icon-circle-plus" @click="() => append(data)" style="margin-right: 30px "></i>
                    </span>
                 </span>
                </el-tree>


              </router-link>
            </div>
          </div>


    </div>
    <!--子路由-->
    <div class="router">
      <router-view    :bit="bit"></router-view>
      <div class="ini"><logon-view></logon-view></div>
    </div>
    <!--点击集团下的加号 显示的添加蒙版-->
    <div class="masking" v-show="masking">
      <div class="basicInfo"  >
        <div class="left">
          <div class="message">
            <p>基本信息</p>
            <ul>
              <li v-show="group_false">
                <span>选择集团</span><el-select v-model="group" placeholder="请选择集团" clearable >
                <el-option
                  v-for="item in group_list"
                  :key="item.value"
                  :label="item.full_name"
                  value-key="id"
                  :value="item.id"
                >
                </el-option>
              </el-select></li>
              <li v-show="affiliation_group"> <span>所属集团：</span><el-input v-model="affiliation_name " style="width: 217px" placeholder="请输入内容" :disabled="true"></el-input></li>
              <li v-show="group_masking"> <span>集团全称：</span><el-input v-model="full_name " style="width: 217px" placeholder="请输入内容"></el-input></li>
              <li v-show="hotel_masking"> <span>酒店全称：</span><el-input v-model="input" style="width: 217px" placeholder="请输入内容"></el-input></li>
              <li v-show="group_masking"> <span>集团简称：</span><el-input v-model="short_name " style="width: 217px" placeholder="请输入内容"></el-input></li>
              <li v-show="hotel_masking"> <span>酒店简称：</span><el-input v-model="hotel_input" style="width: 217px" placeholder="请输入内容"></el-input></li>
              <li> <span>代码：</span><el-input v-model="code" placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li style="height: 46px;line-height: 46px">
                <span>审核状态：</span>
                <el-radio v-model="radio" label="1">已通过</el-radio>
                <el-radio v-model="radio" label="0">未通过</el-radio>
              </li>
              <li> <span>中文描述：</span><el-input v-model="desc " placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li> <span>英文描述：</span><el-input v-model="desc_en " placeholder="请输入内容" style="width: 217px"></el-input></li>
            </ul>

          </div>
          <div class="contact">
            <p>联系方式</p>
            <ul>
              <li> <span>总机：</span><el-input v-model="office_tel " placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li> <span>国家：</span>
                <el-select v-model="country_code" placeholder="请选择">
                  <el-option
                    v-for="item in country_code_list"
                    :key="item.value"
                    :label="item.descript"
                    :value="item.code">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>订房电话：</span>
                <el-input v-model="reserve_tel " placeholder="请输入内容"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" style="width: 217px"></el-input>
              </li>
              <li> <span>州/省：</span><el-input v-model="province" placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li>
                <span>服务电话：</span>
                <el-input v-model="service_tel" placeholder="请输入内容"   onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"  style="width: 217px">

                </el-input></li>
              <li> <span>城市：</span><el-input v-model="city" placeholder="请输入内容" style="width: 217px"> </el-input></li>
              <li> <span>传真：</span><el-input v-model="fax" placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li style="height: 46px;vertical-align: top">
                <span style="width: 132px;vertical-align: top;margin-top: 5px">地理位置经纬度：</span>
                <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 48px;display: inline-block" >东经:</span>
                <input style="width: 40px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_east">
                <span style="font-size: 16px;vertical-align: top;margin-top: 5px;margin-left: 15px;width: 50px;display: inline-block">北纬：</span>
                <input style="width: 40px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_west">

              </li>
              <li style="height: 46px;line-height: 46px">
                <span>状态：</span>
                <el-radio v-model="normal" label="1">正常</el-radio>
                <el-radio v-model="normal" label="0">停用</el-radio>
              </li>
              <li> <span>官网：</span><el-input v-model="web_site " placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li> <span>邮箱：</span><el-input v-model="email" placeholder="请输入内容" style="width: 217px"></el-input></li>
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
              <el-input v-model="dns " placeholder="请输入内容" style="width: 217px"></el-input>
            </li>
            <li>
              <span>邮编 ： </span>
              <el-input v-model="postal_code"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容" style="width: 217px"></el-input>
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
            <li v-show="group_masking">
              <button @click="save">保存</button>
              <!--<button style="margin-left: 30px">重置</button>-->
              <button style="margin-left: 30px" @click="cancel">取消</button>
            </li>
            <li v-show="hotel_masking">
              <button  v-show="hotel_hold" @click="hold"  >保存</button>
              <button  v-show="affiliation_group"  @click="preserve">保存</button>
              <!--<button style="margin-left: 30px">重置</button>-->
              <button style="margin-left: 30px" @click="cancel">取消</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="department" v-show="department">
          <div class="message">
            <p>部门信息</p>
            <ul>
              <li>
                <span>所属酒店</span><el-select v-model="department_hotel " placeholder="请选择酒店"  style="width: 217px"  :disabled="true" clearable >
                <el-option
                  v-for="item in hotel_list"
                  :key="item.value"
                  :label="item.full_name"
                  value-key="id"
                  :value="item.id"
                >
                </el-option>
              </el-select></li>
              <li> <span>部门名称：</span><el-input v-model="department_name " style="width: 217px" placeholder="请输入内容"></el-input></li>
              <li> <span>上级部门：</span><el-input v-model="superior_department " style="width: 217px" placeholder="请输入内容"  :disabled="true"></el-input></li>

              <li style="height: 46px;line-height: 46px">
                <span>审核状态：</span>
                <el-radio v-model="radio" label="1">已通过</el-radio>
                <el-radio v-model="radio" label="0">未通过</el-radio>
              </li>
              <li> <span>中文描述：</span><el-input v-model="chinese_name " placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li> <span>英文描述：</span><el-input v-model="english_name " placeholder="请输入内容" style="width: 217px"></el-input></li>
              <li>
                <button @click="hotel_save">保存</button>
                <button style="margin-left: 30px" @click="cancel">取消</button>
              </li>
            </ul>
          </div>
  </div>
  </div>
</template>

<script>
  import Son from "./basic-info";
  import Childen from "./sections";
  import HotelSon from "./hotel"
  let id = 1000;
    export default {
        name: "organization",
      data() {

        const data = [{

          id: 1,
          label: '内控店控',
          children: [{
            id: 2,
            label: '组织机构管理'
          }, {
            id: 3,
            label: '权限管理'
          },
            {
              id: 4,
              label: '薪资管理'
            }
          ]
        }];


        return {
          api:'http://47.98.113.173:9519',
          country_code_list:[],//获取国家列表
          son:false,
          hotelson:false,
          childen:false,
          activeName2: 'first',
          data4: JSON.parse(JSON.stringify(data)),
          data5: JSON.parse(JSON.stringify(data)),
          masking:false,//蒙版的显示隐藏
          department:false,//添加部门的显示和隐藏
          input:'',//酒店的全程
          hotel_input:'',//酒店的简称
          // checked:'',//状态
          options: [{
            value: '0',
            name: '无登陆入口'
          }, {
            value: '1',
            name: '有登录入口'
          },],
          value: '',
          group_false:false,//选择集团的显示与隐藏
          authorization_token:'',//获取token
          group:'',//集团信息的选择框
          affiliation_name:'',//所属集团
          affiliation_group:false,//所属集团的框
          hotel_masking:false,//酒店添加的蒙版显示
          group_masking:false,//集团添加的蒙版显示
          hotel_hold:false,//添加酒店后的保存
          group_list:[],//获取后台的集团信息
          hotel_list:[],//获取酒店的信息
          setpro:false,//酒店后的自带修改和删除
          hotel_id:'',//需要修改的酒店的

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
          //创建人
          //创建日期
          //修改日期
          //修改人
          //log里的东西
          dialogImageUrl: '',
          dialogVisible: false,


        //  酒店的基本信息de id
         bit:'',
          //点击添加部门时获得的酒店
          department_hotel:'',
          department_hotel_id:'',
        //  获得上级部门id
          superior_department_id:'',
        //  部门信息
          hotelid:'',//所点击的酒店id
          hotel_id_name:'',//所属酒店
          department_name:'',//部门名称
          superior_department:'',//上级部门
          radio:"1",//审核状态
          chinese_name:'',//中文备注
          english_name:'',//英文备注
        };
      },
      created:function () {
        let that=this;
        that.full();
        console.log(that.group);
        that.hotel();

      },
      watch:{

      },


      methods: {
        bloc(){
          this.$router.push({
            path:'/organization/basic-info',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              group:this.group ,
            }
          })


        },
          //封装获取集团信息
        full(){
          let that=this;
          that.$axios({
            "url": ""+that.api+"/v1/common/hotel_group/info_list",
            "method": "get",
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                // console.log(res.data);
               that.group_list=res.data.data.list;
               that.group= res.data.data.list[0].id
               that.group_full_name = res.data.data.list.full_name
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获取酒店的信息
        hotel(){
          let that=this;
          that.$axios({
            "url": ""+that.api+"/v1/common/dept/get_tree",
            "method": "get",
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                  that.hotel_list=res.data.data;
                // that.bit= res.data.data.list[0].id
                  // that.hotel();
              }
              else{
                that.error(res.data.message);
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //封装获取国家的列表
        country_info(){
          this.$axios({
            url: "http://47.98.113.173:8095/v1/system/settings/get_country_list/?page_size=300",
            method: "get",
            //headers: {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.results);
                this.country_code_list=res.data.data.results;

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },


       //封装错误信息提示
        error(message){
          this.$message({
            showClose: true,
            message: '错误哦，这是'+message+"的错误",
            type: 'warning'
          });
        },
        //  点击集团下的加号显示蒙版 添加集团信息
        group_add(){
           this.masking=true;
           this.department=false;
           this.hotel_masking=false;
           this.group_masking=true;
           this.group_false=false;
           this.affiliation_group=false;
           this.country_info();
        },
        //点击添加集团显示蒙版后的保存
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
            url:""+this.api+"/v1/common/hotel_group/add",
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
                this.department=false;
                this.full();
              }else {
                console.log(res.data.message)
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



        //点击蒙版里的取消
        cancel(){
          this.masking=false;
          this.department=false;
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
            this.log='',//log
            this.dns='',//DNS
            this.postal_code='',//邮编
            this.address_1='',//地址1
            this.address_2=''//地址二
        },

         //点击添加酒店显示蒙版，添加酒店
        hotel_add(){
          this.masking=true;
          this.department=false;
          this.department=false;
          this.hotel_masking=true;
          this.hotel_hold=true;
          this.group_masking=false;
          this.group_false=true;
          this.affiliation_group=false;
          // this.group='',//集团信息的选择框
            //集团蒙版的基本信息
            // this.full_name ='', //集团全称
            // this.short_name ='',   //集团简称
            this.code ='',  //代码
            this.desc='',//中文描述
            this.desc_en='',//英文描述
            // 集团蒙版的联系方式
            this.office_tel='',//总机
            this.country_code='',//国家
            this.reserve_tel='',//订房电话
            this.province='',//州/省
            this.service_tel='',//服务电话
            this.city='',//城市
            this.fax='',//传真
            //地理位置
            this.position_east='',// 东经
            this.position_west='',// 北纬
            //状态
            this.web_site='',//官网
            this.email='',//邮箱
            this.photo='',//集团照片
            this.postal_code='',//邮编
            this.address_1='',//地址1
            this.address_2='',//地址二
             this.full();
        },

        //点击添加酒店后的保存
        hold(){
          this.$axios({
            url: ""+this.api+"/v1/common/hotel/add",
            method: "post",
            data:{
              //集团蒙版的基本信息
              hotel_group_id:this.group,
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
              logo:'',//log
              dns:this.dns,//DNS
              postal_code:this.postal_code,//邮编
              address_1:this.address_1,//地址1
              address_2:this.address_2,//地址二
            },
            //headers: {"authorization": this.authorization_token}
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res)
                this.masking=false;
                this.department=false;
                this.hotel();
                //  console.log(this.module_list);

              }
              else{
                this.error(res.data.message)
                console.log(res.data.message);
              }

              // that.newlists=res.data.data
            })
            .catch(error=>{
              console.log(error);
            })
        },

        //点击下属酒店
        handleNodeClick(data,e){
            this.setpro=true;
          console.log(data, e);

          let that=this;
        that.hotelid=data.id;
        console.log( that.hotelid)
          that.$axios({
            "url": ""+that.api+"/v1/common/hotel/get_info/"+that.hotelid,
            "method": "get",
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                if(data.children!=""){
                  that.bit= res.data.data;
                }

                // that.bit= res.data.data;
                // that.hotel();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //点击树状图上的酒店里的修改图标
        amend(node, data){
          let that=this;
          that.hotel_id=data.id;
          console.log(node, data);
          that.masking=true;
          that.department=false;
          that.hotel_masking=true;
          that.hotel_hold=false;
          that.affiliation_group=true;
          //集团蒙版的基本信息
          that.affiliation_name=data.hotel_group_id.full_name;
          that.input=data.name; //酒店全称
          that.hotel_input=data.short_name;   //酒店简称
          that.code=data.code; //代码
          //审核状态
          if(data.audit==0){
           that.radio="0"
          }else if(data.audit==1){
            that.radio="1"
          }
          that.desc=data.desc;//中文描述
          that.desc_en=data.desc_en;//英文描述
            // // 集团蒙版的联系方式
          that.office_tel=data.office_tel;//总机
          that.country_code=data.country_code;//国家
          that.reserve_tel=data.reserve_tel;//订房电话
          that.province=data.province;//州/省
          that.service_tel=data.service_tel;//服务电话
          that.city=data.city;//城市
          that.fax=data.fax;//传真
            // position:this.position_west+','+this.position_east,
            // //地理位置
            // // position_east:'',// 东经
            // // position_west:'',// 北纬
            //
            that.status=data.normal;//状态
            that.web_site=data.web_site;//官网
            that.email=data.email;//邮箱
            that.photo=data.photo;//集团照片
            that.logo=data.log;//log
            that.dns=data.dns;//DNS
            that.postal_code=data.postal_code;//邮编
            that.address_1=data.address_1;//地址1
            that.address_2=data.address_2;//地址二


        },
        //点击树状图上的酒店修改后的保存
        preserve(){
          console.log("保存");
          this.$axios({
            url:""+this.api+"/v1/common/hotel/update/"+this.hotel_id,
            method: "post",
            // params:{},
            data:{
              //集团蒙版的基本信息
              full_name :this.input, //集团全称
              short_name :this.hotel_input,   //集团简称
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
                this.department=false;
                this.hotel();
              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })

        },

        //点击树状图上的添加
        append(data) {
          console.log(data);
          this.masking=false;
           this.department=true;
          // this.department_hotel_id=data.hotel_id;//酒店id
          this.superior_department_id=data.id;//上级部门
          this.superior_department=data.name;//上级名字
          // this.department_hotel=data.short_name;//酒店名字
          // this.department_parent_id=data.id;//上级部门的
          if(data.is_hotel && data.is_hotel==1){
            this.department_hotel_id=data.id;
            this.department_hotel=data.name;//酒店名字
            this.superior_department_id=null//上级部门
            this.superior_department='';//上级名字

          }else {
            this.department_hotel_id=data.hotel_id;
            this.department_hotel=data.short_name;//酒店名字
            this.superior_department_id=data.id;//上级部门
            this.superior_department=data.name;//上级名字
          }

        },
        //点击树状图上的添加后的保存
        hotel_save(){
          this.$axios({
            url:""+this.api+"/v1/common/dept/add",
            method: "post",
            // params:{},
            data:{
              hotel_id:this.department_hotel_id,//所属酒店
              name:this.department_name,//部门名称
              parent_id :this.superior_department_id,//上级部门id

              audit:this.radio,//审核状态
              desc:this.chinese_name,//中文备注
              desc_en:this.english_name,//英文备注

            },
            //headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              if(res.data.message==="success"){
                console.log(res);
                this.masking=false;
                this.department=false;
                this.hotel();

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              this.error(res.data.message)
              console.log(error);
            })
        },

        //酒店的删除
        remove(node, data) {
          console.log(node, data);
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          let id=data.id;
          console.log(id)
          console.log(children);
          if (node.childNodes==""){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              children.splice(index, 1);

              this.$axios({
                url:""+this.api+"/v1/common/hotel/remove/${id}",
                method: "post",
                //headers: {'authorization': this.authorization_token}
              })
                .then(res=>{
                  console.log(res.data.message)
                  if (res.data.message=="success"){
                    //获取信息列表
                    this.hotel();
                  }else{
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
          }else {
            alert("这是一个父目录，子目录还存在，不能删除")
          }

        },

      }

    }
</script>

<style  lang="less"  scoped>
  .organization {
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 60px);
    overflow-y: scroll;
    min-width: 1500px;
    .tree {
      width: 280px;
      max-width: 410px;
      height: 100%;
      /*overflow-y: scroll;*/
      /*min-height: 1000px;*/
      /*background: rgba(247, 247, 247, 1);*/
      float: left;
      .serialNumber {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 10px;
        span {
          margin-left: 20px;
        }
      }
      .btn {
        margin-left: 10px;
        button {
          border: none;
          outline: none;
          width: 90px;
          height: 40px;
          background: rgba(68, 136, 233, 1);
          border-radius: 4px;
          color: white;
        }

      }
      .moduleTree {
        width: 286px;
        height: 40px;
        background: rgba(238, 238, 238, 1);
        font-size: 16px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: black;
        line-height: 40px;
        margin-left: -15px;
        padding-left: 98px;
      }
      .content {
        width: 100%;
        margin-top: 10px;
        .control {
          width: 100%;
          p {
            font-size: 26px;
            background: rgba(247, 247, 247, 1);
            padding-left: 84px;

          }
        }
      }

    }
    .router {
      width: calc(100% - 300px);
      /*overflow: hidden;*/
      overflow-y: scroll;
      /*height: 100%;*/
      font-size: 20px;
      float: left;

      overflow: hidden;
      /*min-height: 1000px;*/
      white-space: nowrap;
      background: rgba(247, 247, 247, 1);
      .ini {
        height: 96.8%;
        position: absolute;
        right: 0;
        top: 30px;

      }
    }
    .masking {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 13, 32, 0.3);
      z-index: 9000;
      .basicInfo {
        width:80%;
        height: 85%;
        overflow-y: scroll;
        background: white;
        margin: 4% 10% 0 10%;
        .left {
          width: 68%;
          float: left;
          .message {
            width: 100%;
            padding-left: 29px;
            p {
              width: 80px;
              font-size: 16px;
              /*height: 60px;*/
              /*line-height: 60px;*/
              margin-top: 16px;
              margin-bottom: 10px;
              font-weight: bold;
            }
            ul {
              overflow: hidden;

              li {
                float: left;
                width: 360px;
                font-size: 16px;
                margin-bottom: 5px;
                span {
                  width: 80px;
                  display: inline-block;
                  vertical-align: top;
                }

              }
            }
          }
          .contact {
            padding-left: 29px;
            p {
              font-size: 16px;
              margin: 10px 0;
              font-weight: bold;
            }
            ul {
              overflow: hidden;

              li {
                float: left;
                width: 360px;
                font-size: 16px;
                margin-bottom: 5px;
                span {
                  width: 80px;
                  display: inline-block;
                  vertical-align: top;
                }

              }
            }
          }
          .phone {
            width:600px;
            height: 230px;
            /*line-height: 398px;*/
            text-align: center;
            background: white;
            margin-left: 31px;
            /*margin-top: 15px;*/
            margin-bottom: 24px;
            border: 1px solid rgb(204, 204, 204);
          }

        }
        .right {
          float: left;
          .log {
            width: 227px;
            height: 227px;
            background: white;
            /*margin-left: 100px;*/
            line-height: 227px;
            text-align: center;
            /*margin-bottom: 22px;*/
            border: 1px solid rgb(204, 204, 204);
            margin-top: 50px;

          }
          .site {
            /*margin-left: 60px;*/
            font-size: 16px;
            margin-top: 40px;
            li {
              margin-bottom: 10px;
              span {
                width: 70px;
                display: inline-block;
                text-align: left;
                vertical-align: top;
              }

            }
          }
          .establish {
            /*margin-left: 132px;*/
            margin-top: 100px;
            font-size: 16px;
            li {
              margin-bottom: 22px;
              button {
                outline: none;
                width: 90px;
                height: 40px;
                background: rgba(68, 136, 233, 1);
                border-radius: 4px;
                color: white;
              }
            }
          }
        }
      }
    }
    .department {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 13, 32, 0.3);
      z-index: 9000;

      .message {
        width: 60%;
        height: 70%;
        background: white;
        margin-left: 20%;
        margin-top: 10%;
        p {
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          padding-top: 16px;
          margin-bottom: 10px;
          margin-left: 60px;
          font-weight: bold;
        }
        ul {
          overflow: hidden;
          margin-left: 60px;
          li {
            float: left;
            width: 480px;
            font-size: 16px;
            margin-bottom: 15px;
            span {
              width: 120px;
              display: inline-block;
              vertical-align: top;
            }

          }
          button {
            outline: none;
            width: 90px;
            height: 40px;
            background: rgba(68, 136, 233, 1);
            border-radius: 4px;
            color: white;
          }
        }
      }

    }
  }

</style>
<style >
  /*.expanded{*/
    /*display: none;*/
  /*}*/
/*.el-select{*/
  /*width: 217px;*/
/*}*/
  /*.update/deep/ .el-checkbox{*/
    /*display: none;*/
  /*}*/
  .ee-node{
    padding-top: 10px;
  }
  .el-select-dropdown .el-popper{
    z-index: 9999;
  }
</style>
