# Example 12 - Insert Cursor

[Adapted from Insert Cursor At Beginning of Each Line Selected Extension](https://github.com/kaiwood/vscode-insert-cursor-at-beginning-of-each-line-selected)

## Insert Cursor

This extension is going to make multiple cursors appear in a vertical column
from a selection of text, with the column positioned where the selection begins.

## The Code

```typescript
'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('insert-cursor-at-beginning-of-each-line-selected.insertCursors', () => {
    let editor = vscode.window.activeTextEditor;

    let currentPosition = editor.selection.start.character;
    let firstLine = editor.selection.start.line;
    let lastLine = editor.selection.end.line;

    let selections = [];
    for(let lineNumber = firstLine; lineNumber <= lastLine; lineNumber++) {
      let position = new vscode.Position(lineNumber, currentPosition);
      selections.push(new vscode.Selection(position, position));
    }
    editor.selections = selections;
  });
  context.subscriptions.push(disposable);
}
```

## Walkthrough

```typescript
let currentPosition = editor.selection.start.character;
let firstLine = editor.selection.start.line;
let lastLine = editor.selection.end.line;
```

After grabing the `activeTextEditor`, we set variables for the character
position of the start of the selection, as well as the first and last line
numbers.

```typescript
let selections = [];
for(let lineNumber = firstLine; lineNumber <= lastLine; lineNumber++) {
  let position = new vscode.Position(lineNumber, currentPosition);
  selections.push(new vscode.Selection(position, position));
}
editor.selections = selections;
```

In this code block, interate from the `startLine` to the `lastLine`, creating a
`Position` object from the current `lineNumber` and `currentPosition`. We create
a new selection for each position. By setting the same position for both
parameters when constructing `Selection` we simply place a cursor on the screen
with no actual selection. This places a cursor on each line, starting from the
position and start line of the selection, down to the bottom line of the
selection. Finally, we set the `editor.selections` property to our new array
of selections.

### API References

[Position API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Position)

[Selection API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Selection)

[Selection.start API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Selection.start)

[Selection.end API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Selection.end)

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
  "contributes": {
      "commands": [{
          "command": "insert-cursor-at-beginning-of-each-line-selected.insertCursors",
          "title": "Insert Cursor at Beginning of Each Line Selected"
      }],
      "keybindings": [
          {
              "command": "insert-cursor-at-beginning-of-each-line-selected.insertCursors",
              "key": "shift+alt+i",
              "mac": "shift+alt+i",
              "when": "editorTextFocus"
          }
      ]
  },
  "activationEvents": [
      "onCommand:insert-cursor-at-beginning-of-each-line-selected.insertCursors"
  ]
}
```

## Running The Code

To run, call the command `Insert Cursor at Beginning of Each Line Selected` from
the command palette.
