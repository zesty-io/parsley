<div style="background: #1B1F2C; width: 400px; padding: 20px; border-radius: 20px;">
<img src="https://9skdl6.media.zestyio.com/parsley-logo-brackets.f1cb27a519bdb5b6ed34049a5b86e317.png" alt="parsley logo" width="100%">
</div>

# Parsley Grammer

Parsley is the template language of Zesty.io. Parlsey is used to dynamically pull content into files served on Zesty.io. This is the master repository to manager and create grammar files that support VScode, ATOM, Sublime, Monaco Editor, and other editors that follow standards from TextMate grammars.

The master file is `syntaxes/parsley.YAML-tmLanguage`, all other syntaxes are built using node.js scripts.

## Building Files

### Monaco Editor

`npm run buildMonarch` outputs to `syntaxes/parsley-monarch-tokenizer.json`

### VSCode

`npm run buildJSON` outputs to `syntaxes/parsley.tmLanguage.json`

### ATOM

`npm run buildJSON` outputs to `syntaxes/parsley.tmLanguage.json`

### Sublime

`npm run buildXML` outputs to `syntaxes/parsley.tmLanguage`

### Generic TextMate JSON

`npm run buildJSON` outputs to `syntaxes/parsley.tmLanguage.json`
