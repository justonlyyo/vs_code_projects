var Rect = function() {
    /*
    绘制一个rect的基础方法.
    参数
    obj:            宿主对象(类名或者id,前面要加.或者#).已设置过width/height属性.
    data_list:      数据集数组.
    style_dict:     样式字典,包含如下:
                                {
                                    "color": "柱体颜色",                        # color ,html和css允许的颜色表达方式皆可.
                                    "step": 40,                                # int,单位像素, 每个柱体开始位置的坐标差,比柱体的宽度要大,因为毕竟要留间隔.
                                    "width": 35,                               # int,单位像素, 柱体宽度
                                    "text": function(item){return item;}       # function, 文本的返回方式
                                 }
    */
    var base_draw = function(obj, data_list, style_dict) {
        var update = $()
    };
};