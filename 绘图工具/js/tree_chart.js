var myChart = echarts.init(document.getElementById("show"));

var example = {
    "name": "医疗器材经营系统",
    "children": [
        {
            "name": "生产商管理",
            "children": [
                { "name": "基本信息维护" },
                { "name": "生产资质审查" },
                { "name": "产品合规审查" }
            ]
        },
        {
            "name": "进销存模块",
            "children": [

                { "name": "采购管理" },
                { "name": "库存管理" },
                { "name": "销售管理" },
                { "name": "商业智能" }
            ]
        },
        {
            "name": "客户管理",
            "children": [
                { "name": "科技基本信息维护" },
                { "name": "客户价值分析" },
                { "name": "客户分先评估" }
            ]
        },
        {
            "name": "网络访问控制",
            "children": [
                { "name": "食品药品监管部门" },
                { "name": "分公司" },
                { "name": "合作伙伴" },
                { "name": "厂家和客户" }
            ]
        },
        {
            "name": "客户管理",
            "children": [
                { "name": "账户管理" },
                { "name": "权限分配" },
                { "name": "系统调整" },
                { "name": "数据备份和回复" }
            ]
        }
    ]
};

var data = {
    "name": "App系统",
    "children": [
        {
            "name": "用户体系",
            "children": [
                { "name": "用户注册/登录" },
                { "name": "个人信息修改" },
                { "name": "个人中心" },
                { "name": "账户找回"},
                { "name": "申请商家资格"},
                { "name": "消息通知"}
            ]
        },
        {
            "name": "人才招聘",
            "children": [
                { "name": "企业入住" },
                { "name": "企业信息管理" },
                { "name": "岗位发布"},
                { "name": "简历填写" },
                { "name": "简历浏览"},
                { "name": "匹配简历推荐"},
                { "name": "简历投递"},
                { "name": "消息通知"}
            ]
        },
        {
            "name": "外卖点餐",
            "children": [
                { "name": "商家入住" },
                { "name": "商家信息管理" },
                { "name": "菜品上架" },
                { "name": "促销活动" },
                { "name": "竞价推广" },
                { "name": "订餐" },
                { "name": "评论和点赞" }
            ]
        },
        {
            "name": "企业服务",
            "children": [
                { "name": "企业入住" },
                { "name": "企业信息管理" },
                { "name": "服务浏览" },
                { "name": "服务预约" },
                { "name": "留言和评论" }
            ]
        },
        {
            "name": "办公设备租赁",
            "children": [
                { "name": "企业入住" },
                { "name": "企业信息管理" },
                { "name": "设备浏览" },
                { "name": "设备租赁" },
                { "name": "留言和评论" }
            ]
        },
        {
            "name": "系统管理",
            "children": [
                { "name": "数据统计" },
                { "name": "用户管理" },
                { "name": "信息审核/管理" },
                { "name": "数据备份" }
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
