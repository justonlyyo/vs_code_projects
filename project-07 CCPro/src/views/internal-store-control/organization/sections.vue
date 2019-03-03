<template>
  <div class="sections">
    <p style="margin-top: 15px;margin-left: 76px;font-size: 16px">部门信息</p>
    <div class="title">
      <div class="titleSearch">
        <span >部门全程:</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="titleSearch">
        <span style="margin-left: 76px">上级部门:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!--状态-->
      <div class="state">
        <span style="margin-right: 64px">状态:</span>
        <el-checkbox v-model="checked" style="display: inline-block">正常</el-checkbox>
        <el-checkbox v-model="checked" style="display: inline-block">已停用</el-checkbox>
      </div>
      <!--模块列表-->
      <el-table
        :data="itemList"
        fit
        :header-cell-style="{background:'#68819EFF',color:'white',}"
        style="width: 100%;margin-top: 26px">
        <el-table-column
          prop="name"
          label="职务名称">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="职务级别">
        </el-table-column>
        <el-table-column
          prop="code"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="root_id.name"
          label="模块种类">
        </el-table-column>
        <el-table-column
          prop="has_entry"
          width="90"
          label="模块类型">
          <!--父级传过来的值改变格式-->
          <template slot-scope="scope">
            <span v-if="scope.row.has_entry === 0">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="链接">
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
          prop="version"
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
            <el-button @click="cancel(scope.row.id,scope.$index, newlists)" type="text" size="small;">删除</el-button>
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
  </div>
</template>

<script>
    export default {
        name: "sections",
      data(){
        return{
          itemList: [
            {
              projectName: '职务名称',

            },

          ],
          amend:true,
          save:true,
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          input:'',
          checked:false,
          pagesize:10, //代表每页显示的条数
          total:20,//总条数
        }
        },
      methods:{
          //分页
        handleCurrentChange(curPage){
          console.log(curPage);
        }
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
      margin-left: 50px;

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
        margin-left: 86px;
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
  }
</style>
<style>
  .el-select{
    width: 300px;
    height: 40px;
  }
  .el-input{
    width: 300px;
  }
  .el-table .cell{
    text-align:center;
  }
</style>
