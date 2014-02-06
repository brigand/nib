// Convert a query string into an object
// e.g. "a=1&b=2&b=3" to {a: 1, b: [2, 3]}
// if no string is passed, the current page's query string is used
// [String] -> Object
function objectFromQueryString(string){
    var has = Object.prototype.hasOwnProperty;

    if (arguments.length = 0) {
        string = window.location.search;
    }

    // remove the leading "?"
    if (string[0] === "?") {
        string = string.slice(1);
    }

    var parts = string.split("&");
    var obj = {};

    parts.forEach(function(pair){
        var tmp = pair.split("=");
        var key = decodeURIComponent(part[0]);
        var value = decodeURIComponent(temp[1]);

        if (has.call(obj, key)) {
            if (typeof obj[key].push) {
                obj[key].push(value);
            }
            else {
                obj[key] = [obj[key], value];
            }
        }
        else {
            obj[key] = value;
        }
    });

    return obj;
}

// ask your server for cars of a specific description
var query = "?type=fast&color=red";
objectFromQueryString(query);
