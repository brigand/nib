// super fast event delegation
// EventName, Selector, HandlerFunction[, Scope] -> Undefined
function delegate(eventName, selector, callback, scope) {
    var mappings = delegate.mappings;
    if (!mappings[eventName]) {
        document.addEventListener(eventName, delegate.handle, false);
        mappings[eventName] = [];
    }

    var list = mappings[eventName];

    list.push({
        eventName: eventName,
        selector: selector,
        callback: callback,
        scope: scope || document
    });
}
delegate.mappings = {};
delegate.handle = function handle(event) {
    var name = event.type;
    var root = document.body.parentNode;
    var relevantHandlers = delegate.mappings[name];
    
    var body = document.body;
    var matches = body.matches 
        || body.matchesSelector 
        || body.webkitMatchesSelector 
        || body.mozMatchesSelector 
        || body.msMatchesSelector;

    for (var i = 0; i < relevantHandlers.length; i++) {
        var handlerConfig = relevantHandlers[i];
        var target = event.target;
        var selector = handlerConfig.selector;
        var callback = handlerConfig.callback;

        if (handlerConfig.eventName === name) {
            while (target !== root) {
                if (matches.call(target, selector)) {
                    return callback.apply(target, arguments);
                }

                target = target.parentNode;
            }
        }
    }
};


// When we click on a <p> element; highlight it
delegate("click", "p", function (e) {
    this.style.backgroundColor = "yellow";
});

// bind all links to our router
delegate("click", "[href]", function (e) {
    e.preventDefault();
    router.navigate(this.href);
});
