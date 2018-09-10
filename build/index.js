#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_class_1 = require("./http.class");
var program = require('commander');
var http = new http_class_1.HttpLibrary();
function collect(val, memo) {
    memo.push(val);
    return memo;
}
// Help command
program
    .command('help [cmd]')
    .description('get help for general usage or a specific command.')
    .action(function (cmd) {
    if (cmd === undefined || cmd === null) {
        console.log('');
        console.log('httpc is a curl-like application, but supports HTTP protocol only.');
        console.log('Usage:');
        console.log('    httpc [command] [arguments]');
        console.log('The commands are:');
        console.log('    get     executes a HTTP GET request and prints the response.');
        console.log('    post    executes a HTTP POST request and prints the response.');
        console.log('    help    prints this screen.');
        console.log('');
        console.log('Use httpc help [command] for more information about a command.');
    }
    else if (cmd === 'get' || cmd === 'GET') {
        console.log('');
        console.log('Usage: httpc get [-v] [-h key:value] [url]');
        console.log('Get executes a HTTP GET request for a given url.');
        console.log('    -v              Prints the detail of the response such as protocol, status and headers.');
        console.log('    -h key:value    Associates headers to the request with the specified format.');
    }
    else if (cmd === 'post' || cmd === 'POST') {
        console.log('');
        console.log('Usage: httpc post [-v] [-h key:value] [-d inline-data] [-f file] [url]');
        console.log('Get executes a HTTP POST request for a given url.');
        console.log('    -v              Prints the detail of the response such as protocol, status and headers.');
        console.log('    -h key:value    Associates headers to the request with the specified format.');
        console.log('    -d string       Associates an inline data to the body of the request.');
        console.log('    -f file         Associates the content of a file to the body of the request.');
        console.log('Either [-d] or [-f] can be used, but not both.');
    }
    else if (cmd === 'help' || cmd === 'HELP') {
        console.log('');
        console.log('Used to gain information about the application.');
    }
    else {
        console.log('');
        console.log('Command not found.');
    }
});
// Get command
program
    .command('get <host>')
    .description('command to initiate a get request.')
    .option('-v, --verbose', 'Defines verbosity.')
    .option('-h, --header <header>', 'Request headers.', collect, [])
    .action(function (host, options) {
    var verbose = program.rawArgs.includes('-v');
    http.get(verbose, options.header, host);
});
// Post command
program
    .command('post <host>')
    .description('command to initiate a post request.')
    .option('-v, --verbose', 'Defines verbosity.')
    .option('-f, --file <file>', 'Defines verbosity.')
    .option('-d, --data <data>', 'Defines verbosity.')
    .option('-h, --header <header>', 'Request headers.', collect, [])
    .action(function (host, options) {
    var verbose = program.rawArgs.includes('-v');
    if (options.file && options.data) {
        console.log('');
        console.log('Cannot use both -f and -d for a POST request.');
    }
    else {
        http.post(verbose, options.header, host, options.file, options.data);
    }
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map