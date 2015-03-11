requirejs.config({
    deps: ['main'],
    
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    
    map: {
        '*': {
            'jquery': 'jquery-loader'
        },
        'jquery-loader': {
            'jquery': 'jquery'
        }
    },
    
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        Backbone: '/node_modules/backbone/backbone',
        jquery: '/node_modules/jquery/dist/jquery',
        underscore: '/node_modules/backbone/node_modules/underscore/underscore'
    }
});