"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var net = require('net');
var URL = require('url').URL;
var HttpLibrary = /** @class */ (function () {
    function HttpLibrary() {
    }
    HttpLibrary.prototype.get = function (verbose, redirect, headers, hostStr, output) {
        var _this = this;
        // Create connection
        var urlObj = new URL(hostStr);
        var socket = net.createConnection(urlObj.port ? urlObj.port : 80, urlObj.hostname);
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
            // Extract status code
            var statusCode = parseInt(data.toString().split('\r\n')[0].match(/^HTTP\/1\.[01] ([0-9]{3}) (.*)$/)[1], 10);
            // Check for redirect
            if (redirect && statusCode < 303 && statusCode > 299) {
                for (var _i = 0, _a = data.toString().split('\r\n').slice(1); _i < _a.length; _i++) {
                    var line = _a[_i];
                    var i = line.indexOf(': ');
                    var k = line.substr(0, i).toLowerCase();
                    var v = line.substr(i + 2);
                    if (k.toLocaleLowerCase() === 'location') {
                        _this.get(verbose, redirect, headers, v, output);
                        return;
                    }
                }
            }
            // Standard output operations
            if (output) {
                fs.writeFileSync(output, verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
                console.log('');
                console.log('Output sent to file: ' + output + '.');
            }
            else {
                console.log('');
                console.log(verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
            }
        }).on('connect', function () {
            socket.write(requestLine);
        }).on('end', function () {
            socket.destroy();
        }).on('error', function (error) {
            console.log('Error : ' + error);
        });
    };
    HttpLibrary.prototype.post = function (verbose, redirect, headers, hostStr, file, data, output) {
        var _this = this;
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
            // Extract status code
            var statusCode = parseInt(data.toString().split('\r\n')[0].match(/^HTTP\/1\.[01] ([0-9]{3}) (.*)$/)[1], 10);
            // Check for redirect
            if (redirect && statusCode < 303 && statusCode > 299) {
                for (var _i = 0, _a = data.toString().split('\r\n').slice(1); _i < _a.length; _i++) {
                    var line = _a[_i];
                    var i = line.indexOf(': ');
                    var k = line.substr(0, i).toLowerCase();
                    var v = line.substr(i + 2);
                    if (k.toLocaleLowerCase() === 'location') {
                        _this.post(verbose, redirect, headers, v, file, data, output);
                        return;
                    }
                }
            }
            // Standard output operations
            if (output) {
                fs.writeFileSync(output, verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
                console.log('');
                console.log('Output sent to file: ' + output + '.');
            }
            else {
                console.log('');
                console.log(verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
            }
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