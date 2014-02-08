var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var Path = require("path");

function flatten(a, b) {
    return a.concat(b);
}

function directoryOrFile(pathAndStat) {
    if ( pathAndStat[1].isDirectory() ) {
        return readDir(pathAndStat[0]);
    }
    return pathAndStat[0];
}

function readDir(dirName) {
    return fs.readdirAsync(dirName).map(function (item) {
        var path = Path.join(dirName, item);
        //The stat result will not contain the path info
        //so we need to propagate it manually
        return Promise.join(path, fs.statAsync(path));
    }).map(directoryOrFile).reduce(flatten, []);
}

function readFile(filepath) {
    "use strict";

    return fs.readFileAsync(filepath);
}

function startsWith(str, needle) {
    "use strict";
    return str.indexOf(needle) === 0;
}

module.exports = function () {
    "use strict";
    var done = this.async();

    var processed = readDir("data").then(function (paths) {
            var fileTest = /.*?data\/(.*)\.js$/;
            var descriptions = paths.filter(function (path) {
                    return path && fileTest.test(path);
                });


            return Promise.map(descriptions, function (path) {
                var parts = path.match(fileTest)[1].split('/');

                var props = {
                    path: path,
                    category: parts[0],
                    name: parts[1]
                };

                return readFile(path).then(function (contents) {
                    return String(contents).split("\n");

                // description and type definition
                }).then(function (lines) {
                        var leadingComments = [];
                        for ( var i = 0; i < lines.length; i++ ) {
                            var line = lines[i];
                            if ( startsWith(line, "//") ) {
                                leadingComments.push(line.slice(2).trim());
                            }
                            // non blank line
                            else if ( line.trim() ) {
                                break;
                            }
                        }

                        props.description = leadingComments.slice(0, -1).join("\n");
                        props.types = leadingComments.slice(-1)[0];

                        return lines.slice(i);
                    // the actual function
                    }).then(function (lines) {

                        var functionLines = [];
                        var closed = false;
                        var emptyAfterClose = 0;

                        for ( var i = 0; i < lines.length && emptyAfterClose < 2; i++ ) {
                            var line = lines[i];
                            functionLines.push(line);

                            if ( startsWith(line, "}") ) {
                                closed = true;
                            }
                            if (closed) {
                                if (line.trim()) {
                                    emptyAfterClose = 0;
                                }
                                else {
                                    emptyAfterClose++;
                                }
                            }
                        }

                        props.function = functionLines.join("\n").trim();

                        // eat empty lines
                        for ( i = i + 1; i < lines.length && lines[i].trim() === ""; i++ );

                        return lines.slice(i);

                    }).then(function (lines) {
                        props.examples = lines.join("\n").trim();
                        return props;
                    });
            });
        });

    processed.then(function (json) {
            return fs.writeFileAsync("data/data.json", JSON.stringify(json));
        }).then(function(){
            done();
        }).catch(function(x){
            console.error(x);
            done(false);
            throw new Error(x)
        });
};