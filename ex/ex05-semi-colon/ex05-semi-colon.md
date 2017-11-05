# Example 04 - Semi Colon EOL

[Adapted from the Auto Insert Semi-colon Extension](https://github.com/litgh/auto-insert-semicolon)

## Custom Text

In this recipe we're going to create an extension that adds a semi-colon to
the active line.

## The Code

```typescript
'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable: vscode.Disposable = 
        vscode.commands
              .registerTextEditorCommand('extension.auto-insert-semicolon', 
        (editor, textEdit) => {
            return semicolonCommand(editor, textEdit);
        });
    context.subscriptions.push(disposable);
}

function semicolonCommand(textEditor: vscode.TextEditor,
                          textEditorEdit: vscode.TextEditorEdit) {
    const line: vscode.TextLine 
                = textEditor.document
                            .lineAt(textEditor.selection.active);

    if (line.text.trim() !== '' && line.text[line.text.length - 1] !== ';') {
        textEditorEdit.insert(line.range.end, ';');
    }

    let position = new vscode.Position(line.lineNumber,
                                       line.range.end.character);
    textEditor.selection = new vscode.Selection(position, position);
}
```

## Walkthrough

### semicolonCommand(textEditor, textEditorEdit)

```typescript
const line: vscode.TextLine = textEditor.document
                                        .lineAt(textEditor.selection.active);
```

In the first line we declare a `TextLine` and set it equal to the line that the
curson is on using `textEditor.selection.active`.

```typescript
if (line.text.trim() !== '' && line.text[line.text.length - 1] !== ';') {
    textEditorEdit.insert(line.range.end, ';');
}
```

In this second block we check if the line is not empty and make sure it doesn't
already end with a semi-colon. If this is satisfied, we add a semi-colon to the
end of the line using the `insert()` method on `TextEditor`.

```typescript
let position = new vscode.Position(line.lineNumber,
                                    line.range.end.character);
```

In this line we create a new position object, which represents a character
position in the document, or the position of a cursor. We create a new
`Position` object by accessing the constructor on `vscode` and passing it a line
number and character position. In this case we use the enums `lineNumber`
and `range.end.character` on the `line` object. These give the current line
number and last character position of the `TextLine` object.

`textEditor.selection = new vscode.Selection(position, position);`

Finally, we set the cursor to the end position of the line;

### Activate

```typescript
let disposable: vscode.Disposable = vscode.commands
                .registerTextEditorCommand('extension.auto-insert-semicolon',
                (editor, textEdit) => {
                    return semicolonCommand(editor, textEdit);
                });
context.subscriptions.push(disposable);
```

Here we see a new kind of command register, the `registerTextEditorCommand`,
the main diference between the two command registers is that the `TextEditor`
is passed into `registerTextEditorCommand`.

Our callback function has a parameter for the `editor` and `textEdit`, and
call and return the reult of semiColonCommand with the provided parameters.

Finally we push our disposable.

### API References

[commands.registerTextEditorCommand API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#commands.registerTextEditorCommand)

[Position API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Position)

[Selection API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Selection)

## Configuration File

In this example we set a hotkey and command pallete command.

```json
{
    "contributes": {
        "commands": [
            {
                "command": "extension.auto-insert-semicolon",
                "title": "Auto Insert Semicolon"
            }
        ],
        "keybindings": [
            {
                "key": "alt+enter",
                "when": "editorTextFocus",
                "command": "extension.auto-insert-semicolon"
            }
        ]
    },
    "activationEvents": [
        "onCommand:extension.auto-insert-semicolon"
    ]
}
```

Using this configuration, we add the command under the pallete using the title
`Auto Insert Semicolon` and also binds it to the  hotkey `alt+enter`. Finally,
we set the activation to trigger when calling the command.

## Running The Code

To run the extension, follow the normal procedure and then create a new
document, from there type some text. Now try either the hot key `alt+enter` or
the command pallete command `Auto Insert Semicolon`. Make sure to click in the
middle of a word and test it to see how it automatically moves to the end of the
line.

## Disposing Extension Resources

[Disposing Extension Resources](https://code.visualstudio.com/docs/extensions/example-word-count#_disposing-extension-resources).

## Installing your Extension Locally

[Installing your Extension Locally](https://code.visualstudio.com/docs/extensions/example-word-count#_installing-your-extension-locally)
