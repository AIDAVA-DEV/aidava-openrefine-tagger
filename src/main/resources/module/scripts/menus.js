DataTableColumnHeaderUI.extendMenu(function (column, columnHeaderUI, menu) {
    MenuSystem.appendTo(menu, [
        "core/edit-column"
    ], [
        {
            id: "aidava-tagger/nlp-tag-column",
            label: "Tag column for NLP workflow",
            click: dialogHandler(NlpTaggerDialog, column),
        },
        {
            id: "aidava-tagger/entity-linking-tag-column",
            label: "Tag column for Entity Linking workflow",
            click: dialogHandler(EntityLinkingTaggerDialog, column),
        }
    ]);
});

function dialogHandler(dialogConstructor) {
    var dialogArguments = Array.prototype.slice.call(arguments, 1);

    function Dialog() {
        return dialogConstructor.apply(this, dialogArguments);
    }

    Dialog.prototype = dialogConstructor.prototype;
    return function () {
        new Dialog().show();
    };
}
