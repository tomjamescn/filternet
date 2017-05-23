/**
 * listen on port 5050
 * @type {[type]}
 */
var filternet = require('filternet');

var myProxy = filternet.createProxyServer({
    port: 5050
});


// Whether or not to enable custom intercepting at all.
myProxy.on('shouldEnableInterception', function(callback) {
    console.log('shouldEnableInterception')
    callback(true);
});

// Whether or not we should intercept and buffer the proxy response
// The default is to buffer all HTML responses.
myProxy.on('shouldInterceptResponseContent', function(requestInfo, proxyResponse, callback) {
    console.log('shouldInterceptResponseContent', requestInfo, proxyResponse.headers)
    callback(true);
});

// You can rewrite the request as it's being sent to the remote server.
// (just headers)
myProxy.on('interceptRequest', function(requestInfo, callback) {
    // requestInfo is the same as the arguments to http.request
    console.log('interceptRequest', requestInfo.host, requestInfo.path);
    callback(requestInfo);
});

// You can change response headers
myProxy.on('interceptResponseHeaders', function(requestInfo, statusCode, headers, callback) {
    console.log('interceptResponseHeaders')
    callback(statusCode, headers);
});

// You can alter any response body that you said you want to intercept in "shouldInterceptResponse"
// by default this is all HTML responses if 'enabledCheck' is true (default)
// The response object is the standard node http response object.
myProxy.on('interceptResponseContent', function(buffer, requestInfo, response, isSsl, charset, callback) {
    console.log('interceptResponseContent')
    callback(buffer);
});


myProxy.on('error', function(error, locationInfo) {
    console.log('error')
    console.log(locationInfo);
    console.log(error.stack);
});
