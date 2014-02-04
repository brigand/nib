/** @jsx React.DOM */
var DownloadLink = React.createClass({
    componentDidMount: function(el){
        if (this.props.download) {
            el.download = this.props.download;
        }
    },
    componentDidUpdate: function(_1, _2, el){
        el.download = this.props.download;
    },
    render: function() {
        return this.transferPropsTo(
            <a>{this.props.children}</a>
        );
    }
});

module.exports = DownloadLink;

