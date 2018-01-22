$(function() {
    global_data = null; // 全局变量

    /* 
    取参数 income_args
    这些参数是从搜索页面传递过来的,可以把income_args参数传递给搜索引擎进行查询.
    返回的结果进行专门的处理.
    完善submit_keyword函数来实现全部的功能.
    注:
    submit_keyword函数在脚本的底部,是预留给正式代码的空函数.
    */
    var temp_list = decodeURI(location.search).slice(1).split("&");
    var income_args = {};
    for (var i = 0; i < temp_list.length; i++) {
        var temp = temp_list[i].split("=");
        if (temp.length === 2) {
            income_args[temp[0]] = temp[1];
        }
    }

    // 生成一个查询结果单元.
    var create_item = function(data_dict) {
        var user_id = data_dict.id;
        var user_name = data_dict.username;
        var drive_age = data_dict.drive_age;
        var security_score = data_dict.drive_score;
        var bad_action_count = data_dict.bad_drive_action.length;
        var phone_num = data_dict.phone_num;
        var company_name = data_dict.company;

        var html = `<!--一个单元开始-->
        <div class="row my_item_title">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            </div>
        </div>
        <div class="my_item row">
            <!--图片区-->
            <div class="show_img col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <div class="row">
                    <div class='img_outer col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <img data-id="${user_id}" onclick="pop_chart_div($(this))" class="image img-responsive center-block" src="image/icon_touxiang.svg">
                    </div>
                </div>
                <div class="row">
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <span clss="start_outer">
                            <i class="icon icon-star"></i>
                            <i class="icon icon-star"></i>
                            <i class="icon icon-star"></i>
                            <i class="icon icon-star"></i>
                            <i class="icon  icon-star-empty"></i>
                        </span>
                    </div>
                </div>
            </div>
            <!--图片区-->
            <!--信息区-->
            <div class="show_info col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        姓名: <span class="user_name">${user_name}</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        籍贯：<span class=""></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        驾龄: <span class="drive_age">${drive_age}</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        性别：<span class="sex">男</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        安全评分: <span class="security_score">${security_score}</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        违章：<span class="bad_action">${bad_action_count}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        联系方式<span class="phone_num">${phone_num}</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        驾驶特征: <span class="drive_age">待定</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        服务公司: <span class="company_name">${company_name}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <a href="javascript:;" data-id="${user_id}" class="my_href">
                            ${company_name}的${user_name}符合你的查询要求.
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="sub_parent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="sub">
                            <span class="badge my_circle_blue">1</span>
                            <span>打电话</span>
                        </div>
                        <div class="sub">
                            <span class="badge my_circle_red">7</span>
                            <span>急转弯</span>
                        </div>
                        <div class="sub">
                            <span class="badge my_circle_yellow">5</span>
                            <span>超速</span>
                        </div>
                        <div class="sub">
                            <span class="badge my_circle_green">3</span>
                            <span>抽烟</span>
                        </div>
                    </div>
                </div>              
            </div>
            <!--信息区-->
            <!--分割线-->
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <hr class="my_item_hr">
                </div>
            </div>
        </div>         
        <!--一个单元结束-->`;
        return html;
    };

    // 批量生产元素并填充
    var fill_dom = function(data_list) {
        var main = $("#main_col");
        main.empty();
        var l = data_list.length;
        for (var i = 0; i < l; i++) {
            var data = data_list[i]._source;
            var html = create_item(data);
            main.append(html);
        }
    };

    /*查询数据,正式使用的 */
    var query_data = function(args) {
        $.get("some_url", args, function(json) {
            var data = JSON.parse(json);
            console.log(data);
            fill_dom(data);
        });
    };
    // query_data(income_args);

    /*查询数据 测试时使用 */
    var test_data = function() {
        global_data = {
            '_shards': {
                'skipped': 0,
                'successful': 5,
                'failed': 0,
                'total': 5
            },
            'took': 29,
            'timed_out': false,
            'hits': {
                'hits': [{
                        '_source': {
                            'drive_rank': 40,
                            'bad_drive_action': [{
                                    'datetime': '2017-12-28T13:36:37',
                                    'longitude': 33.0,
                                    'altitude': 34.0,
                                    'latitude': 131.0,
                                    'type': 'speeding right turn'
                                },
                                {
                                    'datetime': '2017-12-28T13:36:37',
                                    'longitude': 33.0,
                                    'altitude': 33.0,
                                    'latitude': 132.0,
                                    'type': 'speeding drive'
                                }
                            ],
                            'health': {
                                'mood': {
                                    'datetime': '2017-12-28T13:36:37',
                                    'value': {
                                        '05:00': 84,
                                        '20:00': 76,
                                        '06:00': 91,
                                        '01:00': 92,
                                        '13:00': 76,
                                        '18:00': 86,
                                        '03:00': 77,
                                        '12:00': 84,
                                        '17:00': 95,
                                        '04:00': 85,
                                        '21:00': 78,
                                        '09:00': 81,
                                        '24:00': 87,
                                        '02:00': 83,
                                        '22:00': 96,
                                        '15:00': 96,
                                        '23:00': 76,
                                        '19:00': 93,
                                        '11:00': 85,
                                        '08:00': 80,
                                        '10:00': 80,
                                        '14:00': 100,
                                        '07:00': 90,
                                        '16:00': 94
                                    }
                                },
                                'heart_rate': {
                                    'datetime': '2017-12-28T13:36:37',
                                    'value': {
                                        '05:00': 84,
                                        '20:00': 79,
                                        '06:00': 85,
                                        '01:00': 91,
                                        '13:00': 91,
                                        '18:00': 98,
                                        '03:00': 96,
                                        '12:00': 78,
                                        '17:00': 100,
                                        '04:00': 88,
                                        '21:00': 92,
                                        '09:00': 97,
                                        '24:00': 85,
                                        '02:00': 97,
                                        '22:00': 90,
                                        '15:00': 99,
                                        '23:00': 100,
                                        '19:00': 100,
                                        '11:00': 89,
                                        '08:00': 75,
                                        '10:00': 86,
                                        '14:00': 99,
                                        '07:00': 93,
                                        '16:00': 94
                                    }
                                },
                                'sleep_time': {
                                    'datetime': '2017-12-28T13:36:37',
                                    'value': 2
                                }
                            },
                            'id': '59cda964ad01be237680e29d',
                            'report_datetime': '2017-12-28T13:36:37',
                            'drive_distance': '165km',
                            'oil_cost': 74,
                            'reset_time': 1,
                            'phone_num': '17321067312',
                            'drive_score': 89,
                            'username': '栾新军',
                            'drive_time': 9,
                            'company': '顺风快运',
                            'drive_age': 5,
                            'max_speed': 80
                        },
                        '_type': 'daily_report',
                        '_score': null,
                        '_index': 'sf',
                        '_id': 'AWCbn1AmJvBFS7FSYN6e',
                        'sort': [1514468197000]
                    },
                    {
                        '_source': {
                            'drive_rank': 26,
                            'bad_drive_action': [{
                                    'datetime': '2017-12-27T14:55:25',
                                    'longitude': 32.0,
                                    'altitude': 33.0,
                                    'latitude': 135.0,
                                    'type': 'smoking drive'
                                },
                                {
                                    'datetime': '2017-12-27T14:55:25',
                                    'longitude': 31.0,
                                    'altitude': 31.0,
                                    'latitude': 135.0,
                                    'type': 'calling drive'
                                }
                            ],
                            'health': {
                                'mood': {
                                    'datetime': '2017-12-27T14:55:25',
                                    'value': {
                                        '05:00': 86,
                                        '20:00': 92,
                                        '06:00': 83,
                                        '13:00': 86,
                                        '18:00': 82,
                                        '03:00': 81,
                                        '12:00': 88,
                                        '17:00': 91,
                                        '14:00': 87,
                                        '21:00': 76,
                                        '09:00': 97,
                                        '24:00': 83,
                                        '02:00': 85,
                                        '22:00': 77,
                                        '15:00': 80,
                                        '23:00': 86,
                                        '19:00': 88,
                                        '11:00': 97,
                                        '08:00': 100,
                                        '10:00': 100,
                                        '01:00': 93,
                                        '07:00': 94,
                                        '16:00': 86,
                                        '04:00': 83
                                    }
                                },
                                'heart_rate': {
                                    'datetime': '2017-12-27T14:55:25',
                                    'value': {
                                        '05:00': 83,
                                        '20:00': 89,
                                        '06:00': 91,
                                        '13:00': 98,
                                        '18:00': 99,
                                        '03:00': 89,
                                        '12:00': 75,
                                        '17:00': 85,
                                        '14:00': 89,
                                        '21:00': 98,
                                        '09:00': 84,
                                        '24:00': 95,
                                        '02:00': 99,
                                        '22:00': 94,
                                        '15:00': 98,
                                        '23:00': 100,
                                        '19:00': 90,
                                        '11:00': 100,
                                        '08:00': 81,
                                        '10:00': 93,
                                        '01:00': 79,
                                        '07:00': 95,
                                        '16:00': 92,
                                        '04:00': 77
                                    }
                                },
                                'sleep_time': {
                                    'datetime': '2017-12-27T14:55:25',
                                    'value': 7
                                }
                            },
                            'id': '59cda964ad01be237680e29d',
                            'report_datetime': '2017-12-27T14:55:25',
                            'drive_distance': '119km',
                            'oil_cost': 76,
                            'reset_time': 1,
                            'phone_num': '17321067312',
                            'drive_score': 100,
                            'username': '栾新军',
                            'drive_time': 6,
                            'company': '顺风快运',
                            'drive_age': 9,
                            'max_speed': 94
                        },
                        '_type': 'daily_report',
                        '_score': null,
                        '_index': 'sf',
                        '_id': 'AWCWwRodJvBFS7FSYN5a',
                        'sort': [
                            1514386525000
                        ]
                    },
                    {
                        '_source': {
                            'drive_rank': 47,
                            'bad_drive_action': [{
                                    'datetime': '2017-12-25T09:29:38',
                                    'longitude': 33.0,
                                    'altitude': 32.0,
                                    'latitude': 132.0,
                                    'type': 'speeding right turn'
                                },
                                {
                                    'datetime': '2017-12-25T09:29:38',
                                    'longitude': 33.0,
                                    'altitude': 35.0,
                                    'latitude': 134.0,
                                    'type': 'calling drive'
                                }
                            ],
                            'health': {
                                'mood': {
                                    'datetime': '2017-12-25T09:29:38',
                                    'value': {
                                        '05:00': 94,
                                        '20:00': 95,
                                        '06:00': 88,
                                        '13:00': 91,
                                        '18:00': 90,
                                        '03:00': 99,
                                        '12:00': 82,
                                        '17:00': 84,
                                        '04:00': 81,
                                        '21:00': 90,
                                        '14:00': 79,
                                        '09:00': 79,
                                        '10:00': 80,
                                        '02:00': 93,
                                        '22:00': 94,
                                        '16:00': 89,
                                        '23:00': 83,
                                        '19:00': 95,
                                        '11:00': 86,
                                        '08:00': 94,
                                        '24:00': 81,
                                        '01:00': 97,
                                        '07:00': 84,
                                        '15:00': 81
                                    }
                                },
                                'heart_rate': {
                                    'datetime': '2017-12-25T09:29:38',
                                    'value': {
                                        '05:00': 76,
                                        '20:00': 75,
                                        '06:00': 89,
                                        '13:00': 100,
                                        '18:00': 77,
                                        '03:00': 87,
                                        '12:00': 84,
                                        '17:00': 100,
                                        '04:00': 90,
                                        '21:00': 77,
                                        '14:00': 78,
                                        '09:00': 92,
                                        '10:00': 85,
                                        '02:00': 77,
                                        '22:00': 84,
                                        '16:00': 78,
                                        '23:00': 89,
                                        '19:00': 92,
                                        '11:00': 84,
                                        '08:00': 88,
                                        '24:00': 85,
                                        '01:00': 91,
                                        '07:00': 75,
                                        '15:00': 84
                                    }
                                },
                                'sleep_time': {
                                    'datetime': '2017-12-25T09:29:38',
                                    'value': 8
                                }
                            },
                            'id': '59cda964ad01be237680e29d',
                            'report_datetime': '2017-12-25T09:29:38',
                            'drive_distance': '154km',
                            'oil_cost': 50,
                            'reset_time': 3,
                            'phone_num': '17321067312',
                            'drive_score': 98,
                            'username': '栾新军',
                            'drive_time': 12,
                            'company': '顺风快运',
                            'drive_age': 10,
                            'max_speed': 93
                        },
                        '_type': 'daily_report',
                        '_score': null,
                        '_index': 'sf',
                        '_id': '882017-12-25',
                        'sort': [
                            1514194178000
                        ]
                    },
                    {
                        '_source': {
                            'drive_rank': 36,
                            'bad_drive_action': [{
                                    'datetime': '2017-12-21T11:17:28',
                                    'longitude': 35.0,
                                    'altitude': 35.0,
                                    'latitude': 131.0,
                                    'type': 'play phone drive'
                                },
                                {
                                    'datetime': '2017-12-21T11:17:28',
                                    'longitude': 34.0,
                                    'altitude': 34.0,
                                    'latitude': 131.0,
                                    'type': 'play phone drive'
                                }
                            ],
                            'health': {
                                'mood': {
                                    'datetime': '2017-12-21T11:17:28',
                                    'value': {
                                        '05:00': 78,
                                        '20:00': 95,
                                        '06:00': 91,
                                        '13:00': 84,
                                        '18:00': 93,
                                        '03:00': 86,
                                        '12:00': 94,
                                        '17:00': 81,
                                        '14:00': 93,
                                        '21:00': 85,
                                        '04:00': 95,
                                        '09:00': 88,
                                        '02:00': 90,
                                        '22:00': 77,
                                        '16:00': 93,
                                        '23:00': 76,
                                        '10:00': 83,
                                        '19:00': 86,
                                        '11:00': 89,
                                        '08:00': 96,
                                        '24:00': 93,
                                        '01:00': 92,
                                        '07:00': 86,
                                        '15:00': 100
                                    }
                                },
                                'heart_rate': {
                                    'datetime': '2017-12-21T11:17:28',
                                    'value': {
                                        '05:00': 84,
                                        '20:00': 80,
                                        '06:00': 75,
                                        '13:00': 94,
                                        '18:00': 95,
                                        '03:00': 77,
                                        '12:00': 84,
                                        '17:00': 88,
                                        '14:00': 90,
                                        '21:00': 81,
                                        '04:00': 85,
                                        '09:00': 78,
                                        '02:00': 95,
                                        '22:00': 98,
                                        '16:00': 91,
                                        '23:00': 77,
                                        '10:00': 85,
                                        '19:00': 95,
                                        '11:00': 84,
                                        '08:00': 77,
                                        '24:00': 99,
                                        '01:00': 98,
                                        '07:00': 96,
                                        '15:00': 98
                                    }
                                },
                                'sleep_time': {
                                    'datetime': '2017-12-21T11:17:28',
                                    'value': 2
                                }
                            },
                            'id': '59cda964ad01be237680e29d',
                            'report_datetime': '2017-12-21T11:17:28',
                            'drive_distance': '107km',
                            'oil_cost': 55,
                            'reset_time': 4,
                            'phone_num': '17321067312',
                            'drive_score': 95,
                            'username': '栾新军',
                            'drive_time': 6,
                            'company': '顺风快运',
                            'drive_age': 6,
                            'max_speed': 83
                        },
                        '_type': 'daily_report',
                        '_score': null,
                        '_index': 'sf',
                        '_id': '59cda964ad01be237680e29d',
                        'sort': [
                            1513855048000
                        ]
                    }
                ],
                'total': 4,
                'max_score': null
            }
        };

        // 共计查询到几条记录?
        $("#count_result").text(global_data.hits.total);
        var data_list = global_data.hits.hits;
        console.log(data_list);
        fill_dom(data_list); // 把查询结果填充到中间区域的左侧
    };
    test_data(); // 调用测试程序

    // 初始化弹出框
    init_pop = function(id_str) {
        // 检查元素是否存在?
        var pop_div = $("#pop_div");
        if (pop_div.length > 0) {
            pop_div.remove();
        }
        var html = `<!--一个弹出框的代码-->
        <div id="pop_div">
            <div id="resume_outer">
                <!--简历区-->
                <div class="info_row">
                    <span class="title">个人简历:</span>
                    <span class="resume">
                        山东人,十余年货车驾驶经验.工作认证,无重大责任事故,熟悉多省市交通路线.
                        能独立处理车辆日常保养维护工作.
                    </span>
                </div>
            </div>
            <div id="charts_outer">
                <!--图表区域-->
                <div class="chart_row">
                    <div id="left_chart"></div>
                    <div id="right_chart"></div>
                </div>
                <div class="chart_row">
                    <div id="bottom_chart"></div>
                </div>
            </div>
        </div>
        <!--一个弹出框的代码-->`;
        $(".container-fluid").append(html);
        pop_div = $("#pop_div");
        // 初始化各个框的大小
        var width = $("body").width();
        var div_width = width < 600 ? 600 : width * 0.4;
        $(".chart_row, .info_row").css({ "width": div_width, "min-height": "5rem" });
        var left = ((width * 0.9 - div_width) < 0) ? 60 : (width * 0.9 - div_width + 40);
        console.log("left:" + left);
        pop_div.css({ "top": "20%", "left": left });
        // 开始绘图
        // 绘制底部柱状图.
        $("#bottom_chart").css({ "width": div_width, "height": "15rem" });
        var bad_drive_action = [{
                'datetime': '2017-12-21T11:17:28',
                'longitude': 35.0,
                'altitude': 35.0,
                'latitude': 131.0,
                'type': 'play phone drive'
            },
            {
                'datetime': '2017-12-21T11:17:28',
                'longitude': 34.0,
                'altitude': 34.0,
                'latitude': 131.0,
                'type': 'speeding drive'
            },
            {
                'datetime': '2017-12-21T11:17:28',
                'longitude': 34.0,
                'altitude': 34.0,
                'latitude': 131.0,
                'type': 'play phone drive'
            },
            {
                'datetime': '2017-12-21T11:17:28',
                'longitude': 34.0,
                'altitude': 34.0,
                'latitude': 131.0,
                'type': 'smoking drive'
            }
        ];
        init_bad_action_chart(bad_drive_action); // 绘制不良行为柱状图
        // 开始绘制弹出框上部左侧折线图
        $("#left_chart").css({ "width": div_width / 2 });
        var line_index = ["2012", "2013", "2014", "2015", "2016", "2017"];
        var line_data = [76, 80, 77, 82, 86, 95];
        init_line_chart(line_index, line_data); // 绘制折线图
        // 开始绘制弹出框上部右侧折线图
        $("#right_chart").css({ "width": div_width / 2 });
        var bar_list = [
            { "name": "物损", "value": 34 },
            { "name": "人损", "value": 14 },
            { "name": "其他", "value": 60 }
        ];
        init_bar_chart(bar_list); // 绘制饼状图

        pop_div.show();
    };


    // 初始化不良行为柱装图
    init_bad_action_chart = function(data_list) {
        /*需要先拆分数据*/
        let key_name_dict = {
            'speeding drive': '超速行驶',
            'speeding left turn': '急左转',
            'speeding right turn': '急右转',
            'smoking drive': '抽烟',
            'calling drive': '打电话',
            'fatigue drive': '疲劳驾驶',
            'play phone drive': '玩手机',
            'quick lane': '急变道'
        };
        let l = data_list.length;
        if (l === 0) {
            // pass
        } else {
            let dict = {};
            let keys = Object.keys(key_name_dict);
            let d_k = keys.length;
            for (let i = 0; i < d_k; i++) {
                let name = key_name_dict[keys[i]];
                dict[name] = 0;
            }
            let max_count = 0;
            for (let i = 0; i < l; i++) {
                let item = data_list[i];
                let key = item['type'];
                let name = key_name_dict[key];
                if (typeof(name) !== "undefined") {
                    let count = dict[name];
                    if (typeof(count) === "undefined") {
                        // 新的类型.
                        count = 1;
                    } else {
                        count = parseInt(count) + 1;
                    }
                    dict[name] = count;
                    if (count > max_count) {
                        max_count = count;
                    }
                }
            }
            let index = Object.keys(dict);
            let data = new Array();
            let l2 = index.length;
            for (let i = 0; i < l2; i++) {
                data.push(dict[index[i]]);
            }

            let option2 = {
                title: {
                    text: "不良行为统计",
                    x: "center",
                    textStyle: {
                        fontSize: 14
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#7C8FF3"
                        }, {
                            offset: 1,
                            color: '#9DAAF3'
                        }])
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: index,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    interval: 1,
                    max: max_count < 3 ? 3 : max_count + 2
                }],
                series: [{
                    name: '统计',
                    type: 'bar',
                    barWidth: '60%',
                    data: data
                }]
            };

            let charts = echarts.init(document.getElementById("bottom_chart"));
            charts.setOption(option2);
        }

    };

    // 初始化折线图
    init_line_chart = function(index, data) {
        let option = {
            tooltip: {
                trigger: 'axis',
                position: function(pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'left',
                text: '年度安全评估趋势',
                textStyle: {
                    fontSize: 14
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: index
            },
            yAxis: {
                type: 'value',
                min: 30,
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false // 不显示分割线
                }
            },
            series: [{
                name: '心率',
                type: 'line',
                // symbol: "rect",  // 标记点形状
                showSymbol: false, // 不显示拐点,设置为false时,上面的symbol选项就无效了.
                smooth: true, // 平滑折线
                data: data, // 数据,数组,或者数组的数组
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: "#7C8FF3", // 折线颜色
                        }
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#7C8FF3"
                        }, {
                            offset: 1,
                            color: 'white'
                        }])
                    }
                }
            }]
        };

        var charts = echarts.init(document.getElementById("left_chart"));
        charts.setOption(option);
    };

    // 初始化饼状图
    init_bar_chart = function(data_list) {
        // var index = [];
        // for (var i = 0; i < data_list.length; i++) {
        //     index.push(data_list[i].name);
        // }
        var option = {
            title: {
                text: '历年交通事故比重',
                // subtext: '纯属虚构',
                x: 'right',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: index
            // },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data_list,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        var charts = echarts.init(document.getElementById("right_chart"));
        charts.setOption(option);
    };

    // 点击搜索结果的头像,弹出图表框.
    pop_chart_div = function($obj) {
        var user_id = $obj.attr("data-id"); // 演示过程中这个参数并没有用到,但实际中你可以用user_id做很多事情.
        init_pop(); // 弹出图表框
    };

    /*向搜索引擎提交搜索的关键字,请自行完善确实代码 */
    function submit_keyword(arg_dict) {
        /*
            1.向引擎发送查询请求.(如果和搜索引擎不在同一host上,请注意处理cors问题.)
            2.对返回的数据进行适当的处理
            3.像test_data函数那样进行处理.例如:
            $("#count_result").text(global_data.hits.total);    // 共计查询到几条记录?
            var data_list = global_data.hits.hits;
            console.log(data_list);
            fill_dom(data_list); // 把查询结果填充到中间区域的左侧
        */

        alert("方法尚未实现");
    }

    /*放大镜的提交按钮事件 */
    $("#search_btn").click(function() {
        var keyword = $.trim($("#keyword").val());
        if (keyword !== "") {
            submit_keyword({ "keyword": keyword });
        }
    });

    /*输入框回车事件 */
    $("#keyword").keydown(function(ev) {
        var code = ev.keyCode;
        if (code === 13) {
            $("#search_btn").click();
        }
    });


    // end !    
});