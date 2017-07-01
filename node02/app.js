var http = require('http');
var modules = require('./modules');

function onRequest(req, res) {
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.write(modules.myVariable);
    modules.myFunction();
    res.end();
}

http.createServer(onRequest).listen(8000);
console.log('Server is running on port 8000');