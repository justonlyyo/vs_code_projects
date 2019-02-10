var myChart = echarts.init(document.getElementById("show"));

var example = {
    "name": "医疗器材经营系统",
    "children": [
        {
            "name": "日常工作",
            "children": [
                { "name": "公告通知" },
                { "name": "知识库" },
                { "name": "考勤管理" },
                { "name": "待办事宜" },
                { "name": "我的业绩" },
                { "name": "沟通平台" }
            ]
        },
        {
            "name": "行政管理",
            "children": [

                { "name": "采购管理" },
                { "name": "库存管理" },
                { "name": "销售管理" },
                { "name": "商业智能" }
            ]
        },
        {
            "name": "财务管理",
            "children": [
                { "name": "科技基本信息维护" },
                { "name": "客户价值分析" },
                { "name": "客户分先评估" }
            ]
        },
        {
            "name": "造价咨询",
            "children": [
                { "name": "食品药品监管部门" },
                { "name": "分公司" },
                { "name": "合作伙伴" },
                { "name": "厂家和客户" }
            ]
        },
        {
            "name": "招标代理",
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
    "name": "管理员角色",
    "children": [
        {
            "name": "系统设置",
            "children": [
                { "name": "添加/用户" , "children": [{"name": "允许"},{"name":"禁止"}]},
                { "name": "信息修改",  "children": [{"name": "允许"},{"name":"禁止"}]},
                { "name": "删除和停用",  "children": [{"name": "允许"},{"name":"禁止"}] },
                { "name": "分配角色",  "children": [{"name": "允许"},{"name":"禁止"}]},
                { "name": "角色权限管理",  "children": [{"name": "允许"},{"name":"禁止"}]},
                { "name": "业务权限管理",  "children": [{"name": "允许"},{"name":"禁止"}]}
            ]
        },
        {
            "name": "财务管理",
            "children": [
                { "name": "物品领用" },
                { "name": "行政合同" },
                { "name": "制度管理"},
                { "name": "人力资源管理" },
                { "name": "固定资产"},
                { "name": "原件,印章管理"}
            ]
        },
        {
            "name": "财务管理",
            "children": [
                { "name": "项目结算" },
                { "name": "公司财务" },
                { "name": "财务报销" }
            ]
        },
        {
            "name": "造价咨询",
            "children": [
                { "name": "概算评审" },
                { "name": "预算编制" },
                { "name": "跟踪审计" },
                { "name": "结算审核" },
                { "name": "司法鉴定" }
            ]
        },
        {
            "name": "招标代理",
            "children": [
                { "name": "招标项目" },
                { "name": "投标项目" }
            ]
        },
        {
            "name": "数据中心",
            "children": [
                { "name": "指标库" },
                { "name": "材料库" }
            ]
        },
        {
            "name": "系统管理",
            "children": [
                { "name": "账户管理" },
                { "name": "权限管理" },
                { "name": "组织架构管理" },
                { "name": "用户操作监控" },
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
