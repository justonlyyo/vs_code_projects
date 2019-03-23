<template>
  <div class="sections">
    <p style="margin-top: 15px;margin-left: 32px;font-size: 16px;font-weight: bold">部门信息</p>
    <div class="title">
      <div class="titleSearch">
        <span >部门名称:</span>
        <el-input v-model="input" placeholder="请输入内容" style="width: 217px"></el-input>
      </div>
      <!--<div class="titleSearch">-->
        <!--<span style="margin-left: 76px">上级部门:</span>-->
        <!--<el-select v-model="value" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <!--状态-->
      <div class="state">
        <span>状态：</span>
        <el-radio v-model="normal" label="1">正常</el-radio>
        <el-radio v-model="normal" label="0">停用</el-radio>
        <button @click="find">查找</button>
      </div>
      <!--模块列表-->
      <el-table
        :data="section"
        fit
        :header-cell-style="{background:'#68819EFF',color:'white',}"
        style="width: 95%;margin-top: 26px">
        <el-table-column
          prop="name"
          label="部门名称">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="中文描述">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="英文描述">
        </el-table-column>
        <el-table-column
          prop="parent_id.name"
          label="上级部门">
        </el-table-column>
        <el-table-column
          prop="hotel_id.short_name"
          label="所属酒店">
        </el-table-column>
        <el-table-column
          prop="creator.real_name"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="create_time"
          width="150"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="last_user.real_name"
          width="90"
          label="修改人">
        </el-table-column>
        <el-table-column
          prop="last_time"
          width="150"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row.id,scope.$index, section)"type="text" size="small;">删除</el-button>
            <el-button type="text" size="small" @click="submit(scope.row,scope.row.id,scope.$index, section)">修改</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;margin-right: 4%"
                     background
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>

    <div class="department" v-show="department">
      <div class="message">
        <p>部门信息</p>
        <ul>
          <li>
            <span>所属酒店</span><el-select v-model="department_hotel " placeholder="请选择酒店"   style="width: 217px" :disabled="true" clearable ></el-select>
          </li>
          <li> <span>部门名称：</span><el-input v-model="department_name " placeholder="请输入内容" style="width: 217px"></el-input></li>
          <li> <span>上级部门：</span><el-input v-model="superior_department " placeholder="请输入内容" style="width: 217px" :disabled="true"></el-input></li>

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
  import eventVue from './eventVue'
    export default {
        // name: "sections",
      data(){
        return{
          api:'http://47.98.113.173:9519',
          amend:true,
          save:true,
          input:'',
          checked:false,
          pagesize:10, //代表每页显示的条数
          total:0,//总条数
          section:[],//获取后台传递的部门数据
          authorization_token:'',//token值
          normal:"1",
          department_hotel:'',//选择的酒店
          department:false,//部门修改的显示隐藏
          id:'',//修改部门所需的id
          superior_department_id:'',//上级部门的id
          //  部门信息
          hotelid:'',//所点击的酒店id
          // hotel_id_name:'',//所属酒店
          department_name:'',//部门名称
          superior_department:'',//上级部门
          radio:"1",//审核状态
          chinese_name:'',//中文备注
          english_name:'',//英文备注
          name:'',
        }
        },
      created:function () {
        let that=this;
        this.sections();

      },
      methods:{
        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            "url": ""+that.api+"/v1/common/dept/info_list",
            "method": "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.section=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
        //点击查找
        find(){
          let that=this;
          if(that.normal=="1"){
            that.normal=1;
          }else if (that.normal=="0"){
            that.normal=0
          }
          that.$axios({
            "url": ""+that.api+"/v1/common/dept/info_list",
            "method": "get",
            params:{
              audit:that.normal,
              name:that.input,
            },
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.section=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //查看部门信息
        examine(){
          console.log(this.bit.id);
          this.$axios({
            url: ""+this.api+"/v1/common/dept/info_list",
            method: "post",
            data:{
              hotel_id:this.hotelid,
            },
            //headers: {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                this.section=res.data.data;
                if(this.section==res.data.data){
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
       //封装酒店id转换酒店名字或者酒店名字转换id
        hotel_id_name(){
          //在这里封装函数；
        },

        //点击修改部门
        submit(srow,id,index){
           this.department=true;
            console.log(srow);
            this.id=srow.id;
             this.hotelid=srow.hotel_id.id;//所点击的酒店id
              this.department_hotel=srow.hotel_id.short_name;//所属酒店
              this.department_name=srow.name;  //部门名称

              if(srow.parent_id){
                this.superior_department=srow.parent_id.name;//上级部门
                this.superior_department_id=srow.parent_id.id;
              }else {
                this.superior_department='';//上级部门
                this.superior_department_id='';
              }
            if(srow.audit==1){
                this. radio="1"//审核状态
              }else if(srow.audit==0){
                this. radio="0"//审核状态
              }
             this.chinese_name=srow.desc;//中文备注
             this.english_name=srow.desc_en;//英文备注

        },

        //点击修改部门后的保存
        hotel_save(){
          let that=this;
          if(that.radio=="1"){
            that. radio=1//审核状态
          }else if(that.radio=="0"){
            that. radio=0//审核状态
          }


          that.$axios({
            "url": ""+that.api+"/v1/common/dept/update/"+that.id,
            "method": "post",
            data:{
              name:that.department_name,
              desc:that.chinese_name,
              desc_en:that.english_name,
              parent_id:that.superior_department_id,
              hotel_id:that.hotelid,
              audit:that.radio+'',
            },

          })
            .then(res => {
              if (res.data.message=="success"){
                that.department=false;
                console.log(res);
                that.sections();
                that.examine();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },



        //点击删除部门
        remove(id,index,lists){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            lists.splice(index, 1);
            this.$axios({
              url:""+this.api+"/v1/common/dept/remove/"+id,
              method: "post",
              //headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                console.log(res.message)
                if(res.data.message==="success")
                  this.sections();
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

        //点击取消
        cancel(){
           this.department=false;
        },



        //接受兄弟组件传过来的值
        sections(){
          eventVue.$on("myFun",(section_list)=>{   //这里最好用箭头函数，不然this指向有问题
            this.section = section_list.list;
            this.total=section_list.total_count;
            console.log(this.total);
          })
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

<style  lang="less" scoped>
  input{
    outline: none;
  }
  .sections{
    width: 100%;
    .title{
      /*width: calc(100% - 120px);*/
      /*width: 100%;*/
      height: 40px;
      margin-top: 15px;
      font-size: 16px;
      margin-left: 30px;

      .titleSearch{
        position: relative;
        display: inline-block;
        .btn{
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 30px;
          background: #EEEEEEFF;
          display: inline-block;
        }
        .search{
          width: 300px;
          height: 30px;
          padding-left: 15px;
        }
      }


      .state{
        display: inline-block;
        margin-left: 56px;
        button{
          margin-left: 30px;
          outline: none;
          width: 90px;
          height: 40px;
          background:rgba(68,136,233,1);
          border-radius:4px;
          color: white;
          border: none;
        }
      }
      .contentTitle{
        /*width: calc(100% - 130px);*/
        height: 40px;
        background: #68819EFF;
        margin-top: 40px;
        /*margin: 0 104px  0  24px;*/
        line-height: 40px;
        display: flex;
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
        /*width: calc(100% - 128px);*/
        height: 44px;
        line-height: 44px;
        background:	#EDEDED;
        margin-bottom: 7px;
        overflow: hidden;
        min-width: 926px;
        position: relative;
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
<style>
  /*.el-select{*/
    /*width: 300px;*/
    /*height: 40px;*/
  /*}*/
  /*.el-input{*/
    /*width: 300px;*/
  /*}*/
  .el-table .cell{
    text-align:center;
  }
</style>
