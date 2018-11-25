var myChart = echarts.init(document.getElementById("show"));

var 人力资源管理系统 = {
    "name": "人力资源管理系统",
    "children": [
        {
            "name": "市场管理",
            "children": [
                {"name":'企业用户信息管理', "children": [
                    {"name": "企业用户信息添加/修改"},
                    {"name": "企业用户信息查询"},
                    {"name": "企业用户信息备份/导出"},
                    {"name": "企业用户相关信息汇总,统计"}
                ]},
                {"name":"项目洽谈信息管理", "children": [
                    {"name": "项目洽谈信息添加/修改"},
                    {"name": "项目洽谈信息维护/状态跟踪"},
                    {"name": "项目洽谈信息查询"},
                    {"name": "项目洽谈信息备份/导出"},
                    {"name": "项目洽谈信息的汇总,统计"}
                ]},
            ]
        },
        {
            "name": "运营管理",
            "children": [
              
                    {"name": "企业站点管理(形象宣传)"},
                    {"name": "企业宣传信息维护(文化,福利待遇等)"},
                    {"name": "岗前培训"},
                    {"name": "岗位管理", "children": [
                        {"name": "空缺岗位发布"},
                        {"name": "人才缺口反馈结果"}
                    ]}               
            ]
        },
        {
            "name": "项目管理",
            "children": [
                {"name": "外部员工信息维护"},
                {"name": "空缺岗位发布"},
                {"name": "入职和离职管理"}
            ]
        },
        {
            "name": "人事管理",
            "children": [
                {"name": "人才信息管理", "children": [
                    {"name": "人才信息录入"},
                    {"name": "人才信息更新维护"}
                ]},
                {"name": "空缺岗位管理", "children": [
                    {"name": "空缺岗位信息表"},
                    {"name": "人才推送记录表"}
                ]},
                {"name": "内部员工招聘管理"}
            ]
        },
        {
            "name": "财务管理",
            "children": [
                {"name": "薪酬统计","children": [
                    {"name": "内部员工薪酬统计"},
                    {"name": "外部员工薪酬统计"},
                    {"name": "薪酬计算方式设定"}
                ]},
                {"name": "绩效管理", "children": [
                    {"name": "绩效计算方法设定"},
                    {"name": "绩效统计"}
                ]}
            ]
        },
        {
            "name": "用户中心",
            "children": [
                {"name": "登录注销"},
                {"name": "用户个人信息查看修改"}
            ]
        },
        {
            "name": "系统管理",
            "children": [
                {"name": "权限组管理"},
                {"name": "用户管理/权限分配"},
                {"name": "系统参数设定"},
                {"name": "数据维护与备份"}
            ]
        }
        
    ]
};

var 消防题库 = {
    "name": "消防题库",
    "children": [
        {"name": "用户模块", "children": [
            {"name": "用户注册, 登录, 注销.信息修改, 手机绑定等"},
            {"name": "查看会员信息,充值"}
        ]},
        {"name": "系统模块/后台管理", "children": [
            {"name": "用户等级设定"},
            {"name": "等级权限设定"},
            {"name": "用户信息修改"},
            {"name": "查询用户信息"},
            {"name": "用户信息统计(人数,缴费情况等,以柱状图,线图,饼图提供直观分析帮助)"}
        ]},
        {"name": "教学模块", "children": [
            {"name": "技术实务"},
            {"name": "综合能力"},
            {"name": "国标规范"},
            {"name": "常用数据"},
            {"name": "错题库"},
            {"name": "综合训练"},
            {"name": "VIP中心"}
        ]},
        {
            "name": "下载中心", "children":[
                {"name": "一般资源"},
                {"name": "VIP资源"}
            ]
        }
    ]
};

myChart.setOption(option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
            type: 'tree',

            data: [消防题库],

            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            fontSize: 16,
            symbolSize: 7,

            label: {
                normal: {
                    // fontSize: 16,
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 9
                }
            },
            leaves: {
                label: {
                    normal: {
                        // fontSize: 16,
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }
    ]
});
