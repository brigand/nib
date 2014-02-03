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
    router.param("name", /([\w$_])/);
    router.on('/', MainComponent.showHome);
    router.on('/x/:name', MainComponent.showOne);
    router.on('/all', MainComponent.showAll);
    router.on('/categories', MainComponent.showCategories);

    // dispatch the initial route
    api.load().then(function(){
        console.log("r1")
        MainComponent.isReady(function(){
            console.log("r2")
            router.dispatch("on" ,"/" + router.getRoute().join("/"));
        });
    });
});
