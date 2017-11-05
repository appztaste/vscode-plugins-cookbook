// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { copy } from "copy-paste";
import * as vscode from "vscode";
// var copypaste = require('copy-paste'); 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  vscode.commands.registerCommand("copy-word.copy", () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showInformationMessage("Open a file first to copy text");
      return;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
      if (selectWord(editor)) {
        copy(editor.document.getText(editor.selection));
      }
    } else {
      vscode.commands.executeCommand("editor.action.clipboardCopyAction");
    }
  });

  function selectWord(editor: vscode.TextEditor): boolean {
    const selection = editor.selection;
    const doc = editor.document;
    if (selection.isEmpty) {
      const cursorWordRange = doc.getWordRangeAtPosition(selection.active);

      if (cursorWordRange) {
        let newSe = new vscode.Selection(cursorWordRange.start.line, cursorWordRange.start.character, cursorWordRange.end.line, cursorWordRange.end.character);
        editor.selection = newSe;
        return true;

      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}