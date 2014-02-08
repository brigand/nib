// Convert an object into a query string
// e.g. {a: 1, b: [2, 3]} to "a=1&b=2&b=3"
// Object -> String
function objectToQueryString(obj){
    var pairs = [], 
        own = Object.prototype.hasOwnProperty, 
        toString = Object.prototype.toString;

    for (var key in obj) {
        if (!own.call(obj, key)) {
            return;
        }

        var value = obj[key];

        if (toString.call(value) === "[object Array]") {
            value.forEach(function(x){
                pairs.push([key, x]);
            });
        }
        else {
            pairs.push([key, value]);
        }
    }

    return pairs.map(function(pair){
        return encodeURIComponent(pair[0]) + "=" 
             + encodeURIComponent(pair[1]);
    }).join("&");
}


// ask your server for cars of a specific description
var url = "/cars?" + objectToQueryString({type: "fast", color: "red"});
doAjaxyStuff(url);

