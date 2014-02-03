/** @jsx React.DOM */
var Nav = React.createClass({
    getInitialState: function() {
        var makePage = function(name, route){
            return {
                name: name,
                route: route,
                key: name
            };
        };

        return {
            pages: [
                makePage('Home', ''),
                makePage('All', 'all'),
                makePage('Categories', 'categories')
            ]
        };
    },
    render: function() {
        var createLink = function(page){
            return (
                <li>
                    <a href={'/#/' + page.route}>{page.name}</a>
                </li>
                );
        };

        return (
            <nav className="top-bar">
                <section className="top-bar-section">
                    <ul className="left">
                        {this.state.pages.map(createLink)}
                    </ul>
                </section>
            </nav>
        );
    }
});

module.exports = Nav;

