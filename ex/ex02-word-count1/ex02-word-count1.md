# Example 02 - Word Count 1

[Adataped from the VS Code Hello World](https://code.visualstudio.com/docs/extensions/example-hello-world)

## Project Prep

To make this simple, just make a copy of your last project or edit it directly.

## Word Count

To keep this simple, we're just going to edit the command implementation and
leave everything else the same.

### The Code

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

### Walkthrough

The initial code is the same as the last, we're just changing the function
supplied to `registerCommand`.

`var editor = vscode.window.activeTextEditor;`

First we grab the activeTextEditor, which is stored on the window namespace
of vscode.

Next we check if we have an editor, otherwise we return.

`var selection = editor.selection;`

Next we grab a reference to the currently selected text.

`var text = editor.document.getText(selection)`

Then we retrieve the selected text and store it in the text variable.

`vscode.window.showInformationMessage('Selected characters: ' + text.length);`

Finally we display the character count in the information panel.

#### API References

[registerCommand API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#commands.registerCommand)

[Disposable API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Disposable)

### Running The Code

You can run the example right now because the code generator automatically
sets the necessary configuration files to tell VS Code how you want to use
the command. Follow the instructions in running-extensions.md to run the
command. If everything worked correctly, you should see `Hello World` display
in the information bar at the top of the window.

### File Details

The code generator automatically generates a number of files for configuring
and building your extension. It's important to know what each does so you
can fully customize your extension.\
[Configuration File API](https://code.visualstudio.com/docs/extensions/example-hello-world#_miscellaneous-files)

### Activation

To prevent extensions from interfering with optimal program execution,
extensions are sandboxed into their own process and are activated lazily. This
is why we create our plugin within the `activate()` method.

[Activation API](https://code.visualstudio.com/docs/extensions/example-hello-world#_extension-activation)

### Configuration Files

To make the command available to VS Code for use, and to set our activation 
event you must set the package.json file for your extension. When
generating an extension this is all done by default. If we look in our
package.json file we can see both our activation event and our execution
command.

```json
{
    "activationEvents": [
        "onCommand:extension.sayHello"
    ],
    "contributes": {
        "commands": [
            {
                "command": "extension.sayHello",
                "title": "Hello World"
            }
        ]
    }
}
```

These are the properties of interest, `activationEvents` and `contributes`. As
you likely surmised that `activationEvents` handles the activation event
for our command. It is triggered `onCommand` or when it is called. The
`contributes` tells vscode what we are adding, in this instance a command named
`Hello World` that is associated with the registered command
`extension.sayHello` (when we called `registerCommand` above). Now our
extension is available under `Hello World` in the command pallete.

[Extension Manifest API](https://code.visualstudio.com/docs/extensions/example-hello-world#_the-extension-manifest-packagejson)

### Debugging

VS Code has a full debugging suite built in that knows how to work perfectly
with typescript.

[Debugging Your Extension](https://code.visualstudio.com/docs/extensions/example-hello-world#_debugging-your-extension)
