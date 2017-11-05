# Example 02 - Character Count

[Adapted from the VS Code Hello World](https://code.visualstudio.com/docs/extensions/example-hello-world)

## Project Prep

To make this simple, just make a copy of your last project or edit it directly.

## Character Count

To keep this simple, we're just going to edit the command implementation and
leave everything else the same.

## The Code

```typescript
// ...
var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    }
    var selection = editor.selection;
    var text = editor.document.getText(selection);
    // Display a message box to the user
    vscode.window.showInformationMessage('Selected characters: ' + text.length);
  });
  context.subscriptions.push(disposable);
}
```

## Walkthrough

The initial code is the same as the last, we're just changing the function
supplied to `registerCommand`.

`var editor = vscode.window.activeTextEditor;`

First we grab the activeTextEditor, which is stored on the window namespace
of vscode.

Next we check if we have an editor, otherwise we return.

`var selection = editor.selection;`

Next we grab a reference to the currently selected text.

`var text = editor.document.getText(selection)`

Then we retrieve the editor document and access the selected text and store it
in the text variable.

`vscode.window.showInformationMessage('Selected characters: ' + text.length);`

Finally we display the character count in the information panel.

### API References

[activeTextEditor API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.activeTextEditor)

[window.activeTextEditor API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.activeTextEditor)

[TextEditor.selection API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditor.selection)

[TextDocument.getText API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextDocument.getText)

## Running The Code

You can run the example just like the previous one using `hello world`, except
you need to create and document, type some text and select it before it will
work. If everything is working correctly, you should see the number of
characters you have selected in the information panel.
