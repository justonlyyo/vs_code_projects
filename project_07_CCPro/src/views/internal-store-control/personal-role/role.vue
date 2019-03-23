<template>
  <div class="role">
    <span style="line-height: 86px;vertical-align: top;margin-right: 10px">人员</span>
    <el-button type="text" @click="dialogVisible = true;flush()">
      <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" style="margin-top: 18px">
    </el-button>
     <!--添加人员显示的-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <div class="dialogVisible_style" >
          <div class="message">
            <p style="font-weight: bold;font-size: 18px;margin-bottom: 10px">用户信息</p>
            <ul>
              <li> <span>用户姓名：</span><el-input v-model="param.real_name"  style="width: 217px;" placeholder="请输入内容"></el-input></li>
              <li> <span>昵称：</span><el-input v-model="param.nick_name" placeholder="请输入内容"  style="width: 217px;"></el-input></li>
              <li> <span>用户名：</span><el-input v-model="param.user_name" placeholder="请输入内容"  style="width: 217px;"></el-input></li>
              <li> <span>密码：</span><el-input v-model="param.password " placeholder="请输入内容" type="passworld" style="width: 217px;"></el-input></li>
              <li> <span>工号：</span><el-input v-model="param.work_id " placeholder="请输入内容"  style="width: 217px;"></el-input></li>
              <li >
                <span>人员状态：</span>
                <el-radio v-model="param.radio" label="1">正常</el-radio>
                <el-radio v-model="param.radio" label="0">停用</el-radio>
              </li>
              <li> <span>生日：</span>
                <el-date-picker
                v-model="param.birth_date"
                type="date"
                style="width: 217px;"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </li>
              <li> <span>部门：</span>
                <el-select v-model="param.dept_id" placeholder="请选择">
                  <el-option
                    v-for="item in department_list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>

              <li> <span>国籍：</span>
              <el-select v-model="param.country_code" placeholder="请选择">
                <el-option
                  v-for="item in country_code_list"
                  :key="item.value"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
             </li>
              <li> </li>
              <li> <span>手机号码：</span><el-input v-model="param.phone" placeholder="请输入内容"  style="width: 217px;"></el-input></li>
              <li>
                <span style="vertical-align: top">微信号 : </span>
                <div class="code">
                  <p>二维码</p>
                </div>

              </li>
              <li style="margin-top: 20px">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                  <span>上传照片</span>
                </el-upload>
                <el-dialog :visible.sync="param.dialogVisibles">
                  <img width="100%" :src="dialogImageUrl" alt="">

                </el-dialog>

              </li>

            </ul>
          </div>

        </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"@click="dialogVisible = false; saveInfo_role()">确 定</el-button>
  </span>
    </el-dialog>
    <!--为人员增加权限显示的-->
    <el-dialog
      title="增加角色"
      :visible.sync="dialogVisible_power"
      width="70%"
      :before-close="handleClose">
      <div class="dialogVisible_style" >
        <!--<span style="display: inline-block;width: 290px;margin-bottom: 20px">可选择的权限</span>-->
        <p style="display: inline-block;width: 198px;margin-bottom: 20px">增加角色人员名称 ：<span style="color:#4488e9"> {{authority}}</span></p>
        <div class="message" style="overflow: hidden">
          <!--<p style="font-weight: bold;font-size: 18px;margin-bottom: 10px">增加权限</p>-->
          <ul>

            <tree-transfer :title="title" :from_data='bind_list' :to_data='toData'  :defaultProps="{label:'name'}"
                               @addBtn='add' @removeBtn='remove'  height='400px'  >   
            </tree-transfer>

          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="float: left">
    <el-button type="primary"   @click="dialogVisible_power = false">取 消</el-button>
    <el-button type="primary"@click="dialogVisible_power = false; saveInfo_power()">确 定</el-button>
  </span>
    </el-dialog>

    <div class="paging">
      <!--模块列表-->
      <el-table
        :data="employee_list"
        :header-cell-style="{background:'#68819EFF',color:'white'}"

        style="width: 100%;">
        <el-table-column
          prop="real_name"
          fixed
          label="用户姓名">
        </el-table-column>
        <el-table-column
          prop="nick_name"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="work_id"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="status"
          label="人员状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">停用</span>
            <span v-else>正常</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="birth_date"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="dept_id.name"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="country_code"
          label="国籍">
        </el-table-column>
        <el-table-column
          prop="address"
          width="250"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="cancel(scope.row.id,scope.$index, employee_list)" type="danger" size="mini" >删除</el-button>
            <el-button  size="small" @click="submit(scope.row,scope.row.id,scope.$index, employee_list)">修改</el-button>
            <el-button  size="small" @click="new_power(scope.row,scope.row.id,scope.$index, employee_list)">编辑角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;margin-right: 2%"
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import crypto from 'crypto';
  import treeTransfer from 'el-tree-transfer';
  let id = 1000;
    export default {
        name: "role",
      data(){

        return{
          api:'http://47.98.113.173:9519',
          //commid
          commid : 1,
          //commpwd
          commpwd : '',
          title:['人员未拥有角色', '人员已添加角色'],
          toData:[],//选择的角色组
          bind_list:[],//所有角色组
          checked:false,//状态
          role_checked:[],//所选中的权限
          role_id:0,//选中的人员id
          authority:"",//所选中的名字
          direction_tf:'',//判断是增加权限还是降低权限
          amend:true,
          save:false,
          authorization_token:'',
          pagesize:10, //代表每页显示的条数
          total:16,//代表总条数
          input:'',//输入内容
          dialogVisible: false,//新增人员的显示控制
          dialogVisible_power:false,//增加角色显示的控制
          //上传照片的
          dialogImageUrl: '',
          Edite : true, //标志位 判断的是新增还是更新
          department_list:[],//获得部门的值
          employee_list:[],//获得人员的值
          country_code_list:[],//获取国家的列表
          hotel_id_father:this.hotel_id,
         /*
         新增员工里的内容
         * */
          param :{},


        }
      },
      props:{
        hotel_id:{required:true}
      },
      created(){
        let that=this;
        that.employee();
        that.country_info();
      },

      watch:{
        // 监听后台传过来的值得变化
        hotel_id(newValue, oldValue) {
          console.log(newValue)
          this.hotel_id_father = newValue;
          // console.log(this.bits);
          this.examine();
          this.employee();
        },
        deep: true
      },
      components:{ treeTransfer }, // 注册
      methods:{
          /**
           * @flush 是用来刷新数据的
           * */
          flush(){
            let  that = this;
            //第一件事    将标志位改为false
            that.Edite = false;
            that.param = {
                 real_name:'',//用户姓名
                 nick_name:'',//简称
                 user_name:'',//用户名
                 password:'',//密码
                 work_id:'',//工号
                 birth_date:'',//生日
                 dept_id:'',//部门
                 phone:'',//电话
                 country_code:'',//国家
                 status:'',
                 radio:"1",//人员状态
               }
          },

        //封装后台传过来的国家转换为名字
        code_desc(flag,data){
          // flag为1的时候code转desc
          for(let i in that.country_code_list){
            if(flag && data==list[i].code){
              return list[i].desc
            }else if(!flag && data==list[i].desc){
              return list[i].code
            }
          }
        },

          //封装获取人员列表
        employee(){
          this.$axios({
            url: ""+this.api+"/v1/common/employee/info_list",
            method: "post",
            data:{
              hotel_id:this.hotel_id_father,
            },
            // headers: {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.list);
               this.employee_list=res.data.data.list;
                this.total=res.data.data.total_count;
              }
              else{
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
            // headers: {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
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


        /**
         * @getmd5 加密密码使用
         */
        getmd5 : function(pwd){
          var md5 = crypto.createHash("md5");
          md5.update(pwd);
          var password = md5.digest('hex');
          return password;
        },






       // 点击修改
        submit(srow,id,index,list){
          console.log(srow, id, index, list);
          console.log(id);
          this.commid = id,
            this.param.commpwd = srow.password;
            this.Edite = true;
            this.dialogVisible=true;
            this.param.real_name=srow.real_name,//用户姓名
            this.param.nick_name=srow.nick_name,//简称
            this.param.user_name=srow.user_name,//用户名
            this.param.password=srow.password,//密码
            this.param.work_id=srow.work_id,//工号
            this.param.birth_date=srow.birth_date,//生日
            this.param.dept_id=srow.dept_id.id,//部门
            this.param.phone=srow.phone,//电话
            this.country_code=srow.country_code,//国家
            this.param.radio=srow.status+"";//人员状态
            this.hotel_id=srow.hotel_id.id;//所属酒店的id





        },

        //点击角色上的删除
        cancel(id,index,list){
          console.log(id);
          console.log(index);
          console.log(list);
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            list.splice(index, 1);
            this.$axios({
              url:""+this.api+"/v1/common/employee/remove/"+id,
              method: "post",
              // params:{},
              // data:{},
              // headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  this.employee();
                  // this.masking=false;
                }
                // location.reload(); // 强制刷新
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
        //点击人员新增和修改后的保存
        saveInfo_role(){
          // let that=this;
          if(this.param.radio=="0"){
            this.param.radio=0
          }else if(this.param.radio=="1"){
            this.param.radio=1
          }
         let urldata = this.Edite ? (""+this.api+"/v1/common/employee/update/"+this.commid) :  (""+this.api+"/v1/common/employee/add");
         console.info(urldata);
         if(this.Edite==false){
           this.param.password=this.getmd5(this.param.password)
         }else {
           this.param.password=this.commpwd;
         }
          this.$axios({
            "url": urldata,
            "method": "post",
            data:{
              real_name:this.param.real_name,//用户姓名
              nick_name:this.param.nick_name,//简称
              user_name:this.param.user_name,//用户名
              password:this.param.password,//密码
              work_id:this.param.work_id,//工号
              birth_date:this.param.birth_date,//生日
              dept_id:this.param.dept_id,//部门
              phone:this.param.phone,//电话
              country_code:this.param.country_code,//国家
              status:this.param.radio,//人员状态
              hotel_id:this.hotel_id,//所属酒店的id

            },
            // "headers": {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                // console.log(res);
                this.employee();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //点击编辑角色
        new_power(id,index){
          let that = this;
          that.toData=[];
          that.dialogVisible_power=true;
          console.log(id, index);
          that.authority=id.real_name;
          that.role_id=id.id;
          that.part();//获取所有角色组
          that. personalRole();


        },

        //点击编辑角色后的保存
        saveInfo_power(){
          let that=this;
          //传给后台两个值
          //1：所点击的角色的id   that.role_id
          //2：所选中的权限组    that.role_checked
          that.toData.forEach(item =>{
            console.log(item.id)
          });
          that.$axios({
            url: ""+that.api+"/v1/common/employee/bind_role",
            method: "post",
            data:{
              user_id:that.role_id,//所点击的id
              roles:JSON.stringify(that.toData),//选中的api
            },
            // headers: {"authorization": that.authorization_token,}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },

        //封装获取角色组
        part(){
          let that=this;
          that.$axios({
            "url": ""+that.api+"/v1/common/role_group/get_tree",
            "method": "get",
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.bind_list=res.data.data;

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //封装获取人员已有的角色
        personalRole(){
          let that = this;
          that.$axios({
            url: ""+that.api+"/v1/common/employee/get_roles",
            method: "post",
            data:{
              user_id:that.role_id,
            },
            // headers: {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success") {
                console.log(res.data);
                that.toData=res.data.data;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },


        // 监听穿梭框组件添加
        add(fromData,toData,obj){
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
          // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
          console.log('toData',toData);
          console.log('obj',obj);

          let that= this;
          that.toData=toData;

        },
        // 监听穿梭框组件移除
        remove(fromData,toData,obj){
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
          // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
          console.log('fromData',fromData);
          console.log('toData',toData);
          console.log('obj',obj);
          let that = this;
          that.toData=toData;
          // that.part();
        },





        //查看部门信息
        examine(){
          console.log(this.hotel_id);
          this.$axios({
            url: ""+this.api+"/v1/common/dept/info_list",
            method: "post",
            data:{
              hotel_id:this.hotel_id_father,
            },
            // headers: {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.list);
                this.department_list=res.data.data.list

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },


        //点击分页上的页数
        handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          // this.curPage=curPage;
          this.$axios({
            url: ""+this.api+"/v1/common/employee/info_list",
            method: "post",
            data:{
              page_num:curPage,
              page_size:this.pagesize
            },
            // headers: {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.list);
                this.employee_list=res.data.data.list;

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //新增人员你的显示控制
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      //  上传照片
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
                that.employee();
                that.country_info();
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
 .role{
   width:calc(100% - 50px);
   /*width: 100%;*/
   height:100%;
   margin-left: 32px;
   overflow-y: scroll;
   .dialogVisible_style{
      .message{
        ul{
          overflow: hidden;
          span{
            display: inline-block;
            width: 90px;

          }
          li{
            width:50%;
            margin-bottom: 10px;
            float: left;
            .code{
              p{
                width: 150px;
                height: 150px;
                margin-left: 90px;
                border: 1px solid #dcdfe6;
                text-align: center;
                line-height: 150px;
              }
              .establish{
                /*width: 400px;*/
                overflow: hidden;
                margin-top: 10px;
                margin-left: 90px;
                li{
                  float: left;
                  width: 300px;
                }
              }
            }
          }
        }
      }

   }
   .paging{
     width: 100%;
     overflow: hidden;
     background:rgba(255,255,255,1);
     .title{
       width: calc(100% - 30px);
       height: 40px;
       background: #68819EFF;
       /*margin: 0 104px  0  24px;*/
       /*margin-right: 104px;*/
       line-height: 40px;
       display: flex;
       /*min-width: 1140px;*/
       li{
         font-size:14px;
         font-family:Adobe Heiti Std R;
         font-weight:normal;
         color:rgba(255,255,255,1);
         flex-grow: 1;
         margin-left: 20px; ;
       }
     }
     .amend ,.save{
       width: calc(100% - 30px);
       height: 44px;
       line-height: 44px;
       /*background:rgba(247,247,247,1);*/
       border-bottom: 1px solid #EDEDED;
       margin-bottom: 7px;
       position: relative;
       /*min-width: 1200px;*/
       div{
         position: absolute;
         top: 0px;
         right: 0;
         span{
           font-size:14px;
           font-family:PingFangSC-Regular;
           font-weight:400;
           color:rgba(104,129,158,1);
         }
       }
     }
   }
    .user{
    .left{
      width: 1000px;
      /*height: 100%;*/
      float: left;
      .message{
        padding-left: 29px;
        position: relative;
        p{
          font-size: 16px;
          height: 60px;
          line-height: 60px;
        }
        ul{
          overflow: hidden;

          li{
            float: left;
            width: 480px;
            font-size: 16px;
            margin-bottom: 24px;
            span{
              width: 78px;
              display: inline-block;
            }
            input{
              width: 300px;
              height: 30px;
              margin-bottom: 10px;
              margin-left: 10px;
            }
            p{
              display: inline-block;
            }
            .code{
              display: inline-block;
              margin-left: 10px;
              p{
                width: 157px;
                height: 146px;
                background: #00C1DE;
                vertical-align: top;

              }

              .establish{
                display: inline-block;
                font-size: 16px;
                margin-left: 34px;
                li{
                  margin-bottom: 18px;

                }
              }
            }
          }
        }
        .btn{
          position: absolute;
          bottom: 20px;
          left: 29px;
          button{
            outline: none;
            border: none;
            width: 90px;
            height: 40px;
            background:rgba(68,136,233,1);
            border-radius:4px;
            color: white;
          }

        }
      }


    }
    .right{
      float: left;
      .phone{
        width: 236px;
        height: 236px;
        background: white;
        text-align: center;
        line-height: 236px;
        margin-top: 82px;
        margin-left:128px;
      }
      .save{
        width: 236px;
        overflow: hidden;
        margin-left:128px;
        margin-top:32px;
        button{
          width: 90px;
          height: 40px;
          border: none;
          outline: none;
          background:rgba(68,136,233,1);
          border-radius:4px;
          float: left;
          color: white;
        }
      }
    }
   }




 }
</style>
<style>
  /*.el-input{*/
    /*width: 300px;*/
  /*}*/
  .el-table .cell{
    text-align:center;
  }
  /*.el-date-editor.el-input, .el-date-editor.el-input__inner {*/
    /*width: 300px;*/
  /*}*/
  .el-dialog__footer{
    overflow: hidden;
  }
  /*.el-checkbox{*/
    /*display: inline;*/
  /*}*/
</style>
