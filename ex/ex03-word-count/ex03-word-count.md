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

### WorldController

The WorldController class watches global event emitters and calls and updates
our wordCounter function when appropriate.

```typescript
private _wordCounter: WordCounter;
private _disposable: Disposable;
```

We declare our member variables.

Inside the constructor we have:

```typescript
this._wordCounter = wordCounter;

// subscribe to selection change and editor activation events
let subscriptions: Disposable[] = [];
window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
```

In this section we store our wordCounter reference, declare and init a
subscriptions variable and registers two event emitters. The two emitters are
`onDidChangeTextEditorSelection` is raised as the cursor position changes and
`onDidChangeActiveTextEditor` is raised as the active editor changes.
The emitters are passed our custom `_onEvent` function, `this` and our
subscriptions array.

`this._wordCounter.updateWordCount();`

Here we update the counter for the current file.

`this._disposable = Disposable.from(...subscriptions);`

Finally, we create a combined disposable out of our two event emitters.

```typescript
dispose() {
  this._disposable.dispose();
}

private _onEvent() {
  this._wordCounter.updateWordCount();
}
```

To finish out the class, we create a `dispose()` method to handle the resources
when the WordCounterController is no longer needed. Our `_onEvent()` method
is last, and it simply updates the counter.

### activate()

Now that our functionality is implemented, it's time to register our command
inside the `activate()` method.

`let wordCounter = new WordCounter();`

We create our WordCounter utility object.

`let controller = new WordCounterController(wordCounter);`

Create our WordCounterController, passing in the wordCounter.

Finally, we push our objects onto the subscriptions array.

### API References

[window.createStatusBar API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.createStatusBarItem)

[StatusBarAlignment API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#StatusBarAlignment)

[Disposable API](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Disposable)

## Configuration File

We want our plugin to activate when a markdown file is open. Lets set our
package.json properties.

First set `activationEvents` to trigger on markdown documents.

```json
"activationEvents": [
        "onLanguage:markdown"
    ]
```

### onLanguage event

The onLanguage:${language} event takes the language id, in this case "markdown",
and will be raised whenever a file of that language is opened.

Second, remove the contributes property since we won't be calling our command
directly.

Remove:
```json
"contributes": {
        "commands":
            [{
                "command": "extension.sayHello",
                "title": "Hello World"
            }
        ]
    }
```

## Running The Code

Run the extension by either doing a window reload `Ctrl+R` or with `F5` and
then start editing a Markdown file. You should now should have a live updating
Word Count.
