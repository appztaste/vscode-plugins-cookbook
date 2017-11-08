'use strict';

import * as vscode from "vscode";
import * as path   from "path";

export function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.openFileFolder',
    (e) => {
        let folderName;
        if (e) {
          folderName = e.path;
        } else {
          const activeTextEditor = vscode.window.activeTextEditor;
          let file = activeTextEditor.document.uri.path;
          folderName = path.dirname(file);
        }
        let folderUrl = vscode.Uri.file(folderName);
        vscode.commands.executeCommand("vscode.openFolder", folderUrl, true);
    });
    context.subscriptions.push(disposable);
}
