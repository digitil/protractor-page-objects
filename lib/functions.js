module.exports = {
    /**
     * @method objectToQueryStr
     * @param {Object} object
     * @return {String}
     */
    objectToQueryStr: function(object) {
        var params = [], key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                params.push([key, '=', object[key]].join(''));
            }
        }
        return params.join('&');
    },

    /**
     * @method joinQueryStrings
     * @param {String} qs1
     * @param {String} qs2
     * @return {String}
     */
    joinQueryStrings: function(qs1, qs2) {
        qs1 = qs1.replace(/(^\?)/,'').replace(/(^\&)/,'');
        qs2 = qs2.replace(/(^\?)/,'').replace(/(^\&)/,'');
        if (!qs1) {
            return '?' + qs2;
        }
        return '?' + [qs1, qs2].join('&');
    },

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
        return function(name) {
            if (!parent) {
                return undefined;
            }
            if (!name) {
                return parent;
            }
            if (parent.getName() === name) {
                return parent;
            }
            if (!parent.getParent) {
                return undefined;
            }
            return parent.getParent(name);
        };
    },

    /**
     * Does not affect original function
     *
     * @method changeMethodContext
     * @param {Function|Object} context
     * @param {String} methodName
     * @param {Function} method
     */
    getMethodWithContext: function(context, fn) {
        return function() {
            var args = arguments;
            // Performance optimization: http://jsperf.com/apply-vs-call-vs-invoke
            switch (args.length) {
                case  0: return fn.call(context);
                case  1: return fn.call(context, args[0]);
                case  2: return fn.call(context, args[0], args[1]);
                case  3: return fn.call(context, args[0], args[1], args[2]);
                case  4: return fn.call(context, args[0], args[1], args[2], args[3]);
                case  5: return fn.call(context, args[0], args[1], args[2], args[3], args[4]);
                default: return fn.apply(context, args);
            }
        };
    },

    /**
     * @private
     * @method fireEvent
     * @param {DOMElement} element
     * @param {String} eventName
     */
    fireEvent: function(element, eventName) {
        var event;
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = eventName;
        }

        event.eventName = eventName;
        event.memo = {};

        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
            element.fireEvent("on" + event.eventType, event);
        }
    },

    randomStringOfLen: function(count) {
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