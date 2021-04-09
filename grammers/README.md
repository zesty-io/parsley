![Parsley Logo](../assets/parsley-logo.png)

# Parsley Grammer

A repository to manage and create Parsley Syntax Grammar files that support VScode, ATOM, Sublime, Monaco Editor, and other editors that follow standards from TextMate grammars.

The master file is `syntaxes/parsley.YAML-tmLanguage`, all other syntaxes are built using node.js scripts.

## Building Files

### Monaco Editor

`npm run buildMonarch` outputs to `syntaxes/parsley-monarch-tokenizer.json`

**Remote files to include:**
Tokenizer `https://zesty-io.github.io/parsley-grammers/syntaxes/parsley-monarch-tokenizer.json`
Theme Colors: `https://zesty-io.github.io/parsley-grammers/themes/parsley-monaco-dark-theme.json`

See examples usage of this in the `/examples/monaco.html` file in this repo.

### VSCode

`npm run buildJSON` outputs to `syntaxes/parsley.tmLanguage.json`

### ATOM

`npm run buildJSON` outputs to `syntaxes/parsley.tmLanguage.json`

### Sublime

`npm run buildXML` outputs to `syntaxes/parsley.tmLanguage`

### Generic TextMate JSON

`npm run buildJSON` outputs to `syntaxes/parsley.tmLanguage.json`
