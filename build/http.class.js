"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var fetch = require('node-fetch');
var fs = require('fs');
var HttpLibrary = /** @class */ (function () {
    function HttpLibrary() {
    }
    HttpLibrary.prototype.get = function (verbose, headers, url) {
        // Parse the headers into a json object
        var headerObj = {};
        for (var i = 0; i < headers.length; ++i) {
            var temp = headers[i].split(':');
            headerObj[temp[0]] = temp[1];
        }
        // Perform the request
        fetch(url, {
            method: 'GET',
            headers: headerObj
        }).then(function (response) {
            response.json().then(function (json) {
                if (verbose) {
                    console.log('');
                    console.log('HTTP/' + response.headers.get('via') + ' ' + response.status + ' ' + response.statusText);
                    console.log('Server: ' + response.headers.get('server'));
                    console.log('Date: ' + response.headers.get('date'));
                    console.log('Content-Type: ' + response.headers.get('content-type'));
                    console.log('Content-Length: ' + response.headers.get('content-length'));
                    console.log('Connection: ' + response.headers.get('connection'));
                    console.log('Access-Control-Allow-Origin: ' + response.headers.get('access-control-allow-origin'));
                    console.log('Access-Control-Allow-Credentials: ' + response.headers.get('access-control-allow-credentials'));
                }
                else {
                    console.log(JSON.stringify(json, null, 4));
                }
            });
        });
    };
    HttpLibrary.prototype.post = function (verbose, headers, url, file, data) {
        // Parse the headers into a json object
        var headerObj = {};
        for (var i = 0; i < headers.length; ++i) {
            var temp = headers[i].split(':');
            headerObj[temp[0]] = temp[1];
        }
        // File or data
        if (file) {
            data = fs_1.createReadStream(file);
        }
        // Perform the request
        fetch(url, {
            method: 'POST',
            headers: headerObj,
            body: data
        }).then(function (response) {
            response.json().then(function (json) {
                if (verbose) {
                    console.log('');
                    console.log('HTTP/' + response.headers.get('via') + ' ' + response.status + ' ' + response.statusText);
                    console.log('Server: ' + response.headers.get('server'));
                    console.log('Date: ' + response.headers.get('date'));
                    console.log('Content-Type: ' + response.headers.get('content-type'));
                    console.log('Content-Length: ' + response.headers.get('content-length'));
                    console.log('Connection: ' + response.headers.get('connection'));
                    console.log('Access-Control-Allow-Origin: ' + response.headers.get('access-control-allow-origin'));
                    console.log('Access-Control-Allow-Credentials: ' + response.headers.get('access-control-allow-credentials'));
                }
                else {
                    console.log(JSON.stringify(json, null, 4));
                }
            });
        });
    };
    return HttpLibrary;
}());
exports.HttpLibrary = HttpLibrary;
//# sourceMappingURL=http.class.js.map