var key = "nib_bundleStore_1";
var api = require("api");

module.exports = {
	get: function(){
		var current = localStorage[key];
		
		try {
			return JSON.parse(current) || [];
		}
		catch (e) {
			return [];
		}
	},
	set: function(items){
		localStorage[key] = JSON.stringify(items.map(function(it){
			return {name: it.name, category: it.category};
		}));
	},
	// take an array of items, make a bundle from them
	getJS: function(items){
		// get all of the details
		items = items.map(function(it){
			return api.getItem(it.name);
		});

		var before = "/** Built on http://nib.ijk.io - license is MIT */\n"
			+ "var nib = (function(){\n"
			+ "var exports = nib || {};\n";
		var after = "\n"
			+ "return exports;"
			+ "\n})();\n\n"
			+ "typeof module === 'object' && (module.exports = nib);";

		var body = items.map(function(item){
			return item.function.trim() + "\n"
				+ "exports." + item.name + " = " + item.name + ";"
		}).join("\n\n");

		return before + body + after;
	}
}