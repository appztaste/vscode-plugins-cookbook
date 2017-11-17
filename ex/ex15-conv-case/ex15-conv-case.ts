"use strict";

import { window, commands } from "vscode";
import * as string from "underscore.string";
const editor = window.activeTextEditor;
const registerCommand = commands.registerCommand;

function isCapitalCase(word: string) {
  return /^([A-Z]+[a-z]*)+[1-9]*/.test(word);
}

function isSnakeCase(word: string) {
  return /^([a-z]+_[a-z]+)+[1-9]*/.test(word);
}

function isDashCase(word) {
  return /^([a-z]+-[a-z]+)+[1-9]*/.test(word);
}

function isCamelCase(word) {
  return /^[a-z]+([A-Z]+[a-z]*)+[1-9]*/.test(word);
}

export function activate(context) {
  registerCommand('extension.stringConvert', () => {
    editor.edit(builder => {
      editor.selections.forEach(selection => {
        let text = editor.document.getText(selection);
        if (isCapitalCase(text)) {
          text = string.underscored(text);
        } else if (isSnakeCase(text)) {
          text = string.camelize(text, true);
        } else if (isCamelCase(text)) {
          text = string.dasherize(text);
        } else if (isDashCase(text)) {
          text = string.camelize(text);
          text = string.capitalize(text);
        }
        builder.replace(selection, text);
      });
    });
  });
}
