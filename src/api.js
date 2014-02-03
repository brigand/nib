(function (){
    "use strict";

    var Promise = require("bluebird");
    var items = [];
    var itemsByName = {};
    var names = [];
    var categories = [];

    function GET(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest;
            xhr.addEventListener('error', reject);
            xhr.addEventListener('load', function(){
                resolve(xhr.responseText);
            });
            xhr.open('GET', url);
            xhr.send(null);
        });
    }

    // Get all records; this should be handled
    // by the application cache
    var getItems = GET("bin/data.json")
        .then(JSON.parse)
        .then(function (_items){
            items = _items;
            return items;
        })
        .then(function(_items){
            // load all items into the itemsByName object
            for ( var i = 0; i < _items.length; i++ ) {
                var item = _items[i];
                itemsByName[item.name.toLowerCase()] = item;
                names.push(item.name.toLowerCase());

                // add category if we don't already have it
                if (categories.indexOf(item.category) === -1){
                    categories.push(item.category);
                }
            }

            return _items;
        })
        .catch(function(err){
            console.error(err);
            throw err;
        });

    var id = function(x) { return x; };

    var api = {
        getNames: function(filter){
            return names.filter(filter || id);
        },
        getItem: function(name){
            return itemsByName[name.toLowerCase()];
        },
        getItems: function(){
            return items;
        },
        load: function(){
            return getItems;
        },
        getCategories: function(){
            return categories;
        }
    };

    if ( typeof module === "undefined" ) {
        window.api = api;
    } else {
        module.exports = api;
    }
})();