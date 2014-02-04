/** @jsx React.DOM */

var bundleStore = require("./bundle/bundleStore");
var Bundle = require("./bundle/bundle.jsx");
var JavaScriptPre = require("../common/javascript.jsx");

var Home = React.createClass({
    getInitialState: function() {
        return {code: ""};
    },
    getHref: function(){
        // unsafe nasty stuff
        var blob = new Blob([this.state.code], {
            type: "application/javascript" 
        });
        
        var createURL = URL.createObjectURL || URL.webkitCreateObjectURL;

        var url = createURL(blob);

        this.clearPreviousURL = function(){
            var revokeURL = URL.revokeObjectURL || URL.webkitRevokeObjectURL;
            if (url) {
                revokeURL(url);
            }
            url = null;
        };

        return url;
    },
    clearPreviousURL: function(){},
    componentWillUnmount: function(){
        this.clearPreviousURL();
        this.setState({_objectURL: null})
    },
    update: function(items){
        this.setState({
            code: bundleStore.getJS(items)
        });
    },
    render: function() {
        return (

            <div>
                <div className="small-9 columns">
                    <a href={this.getHref(this.state.code)} 
                        className="fluid button"
                        download="nib.js">Save Bundle to File</a>
                    <JavaScriptPre code={this.state.code} className="js-pre" />
                </div>
                <div className="small-3 columns">
                    <Bundle onChange={this.update} />
                </div>
            </div>
        );
    }
});

module.exports = Home;

