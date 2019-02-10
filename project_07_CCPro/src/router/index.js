import Vue from 'vue'
import Router from 'vue-router'
//登陆后进入的路由
import Index from '../views/main'
//点击pms进入的路由
import Home from '@/views/pms/common/home.vue'
import FirstIdnex from '@/views/pms/houseStatus/firstIndex.vue'
import OrderList from '@/views/pms/orderList/orderList'
import HouseStatus from '@/views/pms/customer/customer'
import AccountsReceivable from '@/views/pms/accountsReceivable/accountsReceivable'
import Nightaudit from '@/views/pms/nightaudit/nightaudit'
import Shifting from '@/views/pms/shifting/shifting'
import Reports from '@/views/pms/reports/reports'
import Customer from '@/views/pms/customer/customer'
//设置下的路由


//点击内控店控进入的路由
import Internal from '@/views/internal-store-control/internal'
import Organizationchart from '@/views/internal-store-control/organizationchart/organizationchart'
//组织架构管理的路由
import Grouplimits from '@/views/internal-store-control/organizationchart/grouplimits'
import Internalcontrol from '@/views/internal-store-control/organizationchart/Internalcontrol'
import Personrole from '@/views/internal-store-control/organizationchart/personrole'
import Rolemanager from '@/views/internal-store-control/organizationchart/rolemanager'
//点击会员的进入的路由
import Member from '@/views/member/member'
//点击铁管家进入的路由
import Ironhome from '@/views/ironsteward/common/ironhome'
import Equipmentcommon from '@/views/ironsteward/equipmentcommon/equipmentcommon'
import Equipmentguest from '@/views/ironsteward/equipmentguest/equipmentguest'
import Equipmenttype from '@/views/ironsteward/equipmenttype/equipmenttype'
import Guestcontrol from '@/views/ironsteward/guestcontrol/guestcontrol'
import Ironsteward from '@/views/ironsteward/ironsteward/ironsteward'



import LeftNav from '@/components/nav/leftNav.vue'

import NotFound from '@/components/404.vue'
import RightContent from '@/components/nav/rightContent.vue'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound  //当相应路由没有内容的时候
    },
    //登陆后进入的路由
    {
      path: '/',
      type: 'main',
      component: Index
    },




//点击pms进入的路由
    {
      path: '/firstIndex',
      type: 'home',
      name: 'first',
      redirect: '/firstIndex',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/firstIndex',
          component: RightContent,
          // component: Home,
          name: 'firstIndex', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/firstIndex', component: FirstIdnex, name: '房态', menuShow: true },

          ]
        }
      ]

    },
    {
      path: '/orderList',
      type: 'home',
      name: 'orderList',
      redirect: 'orderList',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/orderList',
          component: RightContent,
          name: 'orderList',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {path: '/orderList',  component: OrderList, name: '预定', menuShow: true}
          ]
        }
      ]
    },
    {
      path: '/customer',
      type: 'home',
      name: 'customer',
      redirect: 'customer',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/customer',
          component: RightContent,
          name: 'customer',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {path: '/customer',  component: HouseStatus, name: '宾客', menuShow: true}
          ]
        }
      ]
    },
    {
      path: '/accountsReceivable',
      type: 'home',
      name: 'accountsReceivable',
      redirect: 'accountsReceivable',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/accountsReceivable',
          component: RightContent,
          name: 'accountsReceivable',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {path: '/accountsReceivable',  component: AccountsReceivable, name: '财务', menuShow: true}
          ]
        }
      ]
    },
    {
      path: '/nightaudit',
      type: 'home',
      name: 'nightaudit',
      redirect: 'nightaudit',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/nightaudit',
          component: RightContent,
          name: 'nightaudit',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {path: '/nightaudit',  component: Nightaudit, name: '夜审', menuShow: true}
          ]
        }
      ]
    },
    {
      path: '/setting',
      type: 'home',
      name: 'setting',
      redirect: '/setting/RoomSet',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/setting',
          component: ()=>import('@/views/pms/setting/setting'),
          name: 'setting',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {
              path: '/setting/RoomSet',
              component: ()=>import('@/views/pms/setting/RoomSet'),
              name: 'RoomSet',
              menuShow: true,
            },
            {
              path: '/setting/Charges',
              component: ()=>import('@/views/pms/setting/Charges'),
              name: 'Charges',
              menuShow: true,
            },
            {
              path: '/setting/Personnel',
              component: ()=>import('@/views/pms/setting/Personnel'),
              name: 'personnel',
              menuShow: true,
            },
            {
              path: '/setting/Market',
              component: ()=>import('@/views/pms/setting/Market'),
              name: 'Market',
              menuShow: true,
            },
            {
              path: '/setting/Code',
              component: ()=>import('@/views/pms/setting/Code'),
              name: 'Code',
              menuShow: true,
            },
            {
              path: '/setting/Equipment',
              component: ()=>import('@/views/pms/setting/Equipment'),
              name: 'Equipment',
              menuShow: true,
            },
            {
              path: '/setting/System',
              component: ()=>import('@/views/pms/setting/System'),
              name: 'System',
              menuShow: true,
            },
            {
              path: '/setting/Print',
              component:()=>import('@/views/pms/setting/Print') ,
              name: 'Print',
              menuShow: true,
            },
          ]
        }
      ]
    },
    {
      path: '/reports',
      type: 'home',
      name: 'reports',
      redirect: 'reports',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/reports',
          component: RightContent,
          name: 'reports',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {path: '/reports',  component: Reports, name: '报表', menuShow: true}
          ]
        }
      ]
    },
    {
      path: '/shifting',
      type: 'home',
      name: 'shifting',
      redirect: 'shifting',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/shifting',
          component: RightContent,
          name: 'shifting',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {path: '/shifting',  component: Shifting, name: '交接班', menuShow: true}
          ]
        }
      ]
    },
    {
      path: '/customer',
      type: 'home',
      name: 'house',
      redirect: 'customer',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/customer',
          component: RightContent,
          name: 'customer',
          leaf: true,
          iconCls: 'iconfont icon-home',
          menuShow: true,
          children: [
            {path: '/customer',  component: Customer, name: '客户', menuShow: true}
          ]
        }
      ]
    },

    /**
     *
     * 点击店控进入的路由
     *
     */
    {
      path: '/organizationchart',
      // type: 'home',
      name: 'organizationchart',
      redirect: '/organizationchart',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/organizationchart',
          component: Organizationchart,
          // component: Home,
          name: 'organizationchart', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            {path: '/organizationchart/grouplimits',  component: Grouplimits, name: '集团权限', menuShow: true},
            {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
            {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
            {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
          ]
        }
      ]
    },

    /**
     * 会员模块
     * 点击会员进入的路由
     * 当前路由是控制会员主页的（会员列表）
     */
    {
      path: '/member',
      // type: 'home',
      name: 'member',
      redirect: '/member',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/member',
          component: RightContent,
          // component: Home,
          name: 'member', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/member', component: Member, name: '会员', menuShow: true },
          ]
        }
      ]
    },

    /**
     * 点击铁管家进入的路由
     * 主页
     */
    {
      path: '/ironsteward',
       type: 'ironhome',
      name: 'ironsteward',
      redirect: '/ironsteward',
      component: Ironhome,
      menuShow: true,
      children: [
        {
          path: '/ironsteward',
          component: RightContent,
          // component: Home,
          name: 'ironsteward', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/ironsteward', component: Ironsteward, name: '铁管家', menuShow: true },
          ]
        }
      ]
    },
    {
      path: '/equipmentcommon',
      type: 'ironhome',
      name: 'equipmentcommon',
      redirect: '/equipmentcommon',
      component: Ironhome,
      menuShow: true,
      children: [
        {
          path: '/equipmentcommon',
          component: RightContent,
          // component: Home,
          name: 'equipmentcommon', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/equipmentcommon', component: Equipmentcommon, name: '铁管家', menuShow: true },
          ]
        }
      ]
    },
    {
      path: '/equipmentguest',
      type: 'ironhome',
      name: 'equipmentguest',
      redirect: '/equipmentguest',
      component: Ironhome,
      menuShow: true,
      children: [
        {
          path: '/equipmentguest',
          component: RightContent,
          // component: Home,
          name: 'equipmentguest', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/equipmentguest', component: Equipmentguest, name: '铁管家', menuShow: true },
          ]
        }
      ]
    },
    {
      path: '/equipmenttype',
      type: 'ironhome',
      name: 'equipmenttype',
      redirect: '/equipmenttype',
      component: Ironhome,
      menuShow: true,
      children: [
        {
          path: '/equipmenttype',
          component: RightContent,
          // component: Home,
          name: 'equipmenttype', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/equipmenttype', component: Equipmenttype, name: '铁管家', menuShow: true },
          ]
        }
      ]
    },
    {
      path: '/guestcontrol',
      type: 'ironhome',
      name: 'guestcontrol',
      redirect: '/guestcontrol',
      component: Ironhome,
      menuShow: true,
      children: [
        {
          path: '/guestcontrol',
          component: RightContent,
          // component: Home,
          name: 'guestcontrol', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/guestcontrol', component: Guestcontrol, name: '铁管家', menuShow: true },
          ]
        }
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else if(to.path.startsWith('/register')){
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

// router.addRoutes(orderManagerRouter)

export default router
