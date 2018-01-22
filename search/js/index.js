$(function() {
    
    /*提交搜索的关键字,注意经过了encodeURI编码 */
    function submit_keyword(arg_dict) {
        var url = "search.html?";
        var keys = Object.keys(arg_dict);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var val = arg_dict[key];
            if (url.endsWith("?")) {
                url += key + "=" + val;
            } else {
                url += "&" + key + "=" + val;
            }
        }
        url = encodeURI(url);
        location.href = url;
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

    /*按钮组的按下事件 */
    $(".btn_group_outer button").each(function() {
        var $this = $(this);
        $this.click(function() {
            var keyword = $.trim($("#keyword").val());
            if (keyword !== "") {
                var type = $.trim($this.attr("data-type"));
                submit_keyword({ "keyword": keyword, "type": type });
            }
        });
    });

    // end!!    
});