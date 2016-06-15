require('./styles.scss');

var ace = require('brace');
require('brace/mode/json');
require('brace/theme/monokai');

var throttle = require('lodash/throttle');
var pick = require('lodash/pick');

var JSON5 = require('json5');

var inputTextarea = document.getElementById('input');
var outputTextarea = document.getElementById('output');

var inputEditor = ace.edit(inputTextarea);
inputEditor.setTheme('ace/theme/monokai');
// inputEditor.getSession().setMode('ace/mode/json');
inputEditor.setShowPrintMargin(false);
inputEditor.$blockScrolling = Infinity;

var outputEditor = ace.edit(outputTextarea);
outputEditor.setTheme('ace/theme/monokai');
outputEditor.setReadOnly(true);
outputEditor.setShowPrintMargin(false);
outputEditor.$blockScrolling = Infinity;

var hasLocalStorage = ('localStorage' in window);

function updateOutput() {
    var editorValue = inputEditor.getValue();

    // @TODO: transform editorValue

    outputEditor.setValue(editorValue, -1);

    if (hasLocalStorage) {
        localStorage.setItem('BEAF_REPL', editorValue);
    }
}

var throttledUpdateOutput = throttle(updateOutput, 100);

inputEditor.on('change', throttledUpdateOutput);

// Initial value
var initialValue = hasLocalStorage ? localStorage.getItem('BEAF_REPL') : '';

if (!initialValue) {
    initialValue = 'Hello world';
}

inputEditor.setValue(initialValue, 1);
updateOutput();

// Focus and reset undo manager
inputEditor.focus();
setTimeout(function() {
    inputEditor.getSession().getUndoManager().reset();
}, 0);

// Globals
window.inputEditor = inputEditor;
window.outputEditor = outputEditor;
