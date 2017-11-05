# Example 03 - Word Count

[Adataped from the VS Code Word Count](https://code.visualstudio.com/docs/extensions/example-word-count)

## Word Count

In this recipe we're going to go over how to add a word counter display to our
bottom information panel. It will display or activate specifically for markdown
files.

## Overview

This example has three sections which will take you through a set of related concepts:

1. Update the Status Bar - display custom text in the VS Code Status Bar
2. Subscribing to Events - updating the Status Bar based on editor events
3. Disposing Extension Resources - release resources like event subscriptions or UI handles

In this example we have two steps, create a WordCounter class, and register our
WordCounter class as a command. 

### The Code

For full code listening, reference ex03-word-count.ts.

### Walkthrough

On the first line we import all of the vscode module we need to create our
extension.

Skipping to the WordCounter Class.

`private _statusBarItem: StatusBarItem;`

On the first line we declare a private variable called _statusBarItem to store
the reference to the status bar.

`public updateWordCount() {`

Next we begin defining our `updateWordCount()` method.

```typescript
if (!this._statusBarItem) {
  this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
}
```

If we don't already have a `StatusBar` stored on our reference, create one. In
this casse we pass in the `StatusBarAlignment.Left` enum to make our display
align to the left of the `StatusBar`

#### API References

[activeTextEditor API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.activeTextEditor)

[window.activeTextEditor API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.activeTextEditor)

[TextEditor.selection API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditor.selection)

[TextDocument.getText API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextDocument.getText)

### Running The Code

You can run the example just like the previous one using `hello world`, except
you need to create and document, type some text and select it before it will
work. If everything is working correctly, you should see the number of
characters you have selected in the information panel.
