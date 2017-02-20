# BEAF 🍖

BEAF is little thingy that allows you to make an online REPL for whatever you want to demonstrate. It takes text input from the left (**be**fore), runs it through a thing that transforms it, and puts the output on the right (**af**ter).

Think [SassMeister](http://www.sassmeister.com/) or the [Babel REPL](https://babeljs.io/repl/).

## Installation

Install the libraries and its `peerDependencies` using either `yarn` or `npm`:

#### yarn

```bash
yarn add beaf
yarn add brace react react-dom react-redux redux redux-thunk
```

#### npm

```bash
npm install --save beaf
npm install --save brace react react-dom react-redux redux redux-thunk
```

## Usage

The main ingredient in BEAF is the transformation function. This takes the content of the textarea on the left and any optional parameters and puts it through some black box of your design, which returns either a Promise or the transformed value. The result of that transformation is displayed on the right.

### createBeaf

The easiest way to get started is using `createBeaf`. You can simply give it a transformation function, run it through your bundler of choice, and it'll work.

Here's an example of your entry file:

```js
import { createBeaf } from 'beaf';

createBeaf((text, options) => {
  let transformedText = text;
  // YOUR CODE HERE
  return transformedText;
});
```

`createBeaf` can also take an options object instead, which lets you do all sorts of crazy stuff. For example, you can set colors or pick a theme and syntax mode for the Ace editor.

```js
import { createBeaf } from 'beaf';

// Brace themes and modes need to be imported to work!
import 'brace/theme/monokai';
import 'brace/mode/jsx';
import 'brace/mode/javascript';

createBeaf({
  localStorageKey: 'BEAF_REPL',
  title: 'My cool Babel compiler',
  toolbarOptions: [{
    type: 'checkbox',
    key: 'jsx',
    name: 'Enable JSX'
    defaultValue: true,
  }],
  transform: (input, options) => babelCompileSync(input, options), // hand-wavey
  theme: 'monokai'
  inputMode: 'jsx',
  outputMode: 'javascript',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  headerBackgroundColor: '#fd8382',
  headerTextColor: '#ffffff',
  toolbarBackgroundColor: '#2fc639',
  toolbarTextColor: '#ffffff',
  subheaderBackgroundColor: '#1996fc',
  subheaderTextColor: '#ffffff',
});
```

#### Supported options

##### General options

* `transform` is a function that takes an input string from the left panel and an options object and returns the transformed value for the right panel.
* `input` sets initial value for the left editor panel.
* `output` sets initial value for the right editor panel.
* `options` is an object of options that gets passed into the transformation function.

* `title` is displayed at the top of BEAF.
* `titleUrl` sets a clickthrough URL on the title.
* `menuItems` specifies array of `{ name, url }` objects to use as links in the top-right corner of the header.

* `toolbarOptions` specifies an array of `{ type, key, name, defaultValue }` objects to populate the toolbar with controls that change the transform options. Supported types are `text`, `number`, `checkbox`, and `select` (use `options` to populate the drop-down).

* `localStorageKey` can be used to set a key in local storage where the BEAF editor values are saved. By default, BEAF saves the editor values in local storage under `BEAF_REPL`, but you can change or disable it.

* `inputTitle` is the header of the left pane.
* `outputTitle` is the header of the right pane.

##### Theming options

These options get passed to the Ace editor.

* `theme` is the syntax theme for Ace.
* `inputMode` is the left editor's input mode for syntax highlighting.
* `outputMode` is the right editor's input mode for syntax highlighting.

These options set text/background colors and fonts.

* `backgroundColor`
* `textColor`
* `fontFamily`
* `headerBackgroundColor`
* `headerTextColor`
* `headerFontFamily`
* `toolbarBackgroundColor`
* `toolbarTextColor`
* `toolbarFontFamily`
* `subheaderBackgroundColor`
* `subheaderTextColor`
* `subheaderFontFamily`
* `editorFontFamily`

##### Component overrides

You can pass props to the React components used in BEAF from the top level.

* `headerProps` are passed to the header component.
* `toolbarProps` are passed to the toolbar component.
* `paneProps` are passed to each of the pane components, which wrap the left and right editors.
* `inputProps` are passed to the left pane's editor component.
* `outputProps` are passed to the right pane's editor component.

If you want, you can even override the components entirely, such as if you want the right pane to be a non-Ace editor.

* `HeaderComponent` is the title and menu.
* `ToolbarComponent` is the toolbar for setting options.
* `InputComponent` is the editor in the left pane.
* `OutputComponent` is the editor in the right pane.

### React Component

BEAF is a React component hooked up to a Redux store. You can incorporate it (or pieces of it) into a larger React application, if that's more your style. You can override the components used for the header and each editor!

```jsx
import { Beaf } from 'beaf';

class YourComponent extends Component {
  render() {
    return (
      <Beaf
        input="Initial text value"
        transform={(input, options) => { /* ... */}}
      />
    );
  }
}
```

**Fun fact:** `createBeaf` is just a wrapper around the `Beaf` component, so all of the options described above can be used as props here.

## Contributing / TODO

I have a little list of top-of-mind things that I want to add to this thing sooner or later. Do you want to help? How nice of you! Please submit a [pull request](https://github.com/kmck/beaf/pulls).

* Getters on the `Beaf` component
* More exploration around using Beaf as a controlled component
* Improved documentation
* Progress spinner for async transforms
* Error indicator if the transformation somehow failed
* Tests, I guess

Developing and playing around with the examples in the repository is pretty straightforward. `npm run start` starts a Webpack dev server, then you can go to `http://localhost:8086/simple` (or whatever example you're testing) and see what's going on.
