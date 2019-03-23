<template>
  <div class="accounting">
    <div class="navigation">
        <div>
          <p style="padding: 10px;">酒店名称</p>
          <el-select v-model="value" placeholder="请选择"   style="width: 229px;margin: 10px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
          <p style="padding: 10px 0 10px 10px; background: #68819EFF;color: white">全部</p>
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <!-- <i class="el-icon-caret-bottom"></i> -->
                <span>客房部</span>
              </template>
              <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
                <el-menu-item index="1-1"><router-link to="/accounting/curtain">抵扣券</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link to="/treasure/current-rate-coupon">变价券</router-link></el-menu-item>
                <el-menu-item index="1-3"><router-link to="/treasure/cash-coupon">现金券</router-link></el-menu-item>
                <el-menu-item index="1-4"><router-link to="/treasure/discount-coupon">折扣券</router-link></el-menu-item>
                <el-menu-item index="1-5"><router-link to="/treasure/serve-coupon">服务券</router-link></el-menu-item>
                <el-menu-item index="1-6"><router-link to="/treasure/room-upgrade-coupon">客房升级券</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>客房部</span>
              </template>
              <el-menu-item-group>
                <!--<el-menu-item index="2-1"><router-link to="/treasure/list-coupon">券列表</router-link></el-menu-item>
                <el-menu-item index="2-2"><router-link to="/treasure/issue-detials-coupon">券发行明细</router-link></el-menu-item>-->
                <el-menu-item index="2-3"><router-link to="/treasure/sale-detials-coupon">券销售明细</router-link></el-menu-item>
                <!--<el-menu-item index="2-4"><router-link to="/treasure/use-coupon">券使用</router-link></el-menu-item>-->
                <el-menu-item index="2-5"><router-link to="/treasure/use-detials-coupon">券使用明细</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
    </div>


    <div class="router">
      <div class="ini"><logon-view></logon-view></div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
    export default {
        name: "accounting",
      data() {
        return {
          activeIndex: '1',
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
        }
      },

      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
      }
    }
</script>

<style lang="less" scoped>
  .accounting{
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation{
      float: left;
      width:249px;
      height: 100%;
      background: white;
      overflow-y: scroll;

    }
    .router{
      width:calc(100% - 249px) ;
      height:100% ;
      float: left;
      .ini{
        height: calc(100% - 30px);
        position: absolute;
        right: 0;
        top: 30px;
        z-index: 10;
      }
    }
  }
</style>
