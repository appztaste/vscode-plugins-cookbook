# Example 01 - Hello World

[Adataped from the VS Code Hello World](https://code.visualstudio.com/docs/extensions/example-hello-world)

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
package.json file occur.

`console.log('Congratulations, your extension "my-first-extension" is now active!');`

In the third line we print a message indicating our extension loaded properly.

```typescript
var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    vscode.window.showInformationMessage('Hello World!');
});
```

In the fourth line we register our command. There are two important parts of
this line.

First, a command is being registered using the `registerCommand`
method on `vscode.commands`. We associate a function with the command by passing
in a function as the second parameter. In our callback we call
`showInformationMessage` on `vscode.window` passing in our message as a string.

Finally, we store the return of calling `registerCommand` in the `dispoable`
variable. The return from `registerCommand` is an instance of the `Disposable`
class. The `Disposable` class represents a type which can release resources,
such as event listening or a timer.

#### API References

[registerCommand](https://code.visualstudio.com/docs/extensionAPI/vscode-api#commands.registerCommand)
[Disposable](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Disposable)

### Running The Code

You can run the example right now because the code generator automatically
sets the necessary configuration files to tell VS Code how you want to use
the command. Follow the instructions in running-extensions.md to run the
command. If everything worked correctly, you should see `Hello World` display
in the information bar at the top of the window.

### File Details

- `.vscode/launch.json` defines launching VS Code in the Extension Development mode. It also points with `preLaunchTask` to a task defined in `.vscode/tasks.json` that runs the TypeScript compiler.
- `.vscode/settings.json` by default excludes the out folder. You can modify which file types you want to hide.
- `.gitignore` - Tells Git version control which patterns to ignore.
- `.vscodeignore` - Tells the packaging tool which files to ignore when publishing the extension.
- `README.md` - README file describing your extension for VS Code users.
- `vsc-extension-quickstart.md` - A Quick Start guide for you.
- `test/extension.test.ts` - you can put your extension unit tests in here and run your tests against the VS Code API (see Testing Your Extension)


### Configuration File

To make the command available to VS Code for use, you must set the package.json
file for your extension. 