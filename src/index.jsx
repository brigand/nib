/** @jsx React.DOM */

var domready = require('domready');
var api = require('api');

domready(function() {
    var Application = require('./jsx/application.jsx');

    var MainComponent = <Application />;

    React.renderComponent(
        MainComponent,
        document.getElementById('application')
    );

    router = new Router().init();
    router.param("name", /([A-Za-z$_][A-Za-z$_0-9]*)/i);
    router.on('/', MainComponent.showHome);
    router.on('/x/:category/:name', MainComponent.showOne);
    router.on('/x/:category', MainComponent.showAll);
    router.on('/all', MainComponent.showAll);
    router.on('/categories', MainComponent.showCategories);
    router.on('/download', MainComponent.showDownload);

    // dispatch the initial route
    api.load().then(function(){
        MainComponent.isReady(function(){
            router.dispatch("on" ,"/" + router.getRoute().join("/"));
        });
    });
});
