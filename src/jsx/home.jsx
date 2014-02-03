/** @jsx React.DOM */

var Home = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        var link = function(name){
            var urls = {
                All: "#/all",
                Categories: "#/categories",
                "GitHub repo": "http://github.com/brigand/nib"
            };

            return (<a href={urls[name]}>{name}</a>);
        };

        return (
            <div>
                <h2>How to use this site</h2>
                <ul>
                    <li>Click {link("All")} or {link("Categories")} to find some snippets</li>
                    <li>Add them to your Bundle (on the right)</li>
                    <li>Click the download button, and either <span className="f-mono">require</span> the module,
                    or include it with a <span className="f-mono">{"<script>"}</span> tag</li>
                </ul>

                <hr />

                <h2>Contribute</h2>
                <div>Go to the {link("GitHub repo")} if you want to help out.  
                Everything is explained in the README.  New code, bug reports, etc. are all helpful!</div>

                <hr />

                <h2>Legal</h2>

                <div>All code is MIT licensed, so you can use it for any purpose, including commercial.
                If you keep the comment at the top of the downloaded file intact, you are all set!</div>
            </div>
        );
    }
});

module.exports = Home;

