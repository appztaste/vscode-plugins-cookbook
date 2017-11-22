'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerTextEditorCommand('line-to-column.splitLine', () => {
    const selection        = vscode.window.activeTextEditor.selection;
    const currentDocument  = vscode.window.activeTextEditor.document;
    const selectedLineText = currentDocument.getText(selection);
    const splittedLine     = splitLineToColumn(selectedLineText);
    const editor           = vscode.window.activeTextEditor;
    editor.edit(editBuilder => {
      editBuilder.replace(selection, splittedLine);
    })
  });
  context.subscriptions.push(disposable);
}

function splitLineToColumn(line: String) {
  return line.replace(/\s/gm, '\r\n');
}
