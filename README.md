# nib

Hey!  There are a ton of little snippets of JavaScript that are used all of the time.

 - functional programming methods
 - polyfills
 - mini wrappers for ugly native APIs
 - lots of other stuff
 
Nib attempts to get off of these snippets into one place.

 - organization and consolidation of functions
 - *eventually* make collections of functions that can be downloaded into a single file
 - *eventually* a command line tool that reads an array of nibs from package.json
 
Nib's open source, and everything in MIT licensed.

## Contribute!

Fork the repository, and then add a file for your function.  All nibs are stored under the data directory.
They're in folders whos name is the category.  

The file name should match the function name.  These files are somewhat particular, because they're parsed
by a terrible adhoc script into a presentable format.

```javascript
// These comments here
// are the description
// which are followed by a type declaration comment
// x -> x
function id(x) {
  return x;
}

// These are examples
// shallow copy an array
var copyOfArray = array.map(id);
```

The function must be in the `function x` format; not the `var x = function` format.

## Development environment

Set up stuff:

```bash
npm install -g grunt bower
git clone git@github.com:brigand/nib.git && cd nib
npm install && bower install
```

Then type `grunt` and the site will open up in your browser.  Watch and livereload are enabled. 

## The Code

The site is built with [React](https://github.com/facebook/react), 
[Foundation](http://foundation.zurb.com/docs/),
and [Director](https://github.com/flatiron/director) on the client.


Grunt and Browserify are used to build things.  Feel encouraged to make the site better/prettier and send a 
pull request :-)


