/** @jsx React.DOM */
var JavaScriptPre = require("../common/javascript.jsx");

var Item = React.createClass({
    render: function() {
        var makeItem = function(props) {
            return (
                <div>
                    <h1 className="f-mono">
                        <span className="c-pink">{props.data.name}</span>
                        <span> - </span>
                        <span className="smaller">{props.data.description}</span></h1>
                    <hr />

                    <h2>The Code</h2>
                    <pre className="c-blue">{props.data.types}</pre>
                    <JavaScriptPre code={props.data.function} className="js-pre" />

                    <h2>Examples</h2>
                    <JavaScriptPre code={props.data.examples} className="js-pre" />
                </div>
            )
        };

        console.log(this.props.data);

        return this.props.data ? makeItem(this.props) : (<h1>Loading</h1>);
    }
});

module.exports = Item;

