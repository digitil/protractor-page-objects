'use strict';

const querystring = require('querystring');

exports.getPathTo = function (pathOrRequest, request) {
    let { path } = this.$;
    const query = this.$.params ? `?${querystring.stringify(this.$.params)}` : '';
    let params;

    if (typeof pathOrRequest === 'string') {
        if (request && typeof request === 'object') {
            params = joinQueryStrings(query, querystring.stringify(request));
            path = [this.$.path, pathOrRequest].join('/') + params;
        } else {
            path = [this.$.path, pathOrRequest].join('/') + query;
        }
    } else if (typeof pathOrRequest === 'object') {
        params = joinQueryStrings(query, querystring.stringify(pathOrRequest));
        path = this.$.path + params;
    }

    return path;
};

/**
 * @ignore
 * @method joinQueryStrings
 *
 * @param {String} qs1
 * @param {String} qs2
 * @return {String}
 */
function joinQueryStrings(qs1, qs2) {
    const strip = string => string.replace(/(^\?)/, '').replace(/(^\&)/, '');

    qs1 = strip(qs1);
    qs2 = strip(qs2);
    const joined = [qs1, qs2].join('&');
    return qs1 ? `?${joined}` : `?${qs2}`;
}

exports.static = function (scope) {
    for (let name in exports) {
        scope[name] = exports[name];
    }
};
