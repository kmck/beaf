# BEAF

BEAF is little thingy that allows you to make an online REPL for whatever you want to demonstrate. It takes text input from the left (**be**fore), runs it through a thing that transforms it, and puts the output on the right (**af**ter).

Think [SassMeister](http://www.sassmeister.com/) or the [Babel REPL](https://babeljs.io/repl/).

**NOTE:** This is a work-in-progress, so be on the lookout for rough edges.

## Installation

Install the library from `npm`

```bash
npm install --save beaf
```

## Usage

The main ingredient in BEAF is the transformation function. This takes the content of the textarea on the left and any optional parameters and puts it through some black box of your design, which returns either a Promise or the transformed value. The result of that transformation is displayed on the right.

```js
var beaf = require('beaf');
var beafInstance = beaf(document.getElementById('root'), {
    inputValue: 'initial value',
    options: {},
    transform: function(text, options) {
        var transformedText = text;
        // YOUR CODE HERE
        return transformedText;
        // or a promise
    },
    inputMode: 'json', // or whatever
    outputMode: 'text', // or whatever
    theme: 'monokai', // or whatever
});
```

That first argument is the container that BEAF gets rendered into. You can skip it and it will render to `document.body`, but that's a little dirty, I guess.

Speaking of dirty, if you want to use a different theme or output mode, you'll have to include that stuff and (most likely) rebuild the Webpack bundle. Oh man! I did _not_ make that easy for you! I sure wouldn't want to be you right now. But hey, you're the goofball who decided to use `v0.0.1`. You must be incredibly brave, and maybe you deserve a medal.

## TODO

I have a little list of top-of-mind things that I want to add to this thing sooner or later. Do you want to help? How nice of you! Please submit a [pull request](https://github.com/kmck/beaf/pulls).

* Figure out how to pick and choose modes and themes for Ace in a sane way
* Instructions on how to style the thing
* Resizable panels
* Progress spinner for async transforms
* Automatically create some kind of interface for setting options
* Document undocumented features (eg. `menuItems`)
* Cleaner Webpack build and npm publish
* Tests, I guess
