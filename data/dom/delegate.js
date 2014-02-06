// super fast event delegation
// EventName, Scope, Selector, HandlerFunction -> Undefined
delegate("click", "#a", "#b", function (e) {
    console.log(e.target.id);
});

function delegate(eventName, scope, sel, callback) {
    var list = (delegate.list = delegate.list || []);

    // this code only needs to run the first time delegate is called
    if (delegate.callback) {
        return;
    }
    
    var body = document.body;
    var matches = 
           body.matches 
        || body.matchesSelector
        || body.webkitMatchesSelector
        || body.mozMatchesSelector
        || body.msMatchesSelector;

    delegate.callback = function (event) {
        var name = event.name;
        for (var i = 0; i < delegate.list.length; i++) {
            var conf = delegate.list[i];

            if (conf.name === name) {

            }
        }
    }
}