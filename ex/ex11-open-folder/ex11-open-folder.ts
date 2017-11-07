'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.openFileFolder',
  () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    let file = activeTextEditor.document.uri.path;
    let folderName = path.dirname(file);
    let folderUrl = vscode.Uri.file(folderName);
    vscode.commands.executeCommand("vscode.openFolder", folderUrl, true);
  });
  context.subscriptions.push(disposable);
}

