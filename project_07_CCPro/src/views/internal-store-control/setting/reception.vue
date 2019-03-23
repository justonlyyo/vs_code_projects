<template>
  <div class="reception">
    <div class="title">
      <i class="el-icon-setting" style="font-size: 40px ;line-height: 70px;color:#777777FF"></i>
      <span style="color:#777777FF">基础信息设置</span>
    </div>
    <div class="label">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" >
        <el-tab-pane label="保密级别" name="first">
          <div class=" search">
            <span>楼号</span>
            <input type="text" v-model="input" placeholder="请输入内容" >
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none;border-radius: 4px;
          border: none;line-height: 24px;margin-bottom: 24px">新增</button>
          <!--证件类型-->
          <el-table
            :data="tableData"
            :header-cell-style="{background:'#68819EFF',color:'white'}"
            stripe
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="180">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="修改者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="修改时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <span>删除</span> |
              <span>修改</span>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         background
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
    export default {
        name: "reception",
      data() {
        return {
          activeName2: 'first',
          input: '',
          amend:true,
          save:true,
          itemList: [
            {
              projectName: '代码',

            },
            {
              projectName: '中文描述',

            },
            {
              projectName: '英文描述',

            },
            {
              projectName: '是否停用',

            },
            {
              projectName: '创建者',

            },
            {
              projectName: '创建时间',

            },
            {
              projectName: '修改者',

            },
            {
              projectName: '修改时间',

            },
            {
              projectName: '操作',

            }


          ],
          total:20,//总条数
          tableData: [],
          pagesize:10,
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
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
  .reception{
    width: 100%;
    margin-left: 20px;
    .title{
      width:100%;
      height: 70px;
      span{
        display: inline-block;
        height: 66px;
        line-height: 70px;
        vertical-align: top;
        margin-left: 10px;
      }
    }
    .label{
      margin-top: 18px;
      .contentTitle{
        width: 100% ;
        height: 40px;
        min-width: 1000px;
        background: #68819EFF;
        margin-top: 16px;
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
        background:rgba(247,247,247,1);
        margin-bottom: 7px;
        overflow: hidden;
        min-width: 1000px;
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
      .search{
        width: 100%;
        height: 50px;
        background:rgba(247,247,247,1);
        span{
          margin: 0  16px;
        }
        input{
          width: 200px;
          height: 40px;
          margin: 5px 0;
          padding-left: 5px;
        }
        button{
          width: 80px;
          height: 40px;
          border-radius: 4px;
          border: none;
          background:#4488E9FF ;
          outline: none;
          color: white;
          margin-left: 20px;
        }
      }
    }

  }
</style>

