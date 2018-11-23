var myChart = echarts.init(document.getElementById("show"));

var data = {
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

myChart.setOption(option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
            type: 'tree',

            data: [data],

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
