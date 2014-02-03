/** @jsx React.DOM */

// JavaScript syntax highlighter
var JavaScript = React.createClass({
    render: function() {
        var spanner = function(className){
            return function(code){
                return (<span className={className}>{code}</span>);
            }
        };

        var classes = this.props.classes || {};
        var mapping = {
            fn: spanner(classes.fn || "js-fn"),
            string: spanner(classes.string || "js-string"),
            number: spanner(classes.number || "js-number"),
            comment: spanner(classes.comment || "js-comment"),
            keyword: spanner(classes.keyword || "js-keyword"),
            op: spanner(classes.op || "js-op"),
            regexp: spanner(classes.op || "js-regexp")
        };

        var lex = miniLex(this.props.code);

        var match = function(part){
            if (typeof part === "string") {
                return part.length ? (<span>{part}</span>) : false;
            }
            else if (mapping[part.name] == null) {
                return (<span>{part.text}</span>)
            }
            else {
                return mapping[part.name](part.text);
            }
        };

        return (
            <pre className={this.props.className || ""}>
                {lex.map(match)}
            </pre>
        );
    }
});

function miniLex(code){
    var kinds = [
        {
            name: "comment",
            exp: /\/\/.+/g
        },
        {
            name: "regexp",
            exp: /\/(?!\s)(?:\\\/|[^\/])*\/[gim]{0,3}/g
        },
        {
            name: "string",
            exp: /(["'])(\\\1|[^\1])*?\1/g
        },

        {
            name: "fn",
            exp: /\b(?!function)[$_A-Za-z][$_A-Za-z0-9]+(?=\()/g
        },

        // function call
        {
            name: "keyword",
            exp: /\b(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/g
        },

        {
            name: "number",
            exp: /\b(?:0x)?(?=\d|\.\d)[0-9]*(?:\.[0-9]*)?(?:[eE][0-9]+)?\b/g
        },
        {
            name: "op",
            exp: /[=\-+*\(\)\/^!%~,;?:.|<>{}\[\]&]+/g
        }
    ];

    function isArray(x){
        return Object.prototype.toString.call(x).slice(8, -1) === "Array";
    }

    function flatten(xs) {
      xs = Array.prototype.concat.apply([], xs);
      return xs.some(isArray) ? flatten(xs) : xs;
    }

    // [7, 8, 9], [1, 2] -> [7, 1, 8, 2, 9]
    function weave(as, bs) {
        var out = [], flip = false;
        for (var i=0; i< as.length; i++) {
            out.push(as[i]);

            if (i < bs.length) {
                out.push(bs[i]);
            }
        }
        return out;
    }

    var buffer = [code];
    for (var i=0; i<kinds.length; i++){
        var kind = kinds[i];

        buffer = flatten(buffer.map(function(part){
            if (typeof part === "string") {
                var matches = part.match(kind.exp);
                var parts = part.split(kind.exp);

                // String::split includes groups for some weird reason
                if (kind.name === "string"){
                    var badParts = parts.length / 4;
                    for (var i=0; i<badParts; i++)
                    parts.splice(i+1, 2);
                }

                if (matches) {
                    return weave(parts, matches.map(function(x){
                        return {
                            name: kind.name,
                            text: x
                        };
                    }));
                }
            }

            return part;
        }));
    }

    return buffer;
};

module.exports = JavaScript;