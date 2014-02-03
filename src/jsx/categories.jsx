/** @jsx React.DOM */

var Categories = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        var cats = this.props.items, groups = [], buf = [];

        for (var i=0; i<cats.length; i++) {
            if (i % 3 === 0) {
                buf = [];
                groups.push(buf);
            }

            buf[i % 3] = cats[i];
        };

        var makeRow = function(row){
            return (<div className="row">{row.map(makeCategory)}</div>);
        };

        var makeCategory = function(category){
            return (
                <h2 className="small-6 large-4 columns">
                    <a href={'#/x/' + category} className="">{category}</a>
                </h2>
            );
        };

        return (
            <div>
                {groups.map(makeRow)}
            </div>
        );
    }
});

module.exports = Categories;

