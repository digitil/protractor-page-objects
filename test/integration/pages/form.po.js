module.exports = {
    $name: 'Form',
    $locator: '[ng-view]',
    $path: '#/form',
    $components: [
        {
            $name: 'sliderBar',
            $locator: by.name('points')
        },
        {
            $name: 'alertButton',
            $locator: by.id('alertbutton')
        },
        {
            $name: 'username',
            $locator: by.model('username')
        }
    ]
};