<template>
  <div class="permissions">
    <div class="tree" >
      <div class="moduleTree"><span style="color: black">角色组</span></div>
      <div class="content">
        <div class="control">
          <el-tree
            :data="role_set"
            show-checkbox
            node-key="node.id"
            :expand-on-click-node="false"
            node-contextmenu
            @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="margin-left: 50px ;" v-show="setpro">
                      <i class="el-icon-edit" style="margin-right: 30px " @click="() => revise(node, data)" ></i>
                      <i class="el-icon-delete" @click="() => cancel  (node, data)" style="margin-right: 30px "></i>
                      <!--<i class="el-icon-circle-plus" @click="() => append(data)" style="margin-right: 30px "></i>-->
                    </span>
                 </span>
          </el-tree>
          <p @click="add">+</p>
        </div>
        </div>
      <div class="moduleTree">权限组</div>
      <div class="content">
        <div class="control">
          <el-tree
            :data="permission_group"
            show-checkbox
            node-key="node.id"
            :expand-on-click-node="false"
            node-contextmenu
            @node-click="nodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="margin-left: 50px ;" v-show="setpro_group">
                      <i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>
                      <i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px "></i>
                      <!--<i class="el-icon-circle-plus" @click="() => append(data)" style="margin-right: 30px "></i>-->
                    </span>
                 </span>
          </el-tree>
          <p @click="append">+</p>
        </div>
      </div>
    </div>

    <div class="router">
      <child ref="mychild"></child>
      <div class="ini"><logon-view></logon-view></div>
    </div>
    <!--点击加号出现编辑的页面-->
    <div class="masking" v-show="masking">
      <!--点击角色上的修改弹出的蒙版-->
      <ul class="mask_information" v-show="role">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li>
          <span >角色组</span><el-input v-model="name" placeholder="请输入内容" style="width: 300px;"   ></el-input>

        </li>
        <li><span >代码</span><el-input v-model="code" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li>
          <span >状态</span><el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li><span >中文备注</span><el-input v-model="desc"  style="width: 300px;"  placeholder="请输入内容" ></el-input></li>
        <li><span >英文备注</span><el-input v-model="desc_en" placeholder="请输入内容"  style="width: 300px;"></el-input></li>
        <li  v-show="hotel_pub"><span >酒店</span><el-select v-model="hotel_id" placeholder="请选择">
          <el-option
            v-for="item in part_hotel_list"
            :key="item.value"
            :label="item.short_name"
            :value="item.id">
          </el-option>
        </el-select>
          </li>
        <li v-show="pub_hotel"><span >酒店</span><el-input v-model="pub"   style="width: 300px;"  :disabled="true"   placeholder="请输入内容"></el-input></li>
        <li   v-show="pub_hotel" style="margin-top:50px;"><button @click="preserve">保存</button> <button @click="abolish">取消</button></li>
        <li v-show="hotel_pub" style="margin-top:50px;"><button @click="conserve">保存</button> <button @click="abolish">取消</button></li>
      </ul>
      <!--点击权限上的修改弹出的蒙版-->
      <ul class="mask_information" v-show="right_control">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li><span >权限组名称</span><el-input v-model="permission_name" placeholder="请输入内容" style="width: 300px;" @blur="unfocused('name', permission_name)" ></el-input></li>
        <li><span >权限组代码</span><el-input v-model="permission_code" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li>
          <span >状态</span><el-select v-model="status_bar" placeholder="请选择"><el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        </li>
        <li><span >中文备注</span><el-input v-model="chinese_name" placeholder="请输入内容"  style="width: 300px;"></el-input></li>
        <li><span >英文备注</span><el-input v-model="english_name"   style="width: 300px;"    placeholder="请输入内容"></el-input></li>
        <li v-show="hotel_pub"><span >酒店</span><el-select v-model="status_bar" placeholder="请选择"><el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
        </el-select></li>
        <li v-show="pub_hotel"><span >酒店</span><el-input v-model="pub"   style="width: 300px;"  :disabled="true"   placeholder="请输入内容"></el-input></li>
        <li v-show="hotel_pub" style="margin-top:50px;"><button @click="keep">保存</button> <button @click="abolish">取消</button></li>
        <li v-show="pub_hotel" style="margin-top:50px;"><button @click="keep_pub">保存</button> <button @click="abolish">取消</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Child from './role-privileges';
  let id = 1000;
    export default {
        name: "permissions",
      components: {
        child: Child
      },
      data() {
        const data = [{

        }];


        return {

          options: [{
            value: '0',
            name: '禁用'
          }, {
            value: '1',
            name: '可用'
          }],
          value: '',
          activeName2: 'first',
          data4: JSON.parse(JSON.stringify(data)),
          data5: JSON.parse(JSON.stringify(data)),
          index:this.data,
          setpro:false,//角色组的添加修改
          setpro_group:false,//权限组的添加修改
          authorization_token:'',//获取token值
          permission_group:[],//获取后台传的权限数组
          masking:false,//蒙版层
          right_control:false,//点击权限的修改显示和隐藏
          role:false,//点击角色的修改显示和隐藏

          // 蒙版里的角色信息
          name:'',////角色名
          role_group:'',//角色组
          roles_id:'',//传给后台的所选择的角色组id
          code:'',//代码
          status:'',//状态
          desc:'',//中文备注
          desc_en:'',//英文备注
          hotel_id:'',//酒店
          grogshop_id:'',//点击修改后传给后台的酒店id
          right_control:false,//点击权限的修改显示和隐藏
          role:false,//点击角色的修改显示和隐藏
          role_set:[],//接受后台返回的角色组渲染蒙版层里的角色组
          root_id:'',//模块种类
          has_entry:'',//模块类型
          url:'',//链接
          authorization_token:'', //获取的token
          newlists:[],//接受后端传过来的数据
          setpro:false,//模块树上的图标显示和隐藏
          save_add:false,//点击加号显示的保存和取消
          save_childen:false,//点击自身图标显示的保存和取消
          save_preserve:false,//点击修改显示的保存和取消
          //  蒙版里的权限信息
          permission_name:'',//权限名称
          api:'',//API
          status_bar:'',//状态
          chinese_name:'',//中文备注
          english_name:'',//英文备注
          associated:'',//关联页面
          permission_name_id:'',//权限修改传给后台的id
          role_set_id:'',//角色组修改传给后台的id
          permission_code:'',//权限组的代码
          pub:'',//点击自身的修改  权限组的酒店
          pub_hotel:false,//点击自身修改显示的 权限组的酒店
          hotel_pub:false,//  点击加号显示的 权限组的酒店
          part_hotel_list:[],//获取角色组的酒店

        };
      },
      created:function () {
        let that=this;
        //执行获取token值
        var test_1 = function(){
          console.log("authorization success");
        };
        //执行获取token值的函数
        this.authorization(test_1);
        //延迟获取列表/*如不延迟   token值获取不到的时候就开始请求会报错*/
        setTimeout(function () {
          //获取角色组数据
           that.part();

          //  获取权限组
          that.permission();

          //获取角色组的酒店
          that.part_hotel();

        },1000)
      },
      methods: {
          //封装获取权限组的函数
        permission(){
          let that=this
          that.$axios({
            url: "/api/v1/common/rule_group/info_list",
            method: "get",
            headers: {"authorization": that.authorization_token}
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.permission_group=res.data.data.list
              }
              else{
                console.log(res.data.message);
              }

              // that.newlists=res.data.data
            })
            .catch(error=>{
              console.log(error);
            });
        },

          //封装获取角色组的函数
        part(){
          let that=this;
          that.$axios({
            url: "/api/v1/common/role_group/info_list",
            method: "get",
            headers: {"authorization": that.authorization_token}
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.role_set=res.data.data.list;
                console.log(that.permission_group);
              }
              else{
                console.log(res.data.message);
              }

              // that.newlists=res.data.data
            })
            .catch(error=>{
              console.log(error);
            });

        },

        //分装获取角色组的酒店
        part_hotel(){
          let that=this;
          that.$axios({
            url: "/api/v1/common/role_group/selectable_hotel",
            method: "get",
            headers: {"authorization": that.authorization_token}
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.part_hotel_list=res.data.data;
              }
              else{
                console.log(res.data.message);
              }

              // that.newlists=res.data.data
            })
            .catch(error=>{
              console.log(error);
            });

        },

        // 检查去重
        check_repeat(field, keyword){
          // console.log(this.urls.indexOf(keyword));
          // field 字段名
          //keyworld 输入值
          // 关键词
          if(field === "name"){
            if(this.names.indexOf(keyword)==-1){
              // alert("bu重复")
            }else {
              alert("输入内容已存在，请检查后重新输入")
            }
          }
          else if(field === "name"){
            if(this.permission_name.indexOf(keyword)==-1){
              // alert("bu重复")
            }else {
              alert("输入内容已存在，请检查后重新输入")
            }
          }
          else{
            //
          }
        },


        //当添加信息里的模块代码，链接 失焦事件
        unfocused(field, keyword){
          this.check_repeat(field, keyword);
        },

        // 点击角色组的节点显示编辑和删除
        handleNodeClick( index){
          this.setpro=true;
        },
        // 点击角色组的节点显示编辑和删除
        nodeClick(index){
          this.setpro_group=true;
        },
       //点击角色组的加号
        add(){
          console.log(1);
          this.masking=true;
          this.role=true;
          this.right_control=false;
          this.pub_hotel=false;
          this.hotel_pub=true
        },
        //点击角色组的加号后的保存
        conserve(){
          if (this.status_bar=="可用"){
            this.status_bar=1
          }else if(this.status_bar=="禁用"){
            this.status_bar=0
          };

          console.log("保存");
          console.log(this.creator)
          this.$axios({
            url:`/api/v1/common/role_group/add`,
            method: "post",
            // params:{},
            data:{
              name:this.name,
              desc:this.desc,
              desc_en:this.desc_en,
              code:this.code,
              status: this.status_bar,
              hotel_id:this.hotel_id
              // url:this.api,

            },
            headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                this.masking=false
                console.log(this.name);
                this. part();

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })

        },
        //点击角色组自身的修改
        revise(node,data){
          this.masking=true;
          this.right_control=false;
          this.role=true;
          this.pub_hotel=true;
          this.hotel_pub=false;
          console.log(node, data);
          this.name=data.name;
           this.code=data.code;
           this.desc=data.desc;
            this.desc_en=data.desc_en;
           this.pub=data.hotel_id.short_name;
           this.role_set_id=data.id
          if (data.status==1){
            this.status="可用"
          }else if(data.status==0){
            this.status="禁用"
          };

        },

        //点击角色组自身修改后的保存
        preserve(){
          console.log('保存');
          if (this.status=="可用"){
            this.status=1
          }else if(this.status=="禁用"){
            this.status=0
          };

          console.log("保存");
          this.$axios({
            url:`/api/v1/common/role_group/update/${this.role_set_id}`,
            method: "post",
            // params:{},
            data:{
              name:this.name,
              code:this.code,
              desc:this.desc,
              desc_en:this.desc_en,
              status:this.status,
              // hotel_id:this.grogshop_id,
            },
            headers: {'authorization': this.authorization_token}
          })
            .then(res=>{

              if(res.data.message==="success"){
                //location.reload();  //强制刷新
                console.log(this.name);
                this.part();
                this.masking=false;

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })




        },


        //点击权限上添加保存
        keep(){
          if (this.status_bar=="可用"){
            this.status_bar=1
          }else if(this.status_bar=="禁用"){
            this.status_bar=0
          };

          console.log("保存");
          console.log(this.creator)
          this.$axios({
            url:`/api/v1/common/rule_group/add`,
            method: "post",
            // params:{},
            data:{
              name:this.permission_name,
              desc:this.chinese_name,
              desc_en:this.english_name,
              code:this.permission_code,
              status: this.status_bar,
              // url:this.api,

            },
            headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                 this.masking=false
                console.log(this.permission_name);
                this.permission();

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })

        },


        //点击蒙版的取消
        abolish(){
          this.masking=false
          this.name='',
            this.desc_en='',
            this.code='',
            this.root_id='',
            this.has_entry='',
            this.url='',
            this.creator='',
            this.create_time='',
            this.last_time='',
            this.parent_id=''

        },

        //动态获取authorization
        authorization() {
          let that=this;
          this.$axios.get('/api/v1/common/employee/create_token?user_id=1&user_name=super_root&hotel_id=2&hotel_group_id=3',
          )
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.authorization);
                that.authorization_token= that.authorization_token === ""? res.data.authorization: that.authorization_token;
                console.log(that.authorization_token);
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


        handleClick(tab, event) {
          // console.log(tab, event);
        },
        //权限组加号的添加
        append() {
          this.masking=true
          this.right_control=true;
          this.role=false;
          this.pub_hotel=false;//点击自身修改显示的 权限组的酒店
          this.hotel_pub=true;//  点击加号显示的 权限组的酒店
        },

        //权限组自身的修改
        amend(node, data){
          console.log(node,data)
          this.masking=true;
          this.right_control=true;
          this.role=false;
           this.pub_hotel=true,//点击自身修改显示的 权限组的酒店
           this.hotel_pub=false,//  点击加号显示的 权限组的酒店
          this.permission_name=node.data.name;//权限名称
          this.permission_code=node.data.code;//API
          this.status_bar=node.data.status;//状态
          if(node.data.status===0){
            this.status_bar="禁用"
          }else  if(node.data.status===1){
            this.status_bar="可用"
          }
          this.permission_name_id=node.data.id;//id
          this.chinese_name=node.data.desc;//中文备注
          this.english_name=node.data.desc_en;//英文备注
          this.pub= node.data.hotel_id
        },

        //权限组自身修改后的保存
        keep_pub(){
          if (this.status_bar=="可用"){
            this.status_bar=1
          }else if(this.status_bar=="禁用"){
            this.status_bar=0
          };

          console.log("保存");
          this.$axios({
            url:`/api/v1/common/rule_group/update/${this.permission_name_id}`,
            method: "post",
            // params:{},
            data:{
              name:this.permission_name,
              desc:this.chinese_name,
              desc_en:this.english_name,
              status: this.status_bar,
              code:this.permission_code,
              url:this.api,

            },
            headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                // location.reload();  //强制刷新
                this.permission();
               this.masking=false;

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })
        },

        //角色组自身--删除
        cancel (node, data){
          const parent = node.parent;
          const children = parent.data || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          console.log(node);
          let id = node.data.id
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
              url:`/api/v1/common/role_group/remove/${id}`,
              method: "post",
              // params:{},
              // data:{},
              headers: {'authorization': this.authorization_token}
            })
              .then(res=>{

                if(res.data.message==="success"){
                  console.log(res)
                  // location.reload(); // 强制刷新
                }

              })
              .catch(error=>{
                console.log(error);
              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',

            });
          });

        },

        //权限组自身---删除
        remove(node, data) {
          const parent = node.parent;
          const children = parent.data || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          console.log(node);
          let id = node.data.id
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
              url:`/api/v1/common/rule_group/remove/${id}`,
              method: "post",
              // params:{},
              // data:{},
              headers: {'authorization': this.authorization_token}
            })
              .then(res=>{

                if(res.data.message==="success"){
                  console.log(res)
                  // location.reload(); // 强制刷新
                  this.permission();
                }

              })
              .catch(error=>{
                console.log(error);
              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',

            });
          });


        },

      }
    }
</script>

<style  lang="less"  scoped>
  .permissions{
    width: 100%;
    height: 93%;
    overflow: hidden;
    overflow-y: scroll;
    //min-width: 1800px;
    position: relative;
    .tree{
      height: 100%;
      width: 360px;
      /*min-height: 1000px;*/
      /*background:rgba(247,247,247,1);*/
      float: left;
      .serialNumber{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        span{
          margin-left: 20px;
        }
      }
      .moduleTree{
        width:110%;
        height:40px;
        background:rgba(238,238,238,1);
        font-size:16px;
        font-family:Adobe Heiti Std R;
        font-weight:normal;
        color:black;
        line-height:40px;
        margin-left: -15px;
        padding-left: 98px;
      }
      .content{
        width: 100%;
        height:40%;
        /*background:rgba(247,247,247,1);*/
        overflow-y: scroll;
        .control{
          width: 100%;

          p{
            font-size: 26px ;
            background:rgba(247,247,247,1);
            padding-left: 84px;

          }
        }
      }


    }


    .router{
      width:calc(100% - 450px);
      height: 100%;
      font-size:20px;
      float: left;
      //min-width: 300px;
      /*min-height: 1000px;*/
      white-space:nowrap;
      background:rgba(247,247,247,1);
      .ini{
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;

      }
    }
    /*蒙版层*/
    .masking{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 13, 32, 0.3);
      z-index: 1000;
      .mask_information{
        width: 70%;
        height: 70%;
        background: white;
        margin: 7% auto;
        li{
          width: 45%;
          display: inline-block;
          margin-left: 30px;
          margin-top: 20px;
          float: left;
          span{
            width: 100px;
            display: inline-block;
            text-align: left;

          }
          button{
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background:rgba(68,136,233,1);
            color: white;
            border: none;
            border-radius:4px ;
            outline: none;
            margin-left: 20px;
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

  .el-checkbox{
    display: none;
  }

</style>
