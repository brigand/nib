// Simple replacement for jQuery-like selectors in IE8+
// String[, HTMLElement] -> Array<HTMLElement>
function $(sel, parent) {
    var nodeList = (parent || document).querySelectorAll(sel),
        slice = Array.prototype.slice;
    return slice.call(nodeList);
}


// Get the text from all <p> tags on a page
var allText = $("p").map(function(el){
    return el.textContent;
}).join("\n\n");

// A function numbers links in a container
var numberLinks = function(container){
    $("a", container).forEach(function(el, index){
        el.textContent += " (" + (index + 1) + ")";
    });
};

