"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var net = require('net');
var URL = require('url').URL;
var HttpLibrary = /** @class */ (function () {
    function HttpLibrary() {
    }
    HttpLibrary.prototype.get = function (verbose, headers, hostStr) {
        // Create connection
        var urlObj = new URL(hostStr);
        var socket = net.createConnection(80, urlObj.hostname);
        // Parse headers into a string
        var headerObj = '';
        for (var i = 0; i < headers.length; ++i) {
            headerObj = headerObj + headers[i];
            if (i + 1 < headers.length) {
                headerObj = headerObj + '\r\n';
            }
        }
        // Overwrite host/connection headers
        var requestLine = 'GET ' + hostStr + ' HTTP/1.1\r\n' +
            'Host: ' + urlObj.hostname + '\r\n' +
            'Connection: close\r\n' +
            headerObj + '\r\n\r\n';
        // Socket listeners
        socket.on('data', function (data) {
            console.log('');
            console.log(verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
        }).on('connect', function () {
            socket.write(requestLine);
        }).on('end', function () {
            socket.destroy();
        }).on('error', function (error) {
            console.log('Error : ' + error);
        });
    };
    HttpLibrary.prototype.post = function (verbose, headers, hostStr, file, data) {
        if (data === void 0) { data = ''; }
        // Create connection
        var urlObj = new URL(hostStr);
        var socket = net.createConnection(80, urlObj.hostname);
        // Parse headers into a string
        var headerObj = '';
        for (var i = 0; i < headers.length; ++i) {
            headerObj = headerObj + headers[i];
            if (i + 1 < headers.length) {
                headerObj = headerObj + '\r\n';
            }
        }
        // Parse file if exists
        if (file) {
            data = fs.readFileSync(file, "utf8");
        }
        // Overwrite host/connection headers
        var requestLine = 'POST ' + hostStr + ' HTTP/1.1\r\n' +
            'Host: ' + urlObj.hostname + '\r\n' +
            'Connection: close\r\n' +
            'Content-Length: ' + data.length + '\r\n' +
            headerObj + '\r\n\r\n' + data;
        // Socket listeners
        socket.on('data', function (data) {
            console.log('');
            console.log(verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
        }).on('connect', function () {
            socket.write(requestLine);
        }).on('end', function () {
            socket.destroy();
        }).on('error', function (error) {
            console.log('Error : ' + error);
        });
    };
    return HttpLibrary;
}());
exports.HttpLibrary = HttpLibrary;
//# sourceMappingURL=http.class.js.map