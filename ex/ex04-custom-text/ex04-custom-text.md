# Example 04 - Custom Text

[Adapted from the VS Code Word Count](https://code.visualstudio.com/docs/extensions/example-word-count)

## Custom Text

In this recipe we're going to edit the last extension with some text
customization.

## The Code

```typescript
this._statusBarItem.text = wordCount !== 1
                         ? `$(pencil) ${wordCount} Words`
                         : '$(pencil) 1 Word';
    this._statusBarItem.show();
```

## Walkthrough

All that's changed is the addition of `$(pencil)` to the beginning of each count
label. The expression `$(icon)` displays a
[Github Octicon](https://octicons.github.com/).


## Running The Code

Run the extension by either doing a window reload `Ctrl+R` or with `F5` and
then start editing a Markdown file. You should now should have a live updating
Word Count.

## Disposing Extension Resources

[Disposin Extension Resources](https://code.visualstudio.com/docs/extensions/example-word-count#_disposing-extension-resources).

## Installing your Extension Locally

[Installing your Extension Locally](https://code.visualstudio.com/docs/extensions/example-word-count#_installing-your-extension-locally)
