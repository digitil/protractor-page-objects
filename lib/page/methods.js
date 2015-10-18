var querystring = require('querystring');

exports.getPathTo = function (pathOrRequest, request) {
    var path = this.path;
    var queryParams = this.getQueryParams();
    var params;

    if ('string' == typeof pathOrRequest) {
        if (request && 'object' == typeof request) {
            params = joinQueryStrings(queryParams, querystring.stringify(request));
            path = [this.$path, pathOrRequest].join('/') + params;
        } else {
            path = [this.$path, pathOrRequest].join('/') + queryParams;
        }
    } else if ('object' == typeof pathOrRequest) {
        params = joinQueryStrings(queryParams, querystring.stringify(pathOrRequest));
        path = this.$path + params;
    }

    return path;
}

// @method joinQueryStrings
// @param {String} qs1
// @param {String} qs2
// @return {String}
function joinQueryStrings(qs1, qs2) {
    'use strict';

    qs1 = qs1.replace(/(^\?)/,'').replace(/(^\&)/,'');
    qs2 = qs2.replace(/(^\?)/,'').replace(/(^\&)/,'');
    return qs1 ? ( '?' + [qs1, qs2].join('&') ) : ( '?' + qs2 );
}

exports.static = function (scope) {
    for (var name in exports) {
        scope[name] = exports[name];
    }
};