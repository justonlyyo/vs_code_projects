var http = require("http"); // http server
var serve = require("./node_modules/serve-static"); // 静态文件中间件
var connect = require("./node_modules/connect"); // connect框架
var morgan = require("./node_modules/morgan"); // 日志中间件
// 自定义日志记录器
var logger = morgan(function(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
});


var app = connect();


// 日志中间件
app.use(logger);
// 静态图片文件中间件
app.use("/image", serve("./web_site/image", {
    "index": ["1.png", "1.jpg"], // 定义默认索引
    "maxAge": 1000 * 60 * 60 * 24 * 365, // 最大缓存时间
}));
app.use("/", serve("./web_site/html", {
    "index": ["index.html", "index.htm"], // 定义默认索引
    "maxAge": 1000,
}));


app.use(function(req, res, next) {
    var temp = req.url.split("?");
    var path = temp[0];
    var arg_str = temp[1];
    if ("/upload" == path && req.method.toLowerCase() == "post") {
        console.log(req);
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    res.write(404, { "content-type": "text/html" });
    res.end("<p style='font-size:512px'>404</p>");
});

http.createServer(app).listen(3000, function() {
    console.log("server running on 3000 port!");
});