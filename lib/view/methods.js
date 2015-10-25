var querystring = require('querystring');

exports.getPathTo = function (routeParams, queryParams) {
    var path = this.$path;
    var segment;

    for (segment in routeParams) {
        if (routeParams.hasOwnProperty(segment)) {
            path = path.replace(':'.concat(segment), routeParams[segment]);
        }
    }

    if (queryParams) {
        path =  path + '?' + querystring.stringify(queryParams);
    }

    return path;
}

exports.static = function (scope) {
    for (var name in exports) {
        scope[name] = exports[name];
    }
};