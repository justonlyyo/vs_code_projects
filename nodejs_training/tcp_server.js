var net = require("net");
var count = 0;
var server = net.createServer(function(conn) {
    count += 1;
    console.log((new Date()).toLocaleString() + ",No" + count + " new connection!");
    conn.write("welcome you!\n");
    setTimeout(function() {
        conn.write("byebye!\n", function() {
            conn.destroy();
            console.log("客户端已断开!");
        });
    }, 30000);
    conn.on("data", function(data) {
        console.log(data);
    });
    conn.on("close", function(ev) {
        console.log(ev);
    });
});

server.listen(3000, function() {
    console.log("服务器开始工作于3000端口....");
});