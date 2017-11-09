# Example 15 - Convert Case Type

[Adapted from Open File Folder](https://github.com/dxcweb/string-convert)

## Copy Filepath

In this extension we are creating a utility to change the case type for
function names. For example, converting from camelCase to dash-case.

## The Code

```typescript
'use strict';

import * as vscode from "vscode";
import * as path   from "path";

export function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.openFileFolder',
    (e) => {
        let folderName;
        if (e) {
            folderName = e.path;
        } else {
            const activeTextEditor = vscode.window.activeTextEditor;
            let file = activeTextEditor.document.uri.path;
            folderName = path.dirname(file);
        }
        let folderUrl = vscode.Uri.file(folderName);
        vscode.commands.executeCommand("vscode.openFolder", folderUrl, true);
    });
    context.subscriptions.push(disposable);
}
```

## Walkthrough

```typescript
let folderName;
if (e) {
  folderName = e.path;
} else {
  const activeTextEditor = vscode.window.activeTextEditor;
  let file = activeTextEditor.document.uri.path;
  folderName = path.dirname(file);
}
```

In this code block we check to see if `e` was passed into our function. When a
command is triggered by a gui event like right clicking a folder, an event
object is passed to the command callback. We can use this object to find
information about what was clicked on. If we don't have an event object,
then the command was triggered from the command palette. If we don't have an
event object, we need to get the current open file through the `activeTextEditor`.
After we have the text editor, we grab the file uri from the document, and pull
the folder directory from the path using `dirname`.

`let folderUrl = vscode.Uri.file(folderName);`

In this line we create a new `Uri` object from `folderName`, the `Uri` is VS
Code's Class for representing any sort of file or network path.

`vscode.commands.executeCommand("vscode.openFolder", folderUrl, true);`

Finally, we use a method called `executeCommand` to execute one of VS Code's
internal commands. This allows us to make use of VS Core functionality that is
built on top of the API, as well as call other commands we've created or from
other extensions. We call "vscode.openFolder" with our folderUrl, and true to
open a new window.

### API References

[VS Code API Commands](https://code.visualstudio.com/docs/extensionAPI/vscode-api-commands)

[Uri.file API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Uri.file)

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
	"contributes": {
		"commands": [
			{
				"command": "extension.openFileFolder",
				"title": "Open this folder as Workspace"
			}
		],
		"menus": {
			"editor/title": [
				{
					"command": "extension.openFileFolder",
					"group": "openFileFolder"
				}
			],			
			"editor/title/context": [
				{
					"command": "extension.openFileFolder",
					"group": "openFileFolder"
				}
			],
			"explorer/context": [
				{
					"command": "extension.openFileFolder",
					"group": "navigation@2"
				}
			]
		}
	},
  "activationEvents": [
        "onCommand:extension.openFileFolder"
    ]
}
```

## Running The Code

To run, call the command `Open this folder as Workspace` from the command
palette or right click a folder from the side bar.
