# Example 01 - Hello World

[Adapted from the VS Code Hello World](https://code.visualstudio.com/docs/extensions/example-hello-world)

## Generate Your Project

Create a new directory, run `yo code` in the terminal and go through the setup,
all examples in this book are in Typescript, but you are free to use Javascript
if you can translate the examples. If you need additional help, refer to the
project-gen.md file in the root directory.

## Hello World

### The Code

After generating your project, open up `extension.ts` in the `src` folder. You
should have the following code (comments removed):

```typescript
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "my-first-extension" is now active!');
    var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(disposable);
}
```

### Walkthrough

We'll go over it line by line.

`import * as vscode from 'vsode'`

In the first line we import every module in the vscode library as vscode so we
have access to the API.

`export function activate(context: vscode.ExtensionContext) {`

In the second line we export our function called activate. Each extension should
export from its main file a function named `activate()` which VS Code will
invoke only once when any of the `activationEvents` described in the
package.json file occur. We can see our context, an instance of the
`ExtensionContext` class is passed in as a parameter. The context is used
to add subscriptions amongst other things.

`console.log('Congratulations, your extension "my-first-extension" is now active!');`

In the third line we print a message indicating our extension loaded properly.

```typescript
var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    vscode.window.showInformationMessage('Hello World!');
});
```

In the fourth line we register our command. There are two important parts of
this line.

1. First, a command is being registered using the `registerCommand`
method on `vscode.commands`. We associate a function with the command by passing
in a function as the second parameter. In our callback we call
`showInformationMessage` on `vscode.window` passing in our message as a string.
2. Finally, we store the return of calling `registerCommand` in the `dispoable`
variable. The return from `registerCommand` is an instance of the `Disposable`
class. The `Disposable` class represents a type which can release resources,
such as event listening or a timer.

`context.subscriptions.push(disposable);`

In the last line we push our disposable onto the context's subscriptions array.

#### API References

[commands.registerCommand API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#commands.registerCommand)

[window.showInformationMessage API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.showInformationMessage)

[context.subscriptions API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#ExtensionContext.subscriptions)

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
[Configuration File](https://code.visualstudio.com/docs/extensions/example-hello-world#_miscellaneous-files)

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
extension is available under `Hello World` in the command palette.

[Extension Manifest](https://code.visualstudio.com/docs/extensions/example-hello-world#_the-extension-manifest-packagejson)

### Debugging

VS Code has a full debugging suite built in that knows how to work perfectly
with typescript.

[Debugging Your Extension](https://code.visualstudio.com/docs/extensions/example-hello-world#_debugging-your-extension)
