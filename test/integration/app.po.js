var PageObjects = require('../../index');

var app = new PageObjects([
    {
        $name: 'Page',
        $path: '#/',
        $views: [
            require('./pages/form.po'),
            require('./pages/repeater.po')
        ],
        $components: [
            {
                $name: 'repeaterLink',
                $locator: by.linkText('repeater')
            }
        ]
    }
]);

module.exports = app;
