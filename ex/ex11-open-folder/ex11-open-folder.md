# Example 11 - Open File Folder

[Adapted from Open File Folder](https://github.com/auchenberg/vscode-open-file-folder)

## Copy Filepath

In this extension we're going to create an extension to open the active file's
folder containing folder as a workspace.

## The Code

```typescript
'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.openFileFolder',
  () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    let file = activeTextEditor.document.uri.path;
    let folderName = path.dirname(file);
    let folderUrl = vscode.Uri.file(folderName);
    vscode.commands.executeCommand("vscode.openFolder", folderUrl, true);
  });
  context.subscriptions.push(disposable);
}
```

## Walkthrough

```typescript
const activeTextEditor = vscode.window.activeTextEditor;
let file = activeTextEditor.document.uri.path;
let folderName = path.dirname(file);
```

In this code block we grab the `activeTextEditor`, then take documents path
off the `uri` object, use `path` to parse the directory name.

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

To run, call the command `Open this folder as Workspace` from the command palette. Make sure to
try with single and multiple selection.
