/** @jsx React.DOM */

var Nav = require("./nav.jsx");
var Home = require("./home.jsx");
var Listing = require("./listing.jsx");
var Item = require("./item.jsx");
var api = require('api');

function getType(x){
    return Object.prototype.toString.call(x).slice(8, -1);
};

var Application = React.createClass({
    getInitialState: function() {
        return {component: 'Home', ready: false};
    },
    isReady: function(callback){
        this.setState({ready: true}, callback);
    },
    showHome: function(name){
        console.log("showHome")
        this.setState({component: 'Home'});
    },
    showOne: function(name){
        var item = api.getItem(name);
        this.assert(item) && this.setState({
            component: "Item",
            item: item
        });
    },
    showCategories: function(name){
        this.setState({component: 'Categories'});
    },
    showAll: function(){
        var items = api.getItems();
        this.assert(items) && this.setState({component: 'Listing', items: items});
    },
    assert: function(x){
        var type = getType(x);
        if (!x) {
            return this.show404();
        }
        if ((type === "Array" || type === "String") && x.length === 0) {
            return this.show404();
        }
        if (Object.keys(x).length === 0) {
            return this.show404();
        }


        return true;
    },
    show404: function(){
        this.setState({component: '404'});
    },
    render: function() {
        var self = this;
        var getCurrentComponent = function(){
            if (self.state.component === 'Home') {
                return (<Home />);
            }
            else if (self.state.component === "Listing") {
                console.log("is listing")
                return (<Listing items={self.state.items} />);
            }
            else if (self.state.component === "Item") {
                return (<Item data={self.state.item} />)
            }
            else {
                return (<h1>Page could not be found.  Try one of the menu items above.</h1>);
            }
        };

        return (
            <div>
                <h2>JS Nibbles</h2>
                <Nav />
                {this.state.ready ? getCurrentComponent() : <h3>Loading...</h3>}
            </div>
        );
    }
});

module.exports = Application;

