/** @jsx React.DOM */

var Nav = require("./nav.jsx");
var Home = require("./home.jsx");
var Listing = require("./listing.jsx");
var Item = require("./item.jsx");
var Categories = require("./categories.jsx");
var Bundle = require("./bundle/bundle.jsx");
var Download = require("./download.jsx");
var api = require('api');
var bundleStore = require("./bundle/bundleStore");

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
        this.setState({component: 'Home', item: null, items: null});
    },
    showOne: function(category, name){
        var item = api.getItem(name);
        this.assert(item) && this.setState({
            component: "Item",
            item: item,
            items: null
        });
    },
    showCategories: function(name){
        this.setState({component: 'Categories', items: api.getCategories()});
    },
    showAll: function(category){
        var items = api.getItems();

        if (category) {
            items = items.filter(function(x){
                return x.category.toLowerCase() === category;
            });
        }

        this.assert(items) && this.setState({
            component: 'Listing', 
            items: items,
            item: null
        });
    },
    showDownload: function(){
        this.setState({component: "Download"});
    },
    assert: function(x){
        var type = getType(x);
        console.log(type, x);   
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
            else if (self.state.component === "Categories") {
                return (<Categories items={self.state.items} />)
            }
            else if (self.state.component === "Download") {
                return (<Download items={this.refs.bundle.state.items} />)
            }
            else {
                return (<h1>Page could not be found.  Try one of the menu items above.</h1>)
            }
        };

        var download = function(){
            return (<Download />);
        }

        var body = function(){
            return [<div className="small-9 columns">
                {this.state.ready ? getCurrentComponent() : <h3>Loading...</h3>}
            </div>,
            <div className="small-3 columns">
                <Bundle item={self.state.component === "Item" ? this.state.item : null} />
            </div>]
        }.bind(this);

        return (
            <div>
                <h2>JS Nibbles</h2>
                <Nav />
                <div className="row">
                    {this.state.component === "Download" ? download() : body()}
                </div>
            </div>
        );
    }
});

module.exports = Application;
