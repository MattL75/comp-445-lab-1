import { createReadStream, ReadStream } from 'fs';

const fetch = require('node-fetch');
const fs = require('fs');

export class HttpLibrary {

    public get(verbose: boolean, headers: string[], url: string): void {

        // Parse the headers into a json object
        let headerObj = {};
        for (let i = 0; i < headers.length; ++i) {
            let temp = headers[i].split(':');
            headerObj[temp[0]] = temp[1];
        }

        // Perform the request
        fetch(url, {
            method: 'GET',
            headers: headerObj
        }).then(response => {
            response.json().then(json => {
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
                } else {
                    console.log(JSON.stringify(json, null, 4));
                }
            });
        });
    }

    public post(verbose: boolean, headers: string[], url: string, file?: string, data?: string | ReadStream): void {

        // Parse the headers into a json object
        let headerObj = {};
        for (let i = 0; i < headers.length; ++i) {
            let temp = headers[i].split(':');
            headerObj[temp[0]] = temp[1];
        }

        // File or data
        if (file) {
            data = createReadStream(file);
        }

        // Perform the request
        fetch(url, {
            method: 'POST',
            headers: headerObj,
            body: data
        }).then(response => {
            response.json().then(json => {
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
                } else {
                    console.log(JSON.stringify(json, null, 4));
                }
            });
        });
    }
}
