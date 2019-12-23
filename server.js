// const http = require('http');
// const fs = require('fs');
// const path = require('path');
//
// const port = process.env.PORT || 3000;
//
// const server = http.createServer(function (request, response) {
//     console.log('request ', request.url);
//
//     let filePath = './src' + request.url;
//     if (filePath == './src') {
//         filePath = './src/index.html';
//     }
//
//     const extname = String(path.extname(filePath)).toLowerCase();
//     let contentType = 'text/html';
//     const mimeTypes = {
//         '.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         '.json': 'application/json',
//         '.png': 'image/png',
//         '.jpg': 'image/jpg',
//         '.gif': 'image/gif',
//         '.wav': 'audio/wav',
//         '.mp4': 'video/mp4',
//         '.woff': 'application/font-woff',
//         '.ttf': 'application/font-ttf',
//         '.eot': 'application/vnd.ms-fontobject',
//         '.otf': 'application/font-otf',
//         '.svg': 'application/image/svg+xml'
//     };
//
//     contentType = mimeTypes[extname] || 'application/octet-stream';
//
//     fs.readFile(filePath, function(error, content) {
//         if (error) {
//             console.log('error', error);
//             if(error.code == 'ENOENT'){
//                 response.writeHead(404, { 'Content-Type': contentType });
//                 response.end();
//             }
//             else {
//                 response.writeHead(500);
//                 response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
//                 response.end();
//             }
//         }
//         else {
//             response.writeHead(200, { 'Content-Type': contentType });
//             response.end(content, 'utf-8');
//         }
//     });
//
// });
//
// server.listen(port);
// console.log(`server started on ${port} port`);
// server.js
// Для начала установим зависимости.
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "./src/index.html" + q.pathname;
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);