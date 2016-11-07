'use strict';

const querystring = require('querystring');

exports.getPathTo = function (routeParams, queryParams) {
    let { path } = this.$;
    let segment;

    for (segment in routeParams) {
        if (routeParams.hasOwnProperty(segment)) {
            path = path.replace(':'.concat(segment), routeParams[segment]);
        }
    }

    if (queryParams) {
        path = `${path}?${querystring.stringify(queryParams)}`;
    }

    return path;
};

exports.static = function (scope) {
    for (let name in exports) {
        scope[name] = exports[name];
    }
};
