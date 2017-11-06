# Example 08 - Copy Filenane

[Adapted from Copy Filename Extension](https://github.com/nemesv/vscode-copy-file-name)

## Copy Filename

In this extension we're going to copy the filename to the clipboard.

## The Code

```typescript
vscode.commands.registerCommand("copy-word.cut", () => {
'use strict';
// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as copyPaste from 'copy-paste';
import * as path from 'path';


let pasteAndShowMessage = function(fileName: string) {
  copyPaste.copy(fileName);
  vscode.window.setStatusBarMessage(`The filename "${fileName}" was copied to the clipboard.`, 3000);
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('copy-file-name.copyFileName', () => {
    var fullPath = vscode.window.activeTextEditor.document.fileName;
    var extName = path.extname(fullPath);
    var fileName = path.basename(fullPath, extName);
    pasteAndShowMessage(fileName);
  });

  context.subscriptions.push(disposable);
}
```

## Walkthrough

### pasteAndShowMessage()

This function takes a string `filename`, copies it to the clipboard and then
prints the name of the file on the statusbar.

### Activate

In activate we register the copyFilename command, storing the dispoable. 

```typescript
  var fullPath = vscode.window.activeTextEditor.document.fileName;
  var extName = path.extname(fullPath);
  var fileName = path.basename(fullPath, extName);
```

Next the full file name is retrieved, the extension is parsed, and the fileName
without the extenseion stored in thefileName variable.

`pasteAndShowMessage(fileName);`

Finally, we pasteAndShowMessage on the fileName, and then we add the disposable
to the subscriptions array.

### API References

[window.setStatusBarMessage](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.setStatusBarMessage)

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
    "contributes": {
      "keybindings": [
        {
          "command": "copy-file-name.copyFileName",
          "key": "ctrl+alt+f",
          "mac": "cmd+alt+f",
          "when": "editorTextFocus"
        }
      ],
      "commands": [
        {
          "command": "copy-file-name.copyFileName",
          "title": "Copy File Name"
        },
        {
          "command": "copy-file-name.copyFileNameWithExtension",
        }
      ]
    },
    "activationEvents": [
        "onCommand:copy-file-name.copyFileName"
    ]
}
```

## Running The Code

To run the command either use the short cut key or call the command
`Copy File Name` from the command palette.
