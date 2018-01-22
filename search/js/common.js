/*扩展字符串的方法,增加startsWith和endsWith两个方法(并非所有的浏览器都有这两个方法) */
if (typeof(String.prototype.startsWith !== "functin")) {
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

if (typeof(String.prototype.endsWith !== "functin")) {
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
