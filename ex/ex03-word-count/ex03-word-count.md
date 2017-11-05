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

## The Code

For full code listening, reference ex03-word-count.ts.

## Walkthrough

### Imports

On the first line we import all of the vscode module we need to create our
extension.

### WordCounter Class

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

```typescript
// Get the current text editor
let editor = window.activeTextEditor;
if (!editor) {
  this._statusBarItem.hide();
  return;
}
```

Next we attempt to grab the activeTextEditor, if it doesn't exist we hide
the status bar and return.

`let doc = editor.document;`

Then we grab the editor document and store it in the doc variable.

```typescript
// Only update status if an Markdown file
if (doc.languageId === "markdown") {
  let wordCount = this._getWordCount(doc);

  // Update the status bar
  this._statusBarItem.text = wordCount !== 1 ? `${wordCount} Words` : '1 Word';
  this._statusBarItem.show();
} else {
  this._statusBarItem.hide();
}
```

We end the method by checking if our file is markdown, if so we:

1. Find the word count using `this._getWordCount(doc);`.
2. Determine correct display verbage, setting `this._statusBarItem.text`.
3. Show the statusBarItem using `this._statusBarItem.show()`.

If our file is not markdown, we simply hide the status bar item using
`this._statusBarItem.hide();`

#### _getWordCount(doc: TextDocument): number

Our main utility method, `_getWordCount` takes a TextDocument as a parameter and
returns a number.

`let docContent = doc.getText();`

The first line of the method grabs the text from the document parameter.

```typescript
// Parse out unwanted whitespace so the split is accurate
docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
```

These lines of code removes extra white space characters (except the first one,
I'm not sure what it does).

```typescript
let wordCount = 0;
if (docContent != "") {
  wordCount = docContent.split(" ").length;
}
return wordCount;
```

Finally we declare our wordCount variable, split on single spaces, and set
wordCount equal to the length of the array. We finish by returning wordCount.


#### dispose()
```typescript
dispose() {
  this._statusBarItem.dispose();
}
```

Finally, we implement the `dispose()` method so our resources are disposed of
when WordCount is no longer needed.

### activate()

Now that our functionality is implemented, it's time to register our command
inside the `activate()` method.



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
