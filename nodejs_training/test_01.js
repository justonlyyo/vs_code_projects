var start = Date.now();
setTimeout(function() {
    console.log(Date.now() - start);
    for (var i = 0; i < 100 * 100; i++) {

    }
}, 1000);
setTimeout(function() {
    console.log(Date.now() - start);
}, 2000);
var index = require("./some_package/index")
index.hello();