# Example 07 - Cut Copy

[Adapted from Copy Word Extension](https://github.com/alefragnani/vscode-copy-word)

## Copy Word

In this recipe we're going to tweak the last extension to cut the word after
copying it. 

## The Code

```typescript
vscode.commands.registerCommand("copy-word.cut", () => {
    const editor = vscode.window.activeTextEditor;

  if (!editor) {
      vscode.window.showInformationMessage("Open a file first to cut text");
      return;
  }

  const selection = editor.selection;
  if (selection.isEmpty) {
    if (selectWord(editor)) {
      copy(editor.document.getText(editor.selection));
      editor.edit((editBuilder) => {
          editBuilder.delete(editor.selection);
      }).then(() => {
          // console.log('Edit applied!');
      }, (err) => {
          console.log("Edit rejected!");
          console.error(err);
      });
    }
  } else {
      vscode.commands.executeCommand("editor.action.clipboardCutAction");
  }
});
// ..
```

## Walkthrough

We've cut out the redundant code.

### activate()

After ensuring a valid editor exists and is active, the current selection is
grabbed.

```typescript
if (selection.isEmpty) {
  if (selectWord(editor)) {
      copy(editor.document.getText(editor.selection));
      editor.edit((editBuilder) => {
          editBuilder.delete(editor.selection);
      // ...
```

After we've copied our text, we call edit on the editor and pass a callback.
Inside our callback we call delete on the builder passing in the selection
as the paraemter, deleting the selection from the screen.

### API References

[TextEditor.edit](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditor.edit)

[TextEditor.delete](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextEditor.delete)

## Configuration File

Edit the configuration file for cut copy instead.

```json
{
    "contributes": {
      "commands": [
        {
          "command": "copy-word.cut",
          "title": "Copy Word: Cut"
        }
    ]
  },
    "activationEvents": [
      "onCommand:copy-word.cut"
  ]
}
```

## Running The Code

Run the command as previous. After placing the cursor on a word, call
`Copy Word: Cut` from the command palette. Paste and ensure it copy and
pasted the correct word.
