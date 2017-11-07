'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.scopeToHere',
    (e: vscode.Uri) => {
      vscode.commands.executeCommand("vscode.openFolder", e, false);
  });
  context.subscriptions.push(disposable);
}
