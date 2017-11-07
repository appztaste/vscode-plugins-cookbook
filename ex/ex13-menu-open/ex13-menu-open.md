# Example 13 - Menu Open

[Adapted from Open New Instance Extension](https://github.com/chrisdias/vscode-opennewinstance)

## Open Folder From Context Menu

This extension shows how to create an extension that allows you to open a folder
in a new instance from the sidebar context menu.

## The Code

```typescript
'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.scopeToHere',
    (e: vscode.Uri) => {
      vscode.commands.executeCommand("vscode.openFolder", e, false);
  });
  context.subscriptions.push(disposable);
}
```

## Walkthrough

This example is simple. Inside our `registerCommand` function, we pass a
callback that takes a parameter `e`. The value `e` is passed into the function
when it is triggered under certain circumstances, like when clicking something
and using the context menu.

```typescript
(e: vscode.Uri) => {
  vscode.commands.executeCommand("vscode.openFolder", e, false);
```

We see in our callback, we call `executeCommand` passing in the
`vscode.openFolder` command, passing in the Uri, and false. By setting the last
parameter to false, we are telling VS Code to open the folder in the active
window.

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
    "contributes": {
        "commands": [
            {
                "command": "extension.scopeToHere",
                "title": "Reopen Workbench Here"
            }
        ],
        "menus": {
            "explorer/context": [
                {
                    "command": "extension.scopeToHere"
                    ,"group": "navigation@1"
                }
            ]
        }
    },
  "activationEvents": [
      "*"
  ]
}
```

## Running The Code

To run, call the command `Reopen Workbench Here` from the command palette, or
right click a folder from the sidebar.
