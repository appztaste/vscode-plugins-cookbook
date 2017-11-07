'use strict';
import * as vscode from 'vscode';
import * as uuid from 'node-uuid';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('genuuid.generateUUID',
  () => {
    let editor = vscode.window.activeTextEditor;
    const genId: () => string = () => uuid.v4();
    if (editor)
      editor.edit(edit => 
        editor.selections.forEach(v => edit.replace(v, genId())));
  });
  context.subscriptions.push(disposable);
}
