<template>
  <div class="advanced">
    <div class="navigation">
      <div>
        <p style="padding: 15px;background: #68819EFF;color: white">代码设置</p>
      </div>
      <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>帐设置</span>
            </template>
            <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
              <el-menu-item index="1-1"><router-link to="/advanced/entry-value">入账代码</router-link></el-menu-item>
              <el-menu-item index="1-2"><router-link to="/treasure/current-rate-coupon">查账原因</router-link></el-menu-item>
              <el-menu-item index="1-3"><router-link to="/treasure/cash-coupon">冲调帐原因</router-link></el-menu-item>
              <el-menu-item index="1-4"><router-link to="/treasure/discount-coupon">撤销原因（冲调帐.转账.平帐）</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>付款方式设置</span>
            </template>
            <el-menu-item-group>
              <!--<el-menu-item index="2-1"><router-link to="/treasure/list-coupon">券列表</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link to="/treasure/issue-detials-coupon">券发行明细</router-link></el-menu-item>-->
              <el-menu-item index="2-3"><router-link to="/treasure/sale-detials-coupon">券销售明细</router-link></el-menu-item>
              <!--<el-menu-item index="2-4"><router-link to="/treasure/use-coupon">券使用</router-link></el-menu-item>-->
              <el-menu-item index="2-5"><router-link to="/treasure/use-detials-coupon">券使用明细</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
          <template slot="title">
            <span>收付款原因（业务类型）设置</span>
          </template>
          <el-menu-item-group>
            <!--<el-menu-item index="2-1"><router-link to="/treasure/list-coupon">券列表</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/treasure/issue-detials-coupon">券发行明细</router-link></el-menu-item>-->
            <el-menu-item index="2-3"><router-link to="/treasure/sale-detials-coupon">券销售明细</router-link></el-menu-item>
            <!--<el-menu-item index="2-4"><router-link to="/treasure/use-coupon">券使用</router-link></el-menu-item>-->
            <el-menu-item index="2-5"><router-link to="/treasure/use-detials-coupon">券使用明细</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span>票据种类设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-3"><router-link to="/advanced/commercial-bill">票据种类设置</router-link></el-menu-item>
              <!--<el-menu-item index="2-4"><router-link to="/treasure/use-coupon">券使用</router-link></el-menu-item>-->
              <el-menu-item index="2-5"><router-link to="/treasure/use-detials-coupon">券使用明细</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
          <template slot="title">
            <span>AR账号一览表</span>
          </template>
          <el-menu-item-group>
            <!--<el-menu-item index="2-1"><router-link to="/treasure/list-coupon">券列表</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/treasure/issue-detials-coupon">券发行明细</router-link></el-menu-item>-->
            <el-menu-item index="2-3"><router-link to="/treasure/sale-detials-coupon">券销售明细</router-link></el-menu-item>
            <!--<el-menu-item index="2-4"><router-link to="/treasure/use-coupon">券使用</router-link></el-menu-item>-->
            <el-menu-item index="2-5"><router-link to="/treasure/use-detials-coupon">券使用明细</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <span>收银点设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-3"><router-link to="/advanced/cashiers">收银点操作记录</router-link></el-menu-item>
              <el-menu-item index="2-5"><router-link to="/advanced/checkstand">收银点设置</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <span>其他基础设置</span>
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
        name: "advanced",
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
  .advanced{
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
