'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable: vscode.Disposable =
    vscode.commands
      .registerTextEditorCommand('extension.auto-insert-semicolon',
      (editor, textEdit) => {
        return semicolonCommand(editor, textEdit);
      });
  context.subscriptions.push(disposable);
}

function semicolonCommand(textEditor: vscode.TextEditor,
  textEditorEdit: vscode.TextEditorEdit) {
  const line: vscode.TextLine
    = textEditor.document
      .lineAt(textEditor.selection.active);

  if (line.text.trim() !== '' && line.text[line.text.length - 1] !== ';') {
    textEditorEdit.insert(line.range.end, ';');
  }

  let position = new vscode.Position(line.lineNumber,
    line.range.end.character);
  textEditor.selection = new vscode.Selection(position, position);
}