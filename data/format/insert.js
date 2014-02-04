// Insert values into a string
// String, Object --> String
function insert(template, mapping) {
    // if mapping is left out, allow partial application
    if (!mapping) {
        return insert.bind(null, template)
    }

    var has = Object.prototype.hasOwnProperty;

    // replace all upper case parts of the template
    // with the values from mapping
    return template.replace(/\{(\w+)\}/g, function(all, match){
        if (has.call(mapping, match)){
            return mapping[match];
        }
        else {
            return all;
        }
    });
}

// represent a name object as a string
var name = {
    first: "John",
    last: "Smith"
};

insert("{last}, {first}", name); // => "Smith, John"

// use partial application to template an array of items
var guests = [
    {first: "John", last: "Smith"},
    {first: "Jane", last: "Doe"}
];

guests.map(insert("{first} {last}"))
    .join(" and "); // => "John Smith and Jane Doe"


