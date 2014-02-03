/** @jsx React.DOM */
var Listing = React.createClass({
    getInitialState: function() {
        return {filterText: ""};
    },
    filter: function(x){
        var s = this.state.filterText;

        return (x.name.toLowerCase().indexOf(s) !== -1)
             || (x.description.indexOf(s) !== -1)
             || (x.function.indexOf(s) !== -1)
             || (x.examples.indexOf(s) !== -1);
    },
    sort: function(a, b){
        var s = this.state.filterText;

        var score = function(x){
            return (x.name.toLowerCase().indexOf(s) !== -1) * 100
                 + (x.description.indexOf(s) !== -1) * 10
                 + (x.function.indexOf(s) !== -1) * 2
                 + (x.examples.indexOf(s) !== -1) * 1;
        }

        return score(a) - score(b);
    },
    filterChanged: function(event) {
        this.setState({filterText: event.target.value});
    },
    render: function() {
        var makeItem = function(item) {
            return (
                <a className="panel" href={'#/x/' + item.category + '/' + item.name.toLowerCase()}>
                    <h3 className="f-mono">
                        <span className="c-pink">{item.name}</span> - 
                        <span className="smaller">{item.types}</span></h3>
                    <p>{item.description}</p>
                </a>
            )
        };

        function id(x){ return x; }

        return (
            <div>
                <input value={this.state.filterText}  onChange={this.filterChanged}
                    type="text" placeholder="filter" autoFocus />
                {this.props.items.filter(this.filter).map(id).sort(this.sort).map(makeItem)}
            </div>
        );
    }
});

module.exports = Listing;

