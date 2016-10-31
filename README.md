# BEAF

BEAF is little thingy that allows you to make an online REPL for whatever you want to demonstrate. It takes text input from the left (**be**fore), runs it through a thing that transforms it, and puts the output on the right (**af**ter).

Think [SassMeister](http://www.sassmeister.com/) or the [Babel REPL](https://babeljs.io/repl/).

## Installation

Install the library from `npm`

```bash
npm install --save beaf
```

## Usage

First of all, there are `peerDependencies` that are required for any of this to work. Make sure you install them!

  npm install --save brace react react-dom react-redux redux redux-thunk

The main ingredient in BEAF is the transformation function. This takes the content of the textarea on the left and any optional parameters and puts it through some black box of your design, which returns either a Promise or the transformed value. The result of that transformation is displayed on the right.

### createBeef

The easiest way to get started is using `createBeef`. You can simply give it a transformation function, run it through your bundler of choice, and it'll work.

Here's an example of your entry file:


```js
import { createBeef } from 'beaf';

createBeef((text, options) => {
  let transformedText = text;
  // YOUR CODE HERE
  return transformedText;
});
```

`createBeef` can also take an options object instead, which lets you do all sorts of crazy stuff. For example, you can set colors or pick a theme and syntax mode for the Ace editor.

```js
import { createBeef } from 'beaf';

// Brace themes and modes need to be imported to work!
import 'brace/theme/monokai';
import 'brace/mode/jsx';
import 'brace/mode/javascript';

createBeaf({
  localStorageKey: 'BEAF_REPL',
  title: 'My cool JSX compiler',
  transform: input => babelCompileSync(input), // hand-wavey
  theme: 'monokai'
  inputMode: 'jsx',
  outputMode: 'javascript',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  headerBackgroundColor: '#fd8382',
  headerTextColor: '#ffffff',
  subheaderBackgroundColor: '#1996fc',
  subheaderTextColor: '#ffffff',
});
```

#### Supported options

> @TODO: List available options

### React Component

BEAF is a React component hooked up to a Redux store. You can incorporate it (or pieces of it) into a larger React application, if that's more your style. You can override the components used for the header and each editor!

```js
import { Beaf } from 'beaf';
```

> @TODO: Add instructions React Component usage

## TODO

I have a little list of top-of-mind things that I want to add to this thing sooner or later. Do you want to help? How nice of you! Please submit a [pull request](https://github.com/kmck/beaf/pulls).

* Better doucumentation of everything
* Progress spinner for async transforms
* Automatically create some kind of interface for setting options
* Tests, I guess
