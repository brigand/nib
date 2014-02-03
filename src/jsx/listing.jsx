/** @jsx React.DOM */
var Listing = React.createClass({
    render: function() {
        var makeItem = function(item) {
            return (
                <a className="panel" href={'/#/x/' + item.name}>
                    <h3 className="f-mono">
                        <span className="c-pink">{item.name}</span> - 
                        <span className="smaller">{item.types}</span></h3>
                    <p>{item.description}</p>
                </a>
            )
        };

        return (
            <div>
                {this.props.items.map(makeItem)}
            </div>
        );
    }
});

module.exports = Listing;

