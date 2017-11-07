# Example 10 - Insert GUID

[Adapted from GenUUID Extension](https://github.com/espresso3389/genuuid-vscode/)

## Copy Filepath

In this extension we're going to generate a UUID and insert it into our cursor
positions. This will work on every cursor position.

## The Code

```typescript
'use strict';
import * as vscode from 'vscode';
import * as uuid from 'node-uuid';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('genuuid.generateUUID',
  () => {
    let editor = vscode.window.activeTextEditor;
    const genId: () => string = () => uuid.v4();
    if (editor)
      editor.edit(edit => 
        editor.selections.forEach(v => edit.replace(v, genId())));
  });
  context.subscriptions.push(disposable);
}
```

## Walkthrough

In the first lines of `activate()` we register our command, and define the
callback.

`const genId: () => string = () => uuid.v4();`

After setting a reference to the active editor, we create a UUID generator.

`editor.edit(edit =>`

After checking if the editor exists, we call the edit function on the editor,
passing in a callback that receives a `TextEditorEdit`. The `TextEditorEdit`
will act as an `edit-builder`, building up a set of edits on the document. If
the edits are valid, then they can be applied on the document.

`editor.selections.forEach(v => edit.replace(v, genId())));`

In this line we do several things.  First, we access the `selections` object
on the `editor` which stores an array of selection on the page.

The reason there are multiple selections is because VS Code supports multiple
cursors and multiple selection. If we have multiple independent selections on
the page, they will all be accessible from the `selections` object.

We call `forEach` on the selections object to process each selection, passing in
a callback which takes the selection. For each selection, we call the `replace`
method on the `edit` object from our initial callback. In the `replace` method
we pass the current selection and then the result of calling `genId()`. This
inserts the text inplace of the current selection (or at the cursor).

Finally we add our disposable to the `subscriptions` array on the `context`.

### API References

[TextEditor.edit API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditor.edit)

[TextEditorEdit API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditorEdit)

[TextEdit API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEdit)

[TextEdit.replace API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEdit.replace)

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
    "contributes": {
        "commands": [
            {
                "command": "genuuid.generateUUID",
                "title": "Generate UUID"
            }
        ]
    },
    "activationEvents": [
        "onCommand:genuuid.generateUUID"
    ]
}
```

## Running The Code

To run, call the command `Generate UUID` from the command palette. Make sure to
try with single and multiple selection.
