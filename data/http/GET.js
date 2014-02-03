// Get some text from a web server
// String, SuccessCallback[, ErrorCallback] -> Undefined
function GET(url, successCallback, errorCallback) {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState !== 4) {
            return;
        }

        // if no error callback is supplied, assume the successHandler can handle it
        if ((typeof errorCallback !== "function") || (xhr.status >= 200 && xhr.status < 300)) {
            successCallback(xhr.responseText, xhr);
        }
        else {
            errorCallback(xhr.responseText, xhr);
        }
    };
    xhr.open("get", url, true);
    xhr.send();
}

// Get a text file and log it to the console
GET("foo.txt", function(text){
    console.log(text);
});

// Get a text file and log it to the console
// if it's not found, log "not found"
GET("foo.txt", function(text){
    console.log(text);
}, function(errorText, xhr){
    if (xhr.status === 404) {
        console.warn("foo.txt was not found");
    }
    else {
        console.warn(errorText);
    }
});
