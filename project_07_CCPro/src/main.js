// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'

import store from './store.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/css/style.css'

//内控店控右侧的登陆和设置的公共组件
import logonRight from './components/common/ini'
Vue.component("logon-view",logonRight);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
/*Vue.use(axios)*/

// Vue.component('footer-copyright', {
//   template: '<p class="footer-msg">©CopyRight 2016-2018 车车科技发展有限公司 版权所有 <a href="http://www.miibeian.gov.cn" target="_blank">粤ICP备******号</a></p>'
// });

Vue.filter('formatDateTime', function (value) {
  if (!value) return ''
  let date = new Date(value);
  let y = date.getFullYear() + '/';
  let mon = (date.getMonth() + 1) + '/';
  let d = date.getDate();
  return y + mon + d;
});
/**
 * @ 添加公共的请求头文件  做授权使用
 */
//http://47.98.113.173:9519/v1/common/employee/create_token?user_id=1&user_name=super_root
//
axios({
  method : 'get',
  url: `http://47.98.113.173:9519/v1/common/employee/create_token?hotel_group_id=2&hotel_id=1&user_id=28&user_name=root_hotel`
}).then(res=>{
  axios.defaults.headers.common['Authorization'] = res.data.authorization
  new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
  })
});

// new Vue({
//   router,
//   store,
//   el: '#app',
//   render: h => h(App)
// })
