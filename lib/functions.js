module.exports = {
    /**
     * Higher-order function that creates the .parent method available
     * on all components
     *
     * @private
     * @method parentFunction
     * @param {Element|Component|View} parent
     * @return {Function(name)}
     */
    parentFunction: function(parent) {
        'use strict';

        return function(name) {
            if (!parent) {
                return undefined;
            }
            if (!name) {
                return parent;
            }
            if (parent.$name === name) {
                return parent;
            }
            if (!parent.getParent) {
                return undefined;
            }
            return parent.getParent(name);
        };
    },

    randomStringOfLen: function(count) {
        'use strict';

        var str = Math.random().toString(36).substr(2);
        while (str.length < count) {
            str += Math.random().toString(36).substr(2);
        }
        if (str.length > count) {
            str.substr(0, count);
        }
        return str;
    }
};