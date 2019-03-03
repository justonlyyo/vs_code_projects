<template>
  <div class="list">

    <p>版本列表</p>
    <div class="state">
      <el-checkbox v-model="checked" style="display: inline-block;margin-left: 40%">包含下属模块</el-checkbox>
      <span style=" margin-right: 48px;font-size: 14px;color: #606266">状态</span>
      <el-checkbox v-model="checked" style="display: inline-block">正常</el-checkbox>
      <el-checkbox v-model="checked" style="display: inline-block">停用</el-checkbox>
    </div>
    <!--模块列表-->
    <el-table
      :data="itemList"
      :header-cell-style="{background:'#68819EFF',color:'white'}"
      stripe
      style="width: 94%;margin-left: 24px">
      <el-table-column
        prop="name"
        label="模块名称">
      </el-table-column>
      <el-table-column
        prop="desc_en"
        label="英文描述">
      </el-table-column>
      <el-table-column
        prop="code"
        label="模块代码">
      </el-table-column>
      <el-table-column
        prop="root_id"
        label="模块种类">
      </el-table-column>
      <el-table-column
        prop="has_entry"
        label="模块类型">
      </el-table-column>
      <el-table-column
        prop="url"
        label="链接">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop=" versions"
        label="版本号">
      </el-table-column>
      <el-table-column
        prop="last_time"
        label="修改时间">
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
</template>

<script>
  let id = 1000;
    export default {
        name: "version-list",
      data(){
        return{
          checked:false,//状态
          itemList: [
            {
              projectName: '模块名称',

            },
            // {
            //   projectName: '英文描述',
            //
            // },
            // {
            //   projectName: '模块代码',
            //
            // },
            // {
            //   projectName: '模块种类',
            //
            // },
            // {
            //   projectName: '模块类型',
            //
            // },
            // {
            //   projectName: '链接',
            //
            // },
            // {
            //   projectName: '模块类型',
            //
            // },
            // {
            //   projectName: '创建人',
            //
            // },
            // {
            //   projectName: '创建时间',
            //
            // },
            // {
            //   projectName: '版本号',
            //
            // },
            // {
            //   projectName: '修改时间',
            //
            // }
            // ,
            // {
            //   projectName: '操作',
            //
            // }


          ],
          amend:true,
          save:false,
          pagesize:6, //代表每页显示的条数
          total:16,//代表总条数
        }
      },
      methods:{
        //点击修改
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

<style   lang="less" scoped>
  .list{
    width: 100%;
    height: 100%;
    /*min-width: 860px;*/
    background:rgba(238,238,238,1);
    p{
      display: inline-block;
      width:142px;
      height:35px;
      font-size:36px;
      font-family:Adobe Heiti Std R;
      font-weight:normal;
      color:rgba(51,51,51,1);
      line-height:24px;
      margin: 42px  0px 38px 22px;
    }
    .state{
      /*float: right;*/
      display: inline-block;
      font-size:18px;
      margin-top: 42px;
      width: calc(100% - 300px);
      min-width: 900px;
    }

    .amend ,.save{
      width: calc(100% - 70px);
      height: 44px;
      margin-left: 24px;
      line-height: 44px;
      background:rgba(247,247,247,1);
      margin-bottom: 7px;
      position: relative;
      min-width: 1200px;
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
</style>

