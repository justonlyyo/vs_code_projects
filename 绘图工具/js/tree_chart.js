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
    "name": "投行云平台",
    "children": [
        {
            "name": "数据抓取",
            "children": [
                { "name": "爬虫管理" },
                { "name": "数据采集" },
                { "name": "数据清洗" },
                { "name": "数据格式化"},
                { "name": "数据分析"},
                { "name": "故障报警"}
            ]
        },
        {
            "name": "业务匹配",
            "children": [
                { "name": "设置匹配规则" },
                { "name": "管理匹配结果" },
                { "name": "手动匹配"},
                { "name": "匹配结果分配" },
                { "name": "匹配数据统计"},
                { "name": "统计数据可视化"}
            ]
        },
        {
            "name": "项目管理",
            "children": [
                { "name": "项目推进状态" },
                { "name": "客户价值分析" },
                { "name": "业务绩效管理" },
            ]
        },
        {
            "name": "系统管理",
            "children": [
                { "name": "账户管理" },
                { "name": "权限分配" },
                { "name": "系统状态查看" },
                { "name": "系统故障报警" },
                { "name": "系统调整" },
                { "name": "数据备份和恢复" }
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
