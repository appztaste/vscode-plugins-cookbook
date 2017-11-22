'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    vscode.window.showInformationMessage('Selected characters: ' + text.length);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  
}