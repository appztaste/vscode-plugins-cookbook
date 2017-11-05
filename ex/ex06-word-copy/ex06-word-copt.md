# Example 06 - Copy Word

[Adapted from Copy Word Extension](https://github.com/alefragnani/vscode-copy-word)

## Copy Word

In this recipe we're going to create an extension that allows you to copy
the word your cursor is sitting on without selecting the entire word.

## The Code

```typescript
'use strict';
import { copy } from "copy-paste";
import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("copy-word.copy", () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showInformationMessage("Open a file first to copy text");
        return;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
        if (selectWord(editor)) {
            copy(editor.document.getText(editor.selection));
        }
    } else {
        vscode.commands.executeCommand("editor.action.clipboardCopyAction");
    }
  });

  function selectWord(editor: vscode.TextEditor): boolean {
    const selection = editor.selection;
    const doc = editor.document;
    if (selection.isEmpty) {
      const cursorWordRange = doc.getWordRangeAtPosition(selection.active);
      if (cursorWordRange) {
          let newSe = new vscode.Selection(cursorWordRange.start.line,
                                          cursorWordRange.start.character,
                                          cursorWordRange.end.line,
                                          cursorWordRange.end.character);
          editor.selection = newSe;
          return true;
      } else {
          return false;
      }
    } else {
        return true;
    }
  }
}
```

## Walkthrough

### selectWord(editor)

`function selectWord(editor: vscode.TextEditor): boolean {`

`selectWord` takes a `TextEditor` and returns a boolean.

```typescript
const selection = editor.selection;
const doc = editor.document;
```

We first declare references to the current selection and document. 

```typescript
if (selection.isEmpty) {
  const cursorWordRange = doc.getWordRangeAtPosition(selection.active);
  // ...
```

If the selection is empty, grab the wordRange where the cursor is.
`getWordRangeAtPosition` returns a `Range` object. `Range` is an ordered pair of
numbers representing a series of characters in the editor.

```typescript
if (cursorWordRange) {
  let newSe = new vscode.Selection(cursorWordRange.start.line,
                                   cursorWordRange.start.character,
                                   cursorWordRange.end.line,
                                   cursorWordRange.end.character);
  editor.selection = newSe;
  return true;
```

If the range exists, set a new selection that starts where the range starts
and ends where the range ends. Then the selection is set the editors selection
member, thereby changing the editors selection to that of the range. Then
afterwards returning true to indicate a selection is made.

Remaining, if the cursorWordRange doesn't exist, return false, and finishing
out our code branch, is our original selection wasn't empty, we simply return
true.

### activate()

After ensuring a valid editor exists and is active, the current selection is
grabbed.

```typescript
if (selection.isEmpty) {
  if (selectWord(editor)) {
    copy(editor.document.getText(editor.selection));
  }
} else {
  vscode.commands.executeCommand("editor.action.clipboardCopyAction");
}
```

If the selection is empty, then call our select word function, if we have a
selection, then we use the imported copy method to copy it onto the clipboard.
If the selection wasn't empty at the outset, we simply execute our 
normal clipboard copy action.

### API References

[TextDocument.getWordRangeAtPosition](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextDocument.getWordRangeAtPosition)

## Configuration File

In this example we set our activation event and command palette command.

```json
{
    "contributes": {
      "commands": [
        {
          "command": "copy-word.copy",
          "title": "Copy Word: Copy"
        }
    ]
  },
    "activationEvents": [
      "onCommand:copy-word.copy",
      "onCommand:copy-word.cut"
  ]
}
```

## Running The Code

Run the command as previous. After placing the cursor on a word, call
`Copy Word: Copy` from the command palette.
