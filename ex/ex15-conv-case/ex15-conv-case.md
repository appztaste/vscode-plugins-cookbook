# Example 15 - Convert Case Type

[Adapted from Open File Folder](https://github.com/dxcweb/string-convert)

## Copy Filepath

In this extension we are creating a utility to change the case type for
function names. For example, converting from camelCase to dash-case.

## The Code

```typescript
"use strict";

import { window, commands } from "vscode";
import * as string from "underscore.string";
const editor = window.activeTextEditor;
const registerCommand = commands.registerCommand;

function isCapitalCase(word: string) {
  return /^([A-Z]+[a-z]*)+[1-9]*/.test(word);
}

function isSnakeCase(word: string) {
  return /^([a-z]+_[a-z]+)+[1-9]*/.test(word);
}

function isDashCase(word) {
  return /^([a-z]+-[a-z]+)+[1-9]*/.test(word);
}

function isCamelCase(word) {
  return /^[a-z]+([A-Z]+[a-z]*)+[1-9]*/.test(word);
}

export function activate(context) {
  registerCommand('extension.stringConvert', () => {
    editor.edit(builder => {
      editor.selections.forEach(selection => {
        let text = editor.document.getText(selection);
        if (isCapitalCase(text)) {
          text = string.underscored(text);
        } else if (isSnakeCase(text)) {
          text = string.camelize(text, true);
        } else if (isCamelCase(text)) {
          text = string.dasherize(text);
        } else if (isDashCase(text)) {
          text = string.camelize(text);
          text = string.capitalize(text);
        }
        builder.replace(selection, text);
      });
    });
  });
}
```

## Walkthrough


```typescript
function isCapitalCase(word: string) {
  return /^([A-Z]+[a-z]*)+[1-9]*/.test(word);
}

function isSnakeCase(word: string) {
  return /^([a-z]+_[a-z]+)+[1-9]*/.test(word);
}

function isDashCase(word) {
  return /^([a-z]+-[a-z]+)+[1-9]*/.test(word);
}

function isCamelCase(word) {
  return /^[a-z]+([A-Z]+[a-z]*)+[1-9]*/.test(word);
}
```

After importing the necessary libraries, we declare all our helper functions.
Each function tests for a specific case type using regex's. The patterns, will
not be covered.

```typescript
  registerCommand('extension.stringConvert', () => {
      editor.edit(builder => {
          editor.selections.forEach(selection => {
```

After importing the necessary libraries, we register our command and command
function. Inside our function we call edit on the active editor and then build
up our edit. Next we grab our selections off the editor, and call forEach, so
our command works for multiple-selection.

```typescript
let text = editor.document.getText(selection);
if (isCapitalCase(text)) {
	text = string.underscored(text);
} else if (isSnakeCase(text)) {
	text = string.camelize(text, true);
} else if (isCamelCase(text)) {
	text = string.dasherize(text);
} else if (isDashCase(text)) {
	text = string.camelize(text);
	text = string.capitalize(text);
}
builder.replace(selection, text);
```

Inside the forEach, we grab the text for the given selection and then process
it. We use a series of if/else clauses to test if our text matches any of the
cases. The four cases we test for are underscored or snake case a la python
`snake_case_name`, camel case `camelCase`, dash case `dash-case` and capital
case `CapitalCase`. The order of conversion is
`snake_case_name -> camelCase -> dash-case -> CapitalCase`

### API References

[TextEditorEdit.replace API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditorEdit.replace)

[TextDocument.getText API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextDocument.getText)

[TextEditor.selection API][https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditor.selection]

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
	"contributes": {
		"keybindings": [
		{
			"command": "extension.stringConvert",
			"key": "ctrl+alt+t",
			"mac": "cmd+ctrl+t",
			"when": "editorTextFocus"
		}
		],
		"commands": [
			{
				"command": "extension.stringConvert",
				"title": "Convert Variable Case Type"
			}
		]
	},
	"activationEvents": [
		"onCommand:extension.stringConvert"
	]
}
```

## Running The Code

To run, call the command `Convert Variable Case Type` from the command
palette or use the key binding.
