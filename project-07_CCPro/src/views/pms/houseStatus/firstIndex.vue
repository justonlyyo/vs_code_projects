<template>
  <div class="firstIndex">
    <el-container>
      <!--左侧-->
      <el-aside  class="left"  style="width: 300px" >
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="房态筛选" name="first">房态筛选</el-tab-pane>
          <el-tab-pane label="批量操作" name="second">批量操作</el-tab-pane>
        </el-tabs>
      </el-aside>
      <!--右侧-->
      <el-main  class="right" >Main</el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'firstIndex',
    data(){
      return {
        activeName2: 'first'
      }
    },
    mounted (){
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style lang="less">
  .firstIndex{
    width: 100%;
    .left{
      background:rgba(234,237,241,1);
      #tab-first,#tab-second{
        width: 151px;
        line-height: 32px;



      }
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      border-top: none;
      border-top: 2px   solid   red;


    }
  }

</style>
