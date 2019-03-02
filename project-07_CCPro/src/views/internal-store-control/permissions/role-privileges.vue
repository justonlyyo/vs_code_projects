<template>
  <div class="role-privileges">
    <div class="paging-title">
      <span>角色 ： </span>
      <div>
        <button style="background:rgba(104,129,158,1)">新增权限</button>
        <button>新增角色</button>
        <button>保存</button>
        <button style="background:rgba(104,129,158,1)">取消</button>
      </div>
    </div>
    <div class="paging">
      <!--列表-->
      <el-table
        :data="newlists"
        :header-cell-style="{background:'#68819EFF',color:'white',width:'100%'}"
        style="height: 288px"
        stripe>
        <el-table-column
          prop="name"
          label="角色名">
        </el-table-column>
        <el-table-column
          prop="role_group.name"
          label="角色组">
        </el-table-column>
        <el-table-column
          prop="code"
          label="代码">
        </el-table-column>
        <el-table-column
          prop="status "
          label="状态">
          <!--传过来的值改变格式-->
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">禁用</span>
            <span v-else>可用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="中文备注">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="英文备注">
        </el-table-column>
        <el-table-column
          prop="hotel_id.short_name"
          label="酒店">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="cancel(scope.row.id,scope.$index, newlists)"type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;"
                     background
                     layout="prev, pager, next"
                     :page-size="pagesizes"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
    <p style="height: 47px;line-height: 47px" > 权限 ：</p>
    <div class="paging">
      <!--列表-->
      <el-table
        :data="rulelists"
        :header-cell-style="{background:'#68819EFF',color:'white'}"
        style="height: 330px"
        stripe>
        <el-table-column
          prop="name"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="url"
          width="270"
          label="API">
        </el-table-column>
        <el-table-column
          prop="status "
          label="状态">
          <!--传过来的值改变格式-->
          <template slot-scope="scope">
            <span v-if="scope.row.root_id === 0">禁用</span>
            <span v-else>可用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc "
          width="190"
          label="中文备注">
        </el-table-column>
        <el-table-column
          prop="pages "
          label="关联页面">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="cance(scope.row.id,scope.$index, newlists)"type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="revision(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;"
                     background
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="permissionPage"
                     :total="power_total">
      </el-pagination>
    </div>

    <!--点击加号出现编辑的页面-->
    <div class="masking" v-show="masking">
      <!--点击角色上的修改弹出的蒙版-->
      <ul class="mask_information" v-show="role">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li><span >角色名</span><el-input v-model="part_name" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li>
          <span >角色组</span>
          <!--<el-input v-model="name" placeholder="请输入内容" style="width: 300px;"></el-input>-->
          <el-select v-model="role_group" placeholder="请选择">
            <el-option
              v-for="item in role_set"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li><span >代码</span><el-input v-model="code" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li><span >状态</span><el-input v-model="status" placeholder="请输入内容" :disabled="true"  style="width: 300px;"></el-input></li>
        <li><span >中文备注</span><el-input v-model="desc"  style="width: 300px;"  placeholder="请输入内容" ></el-input></li>
        <li><span >英文备注</span><el-input v-model="desc_en" placeholder="请输入内容"  style="width: 300px;"></el-input></li>
        <li><span >酒店</span><el-input v-model="hotel_id"   style="width: 300px;"  :disabled="true"  placeholder="请输入内容"></el-input></li>
       <li style="width: 300px;height: 40px" ></li>
        <li style="margin-top:50px;"><button @click="preserve">保存</button> <button @click="abolish">取消</button></li>
      </ul>
      <!--点击权限上的修改弹出的蒙版-->
      <ul class="mask_information" v-show="right_control">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li><span >权限名称</span><el-input v-model="permission_name" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li><span >API</span><el-input v-model="api" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li>
          <span >状态</span><el-select v-model="status_bar" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li><span >中文备注</span><el-input v-model="chinese_name" placeholder="请输入内容"  style="width: 300px;"></el-input></li>
        <li><span >英文备注</span><el-input v-model="english_name"   style="width: 300px;"    placeholder="请输入内容"></el-input></li>
        <li><span >关联页面</span><el-input v-model=" associated"   style="width: 300px;"  :disabled="true"    placeholder="请输入内容"></el-input></li>
        <li style="margin-top:50px;"><button @click="keep">保存</button> <button @click="abolish">取消</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  let id = 1000;
    export default {
        name: "role-privileges",
      data(){
        return{
          options: [{
            value: '0',
            name: '禁用'
          }, {
            value: '1',
            name: '可用'
          }],
          value: '',
          pagesizes:4,//代表角色每页的条数
          pagesize:5, //代表每页显示的条数
          total:0,//代表总条数
          power_total:0,//代表全部权限总条数

          id:'',//修改此项的id 传给后台
          authorization_token:'',//获取token值
          newlists:[],//角色组
          rulelists:[],//权限组
          masking:false,//蒙版层
          // 蒙版里的角色信息
          part_name:'',////角色名
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
          creator:'',//创建人
          create_time:'',//创建时间
          last_time:'',//修改时间
          parent_id:'',//父级模块
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
          permission_name_id:''//权限修改传给后台的id
        }
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
          //获取角色信息列表
         that.part();
          //获取权限列表
          that.power();


        },800)

      },
      methods:{
        //封装获取角色信息列表
        part(){
          let that=this;
          that.$axios({
            "url": "/api/v1/common/role/info_list",
            "method": "get",
            "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list;
                that.total=res.data.data.total_count;
                // console.log(that.newlists);
                // that.short_name=res.data.data.list.hotel_id.short_name;
                // that.full_name=res.data.data.list.hotel_id.short_name;
                // console.log(that.full_name);
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获取权限列表
        power(){
          let that=this;
         that.$axios({
           "url": "/api/v1/common/rule/info_list",
           "method": "get",
           "headers": {"authorization": that.authorization_token}
         })
           .then(res => {
             if (res.data.message=="success"){
               console.log(res.data.data);
               // var resp = res.data.data;
               // var new_lists = resp['list'];
               // var total_count= resp['total_count'];
               that.rulelists=res.data.data.list;
               that.power_total=res.data.data.total_count;
               console.log(that.rulelists)
             }
             else{
               // console.log(resp.data.message);
             }
           })
           .catch(error => {
             console.log(error);
           });
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


        /*
        * 点击角色
        * */
        //点击角色分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            "url": "/api/v1/common/role/info_list",
            "method": "get",
            params:{
              page_num:curPage,
              pagesize:that.pagesize
            },
            "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //点击角色上的修改弹出蒙版层
        submit(srow,id,index,list){
          this.masking=true;
          this.role=true;
          this.right_control=false;
          this.id=id;
          console.log(srow);
          this.part_name=srow.name;
          this.role_group=srow.role_group.name
          this.code=srow.code;//代码
          //状态
          if(srow.status===0){
            this.status="禁用"
          }else if (srow.status===1){
            this.status="可用"
          }
          this.desc=srow.desc;//中文备注
          this.desc_en=srow.desc_en;//英文备注
          this.hotel_id=srow.hotel_id.short_name;//酒店
          this.grogshop_id=srow.hotel_id.id;//传给后台的酒店id
          this.roles_id=srow.role_group.id;//传给后台的所选择的角色组id
          this.$axios({
            "url": "/api/v1/common/role_group/info_list",
            "method": "post",
            data:{
             hotel_id:srow.hotel_id.id,
            },
            "headers": {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                this.role_set=res.data.data.list

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });






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
              url:`/api/v1/common/role/remove/${id}`,
              method: "post",
              // params:{},
              // data:{},
              headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  this.part();
                  this.masking=false;
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
        //点击角色蒙版的保存
        preserve(){
          console.log('保存');
          if (this.status=="可用"){
            this.status=1
          }else if(this.status=="禁用"){
            this.status=0
          };

          console.log("保存");
          console.log(this.creator)
          this.$axios({
            url:`/api/v1/common/role/update/${this.id}`,
            method: "post",
            // params:{},
            data:{
              name:this.name,
              code:this.code,
              desc:this.desc,
              desc_en:this.desc_en,
              status:this.status,
              hotel_id:this.grogshop_id,
              role_group:this.roles_id,
            },
            headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                // location.reload();  //强制刷新
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

         /*
         * 点击权限
         * */
        //点击权限上的修改弹出蒙版层
        revision(srow,id,index,list){
          this.masking=true;
          this.right_control=true;
          this.role=false
          console.log(srow);
           this.permission_name=srow.name;//权限名称
            this.api=srow.url;//API
            this.status_bar=srow.status;//状态
              if(srow.status===0){
                this.status_bar="禁用"
              }else  if(srow.status===1){
                this.status_bar="可用"
              }

            this.permission_name_id=srow.id;//id
            this.chinese_name=srow.desc;//中文备注
            this.english_name=srow.desc_en;//英文备注
            // this.associated=;//关联页面

        },

        //点击权限上的删除
        cance(id,index,list){
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
              url:`/api/v1/common/rule/remove/${id}`,
              method: "post",
              // params:{},
              // data:{},
              headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  this.power();
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

        //点击权限上的修改后的保存
        keep(){
          if (this.status_bar=="可用"){
            this.status_bar=1
          }else if(this.status_bar=="禁用"){
            this.status_bar=0
          };

          console.log("保存");
          console.log(this.creator)
          this.$axios({
            url:`/api/v1/common/rule/update/${this.permission_name_id}`,
            method: "post",
            // params:{},
            data:{
              name:this.permission_name,
              desc:this.chinese_name,
              desc_en:this.english_name,
              status: this.status_bar,
              url:this.api,

            },
            headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                // location.reload();  //强制刷新
                this.power();
                this.masking=false;
                console.log(this.permission_name);

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })

        },


        //权限分页
        permissionPage(page){
          let that=this
          console.log(page) // 当前页}
          //获取信息列表
          that.$axios({
            "url": "/api/v1/common/rule/info_list",
            "method": "get",
            params:{
              page_num:page,
              page_size:that.pagesize
            },
            "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.rulelists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

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
      }
    }
</script>

<style lang="less" scoped>
  .role-privileges{
   // width:calc(100% - 100px);
    height:100%;
    margin-left: 32px;
    .paging-title{
      width: 100%;
      height: 71px;
      line-height: 71px;
       div{
         display: inline-block;
         float: right;
         button{
           width:90px;
           height:40px;
           border: none;
           outline: none;
           margin-right: 28px;
           background:rgba(68,136,233,1);
           border-radius:4px;
           color: white;
         }
       }
    }
    .paging{
      width: 100%;
      overflow: hidden;
      background:rgba(255,255,255,1);
      .title{
        width: 100%;
        height: 40px;
        background: #68819EFF;
        /*margin: 0 104px  0  24px;*/
        margin-right: 104px;
        line-height: 40px;
        display: flex;
        /*min-width: 1140px;*/
        li{
          /*width: 100% ;*/
          font-size:14px;
          font-family:Adobe Heiti Std R;
          font-weight:normal;
          color:rgba(255,255,255,1);
          flex-grow: 1;
          margin-left: 20px; ;
        }
      }
      .amend ,.save{
        width: 100%;
        height: 44px;
        line-height: 44px;
        /*background:rgba(247,247,247,1);*/
        border-bottom: 1px solid #EDEDED;
        margin-bottom: 7px;
        position: relative;
        /*min-width: 1200px;*/
        input{
          width:101.7px;
          background:rgba(247,247,247,1);
          /*border: none;*/
          outline:none;
          text-align: center;
        }
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
<style>
  .el-pagination{
    float: right;
  }
  .el-table .cell{
    text-align:center;
  }
  .el-input {
    width: 300px;
  }
</style>
