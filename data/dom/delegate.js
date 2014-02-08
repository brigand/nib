// super fast event delegation
// EventName, Selector, HandlerFunction[, Scope] -> Undefined
function delegate(eventName, sel, callback, scope) {
    var mappings = (delegate.mappings = delegate.mappings || {});

    if (!mappings[eventName]) {
        document.addEventListener(eventName, handle, false);
        mappings[eventName] = [];
    }

    var list = mappings[eventName];

    list.push({
        eventName: eventName,
        sel: sel,
        callback: callback,
        scope: scope || document
    });

    // this code only needs to run the first time delegate is called
    if (delegate._inited) {
        return;
    }
    delegate._inited = true;
    
    var body = document.body;
    var matches = 
           body.matches 
        || body.matchesSelector
        || body.webkitMatchesSelector
        || body.mozMatchesSelector
        || body.msMatchesSelector;

    function handle(event) {
        var name = event.type;
        var root = document.body.parentNode;
        var list = delegate.mappings[name];

        for (var i = 0; i < list.length; i++) {
            var conf = list[i];
            var target = event.target;
            var sel = conf.sel;
            var callback = conf.callback;

            if (conf.eventName === name) {
                while (target !== root) {
                    if (matches.call(target, sel)) {
                        return callback.apply(target, arguments);
                    }

                    target = target.parentNode;
                }
            }
        }
    }
}

// When we click on a <p> element; highlight it
delegate("click", "p", function (e) {
    this.style.backgroundColor = "yellow";
});

