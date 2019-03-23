<template>
    <!--设备类型-->
  <div class="ironsteward">
    <el-container>
      <!--左侧-->
      <el-aside  class="left"  style="width: 200px" >
        <div class="t-info">
          皇冠晶品酒店
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <!--右侧-->
      <el-main  class="right" >
        <el-card class="box-card">
          <el-table
            :data="tableData"
            size="mini"
            style="width: 100%"
            :header-cell-style="{background:'#68819E',color:'#FFF'}">
            <el-table-column
              label="设备类型ID">
              <template slot-scope="scope">
                <span>{{ scope.row.equipmenttypeID }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="父类型ID">
              <template slot-scope="scope">
                <span>{{ scope.row.ftypeID }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="设备类型中文描述">
              <template slot-scope="scope">
                <span>{{ scope.row.equichinadesc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="英文描述">
              <template slot-scope="scope">
                <span>{{ scope.row.equienlishdesc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否建表">
              <template slot-scope="scope">
                <span>{{ scope.row.ifbuildtable }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否RCU控">
              <template slot-scope="scope">
                <span>{{ scope.row.ifRCU }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="备注信息">
              <template slot-scope="scope">
                <span>{{ scope.row.remarkinfo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a v-if="!scope.row.isEgdit" style="cursor: pointer"
                   size="mini"
                   @click="handleEdit(scope.$index, scope.row)">编辑</a>
                <a v-if="scope.row.isEgdit" style="cursor: pointer"
                   size="mini"
                   @click="handleSuccessEdit(scope.$index, scope.row)">保存</a>
                <a
                  size="mini" style="cursor: pointer"
                  @click="handleDelete(scope.$index)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "equipmenttype",
        data(){
          return {
            tableData: [{
              equipmenttypeID: '8301',
              ftypeID: 'RCU',
              equichinadesc: '房态',
              equienlishdesc : 'rcu',
              ifbuildtable : 'rcu',
              ifRCU :'rcu',
              remarkinfo : 'mr wang',
            }], data: [{
              label: '客房设备',
              children: [{
                label: '门锁',
              },{
                label: '猫眼',
                },{
                label: 'RCU'
              }]
            }, {
              label: '中央设备',
              children: [{
                label: '中央空调',
              }, {
                label: '热水系统',
              }, {
                label: '消防系统',
              }, {
                label: '监控系统'
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            }
        };
      },
      methods:{
        //编辑
        handleEdit(index, row) {
          this.$set(row,'isEgdit',true)
        },
        //删除
        handleDelete(index) {
          this.tableData.splice(index,1)
        },
        //编辑成功
        handleSuccessEdit(index, row) {
          this.$set(row,'isEgdit',false)
        },
        //展开树
        handleNodeClick(data) {
          console.log(data);
        }
      }
    }
</script>

<style lang="less" scoped>
  //左侧导航栏样式
.left{
  .t-info{
    margin-top: 10px;
    margin-left: 1%;
    height: 30px;
    width: 100%;
    background: #EEEEEE;
  }
}
</style>
