const fs = require('fs');
const net = require('net');
const URL = require('url').URL;

export class HttpLibrary {

    public get(verbose: boolean, headers: string[], hostStr: string): void {

        // Create connection
        let urlObj = new URL(hostStr);
        let socket = net.createConnection(80, urlObj.hostname);

        // Parse headers into a string
        let headerObj = '';
        for (let i = 0; i < headers.length; ++i) {
            headerObj = headerObj + headers[i];
            if (i + 1 < headers.length) {
                headerObj = headerObj + '\r\n';
            }
        }

        // Overwrite host/connection headers
        let requestLine = 'GET ' + hostStr + ' HTTP/1.1\r\n' +
            'Host: ' + urlObj.hostname + '\r\n' +
            'Connection: close\r\n' +
            headerObj + '\r\n\r\n';

        // Socket listeners
        socket.on('data', function(data) {
            console.log('');
            console.log(verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
        }).on('connect', function() {
            socket.write(requestLine);
        }).on('end', function() {
            socket.destroy();
        }).on('error',function(error){
            console.log('Error : ' + error);
        });
    }

    public post(verbose: boolean, headers: string[], hostStr: string, file?: string, data: string = ''): void {

        // Create connection
        let urlObj = new URL(hostStr);
        let socket = net.createConnection(80, urlObj.hostname);

        // Parse headers into a string
        let headerObj = '';
        for (let i = 0; i < headers.length; ++i) {
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
        let requestLine = 'POST ' + hostStr + ' HTTP/1.1\r\n' +
            'Host: ' + urlObj.hostname + '\r\n' +
            'Connection: close\r\n' +
            'Content-Length: ' + data.length + '\r\n' +
            headerObj + '\r\n\r\n' + data;

        // Socket listeners
        socket.on('data', function(data) {
            console.log('');
            console.log(verbose ? data.toString() : data.toString().split('\r\n\r\n')[1]);
        }).on('connect', function() {
            socket.write(requestLine);
        }).on('end', function() {
            socket.destroy();
        }).on('error',function(error){
            console.log('Error : ' + error);
        });
    }
}
