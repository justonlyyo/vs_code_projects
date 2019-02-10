<template>
  <div class="loginView">
    <!--头部显示部分-->
    <div class="nav_title">
      <div class="logo">
        <p class="logo_text">颐陆智助酒店管理系统</p>
      </div>
      <p class="logo_en">iSpiderTech. Hotel MIS</p>
    </div>
    <!-- form提交表单部分 -->
    <el-form ref="AccountForm" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">欢迎登录</h3>
      <!-- 默认登录门店 -->
      <el-form-item>
        <el-select v-model="HotelValue" placeholder="默认登录门店">
          <el-option
            v-for="item in HotelArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 用户姓名 -->
      <el-form-item prop="username">
        <el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入账号/用户名/手机号"></el-input>
      </el-form-item>
      <!-- 登录密码 -->
      <el-form-item prop="pwd">
        <el-input type="password" v-model="account.pwd" :autofocus="pwdFocus" auto-complete="off"
                  placeholder="请输入账号密码"></el-input>
      </el-form-item>
      <!-- 选择早中晚班 -->
      <el-form-item>
        <el-select v-model="scheduleValue" placeholder="早班">
          <el-option
            v-for="item in schedule"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 登录btn -->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :disabled="allowLogin">登录
        </el-button>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <!-- <el-form-item class="extra-text">
        <a href="javascript:;" class="forget-pwd" title="找回密码">忘记密码?</a>
        <router-link :to="{path: '/register'}" class="reg-text" title="立即注册">立即注册</router-link>
      </el-form-item> -->
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <!-- 微信扫码登录 -->
      <el-form-item class="extra-text">
        <a href="javascript:;" class="forget-pwd" title="微信扫码登录">微信扫码登录</a>
      </el-form-item>
    </el-form>
    <!-- allRight部分 -->
    <div class="footer">
      <p>Copyright © 2017 皇冠晶品All Rights Reserved 上海居客酒店投资管理有限公司版权所有<br> <span>备案号：沪ICP备08014899号</span></p>
    </div>
  </div>
</template>
<script>
  import API from '../api/api_user'

  export default {
    data() {
      var validateAccount = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.account.username !== '') {
            this.account.username = value;
            this.validateCorrect();
          }
          callback();
        }
      };
      var validatePwd = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.account.pwd !== '') {
            this.account.pwd = value;
            this.validateCorrect();
          }
          callback();
        }
      };
      return {
        //loading: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, validator: validateAccount, trigger: 'change'}
          ],
          pwd: [
            {required: true, validator: validatePwd, trigger: 'change'}
          ]
        },
        pwdFocus: false,
        allowLogin: true,
        checked: true,
        // select选择门店数据
        HotelArr: [
          {
            value: '选项1',
            label: '门店1'
          },
          {
            value: '选项2',
            label: '门店2'
          },
          {
            value: '选项3',
            label: '门店3'
          }
        ],
        HotelValue: '',
        // 排班数据
        schedule: [
          {
            value: '选项1',
            label: '早班'
          },
          {
            value: '选项2',
            label: '中班'
          },
          {
            value: '选项3',
            label: '晚班'
          }
        ],
        scheduleValue: ''
      };
    },
    created() {
      let reg_user = JSON.parse(window.localStorage.getItem('register-user'));
      if (reg_user) {
        this.account.username = reg_user.username;
        this.account.pwd = '';
        this.pwdFocus = true;
      }
    },
    methods: {
      handleLogin: function () {
        /**
         * 调用login的接口
         * http://192.168.4.53:1223/user/user_login/
         * 必传参数：{username,password}
         * 测试阶段登录为：test2234,test2234
         * 登录方法：handleLogin
         * @type {default.methods}
         */
        let that = this;
        let url = 'http://192.168.4.53:1223/user/user_login/';
        let username = this.account.username;
        let pwd = this.account.pwd;
        let result = {
          id: '1',
          username: username,
          nickname: username,
        };
        console.info(username, pwd);
        this.$axios({
          method: 'post',
          url: url,
          data: {
            username: username,
            password: pwd
          }
        }).then(function (data) {
          if (data.data.message == "success") {
            localStorage.setItem('access-user', JSON.stringify(result));
            window.localStorage.removeItem('register-user');
            that.$router.push({path: '/'});
          } else {
            //this.loading = false;
            console.info(data.data.message);
            //this.$message.error("登录失败，账号或密码错误");
          }
        })
          .catch(function (err) {
            console.info(err)
          })
        /* let result = {
           id: '1',
           username: 'admin',
           nickname: this.account.username,
           name: 'administrator',
           email: '888888@163.com'
         };
         this.loading = true;
         let status = API.login(result);
         if(status == 'success'){
           localStorage.setItem('access-user', JSON.stringify(result));
           window.localStorage.removeItem('register-user');
           that.$router.push({path: '/'});
         } else {
           this.loading = false;
           this.$message.error("登录失败，账号或密码错误");
         }*/
      },
      validateCorrect() {
        if (this.account.pwd.trim().length > 0 && this.account.username.trim().length > 0) {
          this.allowLogin = false;
        } else {
          this.allowLogin = true;
        }
      }
    }
  }
</script>
<style scoped>
  .loginView {
    width: 100%;
    min-width: 768px;
    background: url(../assets/login-bg.png) no-repeat center;
  }

  /* 头部 */
  .nav_title {
    margin: auto;
    padding-top: 100px;
    text-align: center;
  }

  .nav_title .logo {
    color: #333333;
    font-size: 3.57rem;
  }

  .nav_title .logo_en {
    margin-top: 20px;
    color: #777;
    font-size: 30px;
  }

  .logo_text::before {
    content: " ";
    display: inline-block;
    width: 68px;
    height: 78px;
    background: url("../assets/login-logo.png") no-repeat center;
    background-size: 100%;
    vertical-align: middle;
    margin-right: 50px;
  }

  .el-select {
    display: block;
    color: #333333;
  }

  .el-select input::-webkit-input-placeholder {
    color: #333333;
  }

  .el-select input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #333333;
  }

  .el-select input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #333333;
  }

  .el-select input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #333333;
  }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 124px auto 56px auto;
    width: 600px;
    padding: 26px 50px 30px 50px;
    background: #fff;
    border: 1px solid #eaeaea;
  }

  .login-container .title {
    margin: 0px auto 40px auto;
    color: #08478C;
  }

  .login-container .remember {
    margin: 0px 0px 35px 0px;
  }

  .extra-text {
    position: relative;
    margin-bottom: 0;
    padding-left: 2px;
  }

  .extra-text a {
    font-size: 12px;
    color: #aaa;
  }

  .extra-text a:hover {
    color: #29e;
  }

  .extra-text .reg-text {
    position: absolute;
    top: 4px;
    right: 2px;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    line-height: 30px;
    color: #333333;
    padding-bottom: 40px;
  }

  .footer p span {
    color: #00A888;
  }
</style>
