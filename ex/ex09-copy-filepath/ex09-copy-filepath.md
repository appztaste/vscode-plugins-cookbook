# Example 09 - Copy Filepath

[Adapted from Copy File Name Ext Extension](https://github.com/dKab/vscode-copy-file-name-ext)

## Copy Filepath

In this extension we're going to copy the full filepath to the clipboard.

## The Code

```typescript
'use strict';

const ncp = require("copy-paste");
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.copyProjectPath',
    () => {
      const [rootFolder] = vscode.workspace.workspaceFolders;
      const rootPath = rootFolder.uri.path;
      const activeTextEditor = vscode.window.activeTextEditor;

      let path;
      if (rootPath && activeTextEditor) {
        let file = activeTextEditor.document.uri.path;
        path = `${rootPath}/${file}`;
      } else if(rootPath) {
        path = rootPath;
      }
      if (path) ncp.copy(path, () => console.log('File path has been copied ' + 
                                                 'to the system clipboard'));
  });
  context.subscriptions.push(disposable);
}
```

## Walkthrough

Most of the code should look familiar, much of it is either javascript or
API's we've used before. We'll look at the new things and logic to keep it
short.

`const [rootFolder] = vscode.workspace.workspaceFolders;`

In the first line we access the workspace and grab the workspaceFolders. The
`workspace` is the Namespace for dealing with the current workspace. A workspace
is the representation of the folder that has been opened. There is no workspace
when just a file but not a folder has been opened.

`workspaceFolders` is a List of workspace folders or `undefined` when no folder
is open. Note that the first entry corresponds to the value of `rootPath`.

With this information, we can see that our first line uses ES6 destructuring
to grab the `rootPath` stored in the first entry of `workspaceFolders`.

`const rootPath = rootFolder.uri.path;`

In this line we access the `Uri` instance on the workspace `rootFolder` and
grab the `path` which is a string path to the current file from the root folder.

```typescript
const activeTextEditor = vscode.window.activeTextEditor;

let path;
if (rootPath && activeTextEditor) {
  let file = activeTextEditor.document.uri.path;
  path = `${rootPath}/${file}`;
} else if(rootPath) {
  path = rootPath;
}
if (path) ncp.copy(path, () => console.log('File path has been copied ' + 
                                            'to the system clipboard'));
```

In this code if we have a `rootPath` and `activeTextEditor` we set the
`path` equal to the document uri path, else if we only have rootPath and no
editor is open, we set `path` equal to the project root path. If path is defined
we copy it to the clipboard.

### API References

[Workspace API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#_workspace)

[Workspace.workspaceFolders API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#workspace.workspaceFolders)

[Uri API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Uri)

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
    "contributes": {
        "commands": [
            {
                "command": "extension.copyProjectPath",
                "title": "Copy Project Path of Active File"
            }
        ]
    },
    "activationEvents": [
        "onCommand:extension.copyProjectPath"
    ]
}
```

## Running The Code

To run, call the command `Copy Project Path of Active File` from the command
palette.
