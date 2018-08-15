// 验证手机号码的函数,不合法的手机号码会返回false
validate_phone = function (phone) {
    var myreg = /^(((1[3-9][0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (myreg.test(phone)) {
        return true;
    }
    else {
        return false;
    }
};

// 检查邮箱
validate_mail = function (str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
};

// 检查日期是否是 1900-12-12 这种格式
validate_date = function (str) {
    var pattern = /^[12][09][0-9][0-9]-[01][0-9]-[0-3][0-9]$/;
    return pattern.test(str);
};

// 检测是否是火狐浏览器，返回布尔值
is_ff= function(){
    let num = window.navigator.userAgent.indexOf("Firefox/");
    if(num === -1){
        return false;
    }
    else{
        return true;
    }
};

// 比较08:00这样格式的字符串的时间的大小.
compare_hour_and_minute_str = function (a, b) {
    let a_0 = a.split(":");
    let b_0 = b.split(":");
    if (parseInt(a_0) > parseInt(b_0)) {
        return 1;
    }
    else if (parseInt(a_0) < parseInt(b_0)) {
        return -1;
    }
    else {
        let a_1 = null, b_1 = null;
        try {
            a_1 = a_0[1];
            a_1 = parseInt(a_1);
        } catch (e) {
            console.log(e);
            a_1 = 0;
        }
        try {
            b_1 = b_0[1];
            b_1 = parseInt(b_1);
        } catch (e) {
            console.log(e);
            b_1 = 0;
        }
        if (a_1 > b_1) {
            return 1;
        }
        else if (a_1 < b_1) {
            return -1;
        }
        else {
            return 0;
        }
    }
};

/*扩展字符串的方法,增加startsWith和endsWith两个方法(并非所有的浏览器都有这两个方法) */
    if (typeof(String.prototype.startsWith !== "function")) {
        String.prototype.startsWith = function(key_str) {
            console.log("extend function");
            var l2 = key_str.length;
            var start = this.slice(0, l2);
            if (start === key_str) {
                return true;
            } else {
                return false;
            }
        };
    }

    if (typeof(String.prototype.endsWith !== "function")) {
        String.prototype.endsWith = function(key_str) {
            console.log("extend function");
            var l = this.length;
            var l2 = key_str.length;
            var end = this.slice((l - l2));
            if (end === key_str) {
                return true;
            } else {
                return false;
            }
        };
    }

// 检查某个日期是不是今天?
function is_today(date){
    let now1 = new Date();
    let now2 = date;
    if(date.getHours){
        // 是Date对象.
    }
    else{
        now2 = new Date(date);
    }
    if(now2 === "Invalid Date"){
        return false;
    }
    else{
        let y1 = now1.getFullYear();
        let y2 = now2.getFullYear();
        let month1 = now1.getMonth();
        let month2 = now2.getMonth();
        let day1 = now1.getDate();
        let day2 = now2.getDate();
        if(y1 === y2 && month1 === month2 && day1 === day2){
            return true;
        }
        else{
            return false;
        }
    }
}

function float_to_string(hour){
    // 把浮点制的小时换算成xx小时xx分
    let l = String(hour);
    let ls = l.split(".");
    if(ls.length === 1){
        return `${ls[0]}小时`
    }
    else{
        let h = ls[0];
        let m = Math.round(parseFloat(`0.${ls[1]}`) * 60);
        return `${h}小时${m}分钟`;
    }
}

function get_picker_date($obj){
    // 按照统一格式取时间,避免浏览器的差异,$obj是时间选择器绑定的input的jq对象.返回2018-01-01格式的日期
    let date_str = $.trim($obj.val());
    if(date_str.indexOf("-") !== -1){
        let date_list = date_str.split("-");
        let year = date_list[0];
        /*防止浏览器之间的差异,这里必须做手动转换,以保证时间字符串格式的一致性*/
        let month = String(date_list[1]).length < 1? "0" + date_list[1]:date_list[1];
        let day = String(date_list[2]).length < 1? "0" + date_list[2]:date_list[2];
        return `${year}-${month}-${day}`;
    }
    else{
        return null;
    }

}

function get_url_arg_dict(arg_url){
    // 从url分析参数,返回参数字典.
    let args = {};
    let url = typeof(arg_url) === "undefined"? location.href: arg_url;
    if(url.indexOf("?") !== -1){
        let arg_str = url.split("?")[1];
        arg_str = decodeURIComponent(arg_str);
        console.log(arg_str);
        let a_list = arg_str.split("&");
        for(var item of a_list){
            if(item.indexOf("=") !== -1){
                let temp = item.split("=");
                let k = temp[0];
                let v = temp[1];
                args[k] = v;

            }else{}
        }
    }
    else{
        // pass
    }
    return args;
}

function get_url_arg(arg_name){
    // 根据arg_name,从url取对应的参数值,本函数依赖get_url_arg_dict函数,是前者的扩展之一
    if(arg_name === undefined || arg_name === ""){
        return undefined;
    }
    else{
        return get_url_arg_dict()[arg_name];
    }
}

function build_url(base_path, arg_dict){
    // 根据基础url和参数字典拼接url,
    base_path += "?";
    for(let name in arg_dict){
        let val = arg_dict[name];
        console.log(name, val);
        base_path += `${name}=${val}&`;
    }
    if(base_path.endsWith("?")){
        base_path = base_path.slice(0, -1);
    }
    if(base_path.endsWith("&")){
        base_path = base_path.slice(0, -1);
    }
    return base_path;
}
