<template>
  <div class="role">
    <div class="paging">
      <!--模块列表-->
      <el-table
        :data="itemList"
        :header-cell-style="{background:'#68819EFF',color:'white'}"
        stripe
        style="width: 80%;">
        <el-table-column
          prop="name"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="code"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="root_id"
          label="最近登陆时间">
        </el-table-column>
        <el-table-column
          prop="has_entry"
          label="是否停用">
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
      <el-pagination style="float: right;margin-right: 4%"
                     background
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
     <div class="user">
       <div class="left">
         <div class="message">
           <p>用户信息</p>
           <ul>
             <li> <span>用户姓名：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>简称：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>用户名：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>密码：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>中文描述：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>英文描述：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li >
               <span>审核状态：</span>
               <el-checkbox v-model="checked" style="display: inline-block ;margin-left: 10px">正常</el-checkbox>
               <el-checkbox v-model="checked" style="display: inline-block">停用</el-checkbox>
             </li>
             <li> <span>生日：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>部门：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>国籍：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li> <span>角色：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>

             <li> <span>语种：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>

             <li> <span>手机号码：</span><el-input v-model="input" placeholder="请输入内容"></el-input></li>
             <li>
               <span style="vertical-align: top">微信号 : </span>
               <div class="code">
                <p>二维码</p>
                 <ul class="establish">
                   <li><span>创建人 ： </span><span>admin</span></li>
                   <li><span>创建日期 ： </span><span>2019.2.14</span></li>
                   <li><span>修改日期 ： </span><span>2019.2.15</span></li>
                   <li><span>修改人 ： </span><span>admin</span></li>
                 </ul>
               </div>

             </li>

           </ul>
           <div class="btn"><button>保存</button> <button style="margin-left: 30px">重置</button></div>
         </div>
       </div>
       <div class="right">
         <div class="phone">照片</div>
         <div class="save">
           <button style="margin-right: 56px; ">保存</button>
           <button>新增</button>
           <button style="margin-right: 56px; margin-top: 10px;background:rgba(104,129,158,1);">取消</button>
           <button style="margin-top: 10px;background:rgba(104,129,158,1);">权限</button>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
  let id = 1000;
    export default {
        name: "role",
      data(){
        return{
          checked:false,//状态
          itemList: [
            {
              projectName: '工号',

            },
            // {
            //   projectName: '姓名',
            //
            // },
            // {
            //   projectName: '用户名',
            //
            // },
            // {
            //   projectName: '角色',
            //
            // },
            // {
            //   projectName: '最近登陆时间',
            //
            // },
            // {
            //   projectName: '是否停用',
            //
            // },
            // {
            //   projectName: '操作',
            //
            // }


          ],
          amend:true,
          save:false,
          pagesize:6, //代表每页显示的条数
          total:16,//代表总条数
          input:'',//输入内容

        }
      },
      methods:{
       // 点击修改
          alter(){
          this.amend=false,
            this.save=true
        },
        //点击取消
          cancel(){
          this.amend=true,
            this.save=false
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          this.curPage=curPage;

        },
      }


    }
</script>

<style lang="less" scoped>
 .role{
   width:100%;
   height:100%;
   margin-left: 32px;
   margin-top: 35px;
   .paging{
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
      height: 100%;
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
  .el-input{
    width: 300px;
  }
</style>
