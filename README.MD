# aidava-openrefine-tagger

This is a simple OpenRefine extension that allows you to tag columns with dummy operations.
It is useful when you want to keep extra information in operation history for other applications.

## How to install

Download the latest release from the [releases page](https://github.com/AIDAVA-DEV/aidava-openrefine-tagger/releases)
and extract it to the `extensions` folder of your OpenRefine installation.

**Note:** module folder should be in the following path: `extensions/aidava-openrefine-tagger/module`. Do not directly
copy `module` folder to `extensions` folder. It should be in `aidava-openrefine-tagger` folder.

## How to use

After installing the extension, you will see a new option in the column menu called `Tag Column for ...`.

(1) Click the arrow on the column header to open the column menu.
(2) Go into the `Edit column` submenu.
(3) Click on `Tag Column for ...`.
(4) Select required arguments for the operation.
(5) Click `Tag` button.

## Current Tags

```json
[
  {
    "op": "aidava-tagger/tag-nlp-operation",
    "columnName": "SUBTYPE",
    "modelName": "model1",
    "index": 2,
    "description": "NLPTaggerOperation on SUBTYPE with model model1"
  },
  {
    "op": "aidava-tagger/tag-entity-linking-operation",
    "columnName": "SUBTYPE_NAME",
    "language": "en",
    "terminology": "snomed",
    "index": 3,
    "description": "EntityLinkingTaggerOperation on SUBTYPE_NAME with language en and terminology snomed"
  }
]
```