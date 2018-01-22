var http = require("http");
var fs = require("fs");
var query_string = require("querystring");
var requests = require("./node_modules/superagent");


var img_path = "/home/walle/图片/2017-10-31 08-39-52屏幕截图.png";
var server = http.createServer(function(request, response) {
    console.log(request.method);
    var url = request.url;
    var temp = url.split("?");
    var path = temp[0];
    var arg_str = temp[1];
    console.log(path, arg_str);
    console.log(query_string.parse(arg_str));
    if ("/image" == path) {
        response.writeHead(200, {
            "content-type": "image/png"
        });
        var stream = fs.createReadStream(img_path);
        stream.pipe(response);
    } else if ("/baidu" == path) {
        requests.get("https://www.baidu.com").on('data', function(data) { console.log(data); });
    } else {
        response.writeHead(404);
        response.end("page not found!");
    }

});
server.listen(3000, function() {
    console.log("server running on port 3000!");
});