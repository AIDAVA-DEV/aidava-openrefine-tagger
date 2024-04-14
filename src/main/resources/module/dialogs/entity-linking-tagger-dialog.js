// <div className="dialog-frame aidava-tagger">
//     <div className="dialog-header">
//         Tag column named "<span className="tagger-column-name">column</span>" for Entity Linking Workflow
//     </div>
//     <div className="dialog-body">
//         <fieldset>
//             <p>
//                 Select the Language that is used in the column.
//             </p>
//             <ol bind="el-langs"></ol>
//         </fieldset>
//     </div>
//     <div className="dialog-footer">
//         <button bind="cancel" className="button">Cancel</button>
//         <button bind="tag" className="button default" disabled>Tag</button>
//     </div>
// </div>

//
// JS File for Tagger Dialog
// HTML: src/main/resources/module/dialogs/nlp-tagger-dialog.html
// <div class="dialog-frame">
//     <div class="dialog-header">
//         Tag column named "<span class="tagger-column-name">column</span>" for NLP Workflow
//     </div>
//     <div class="dialog-body">
//         <fieldset>
//             <p>
//                 Select the NLP model that needs to be used for this column.
//             </p>
//             <ol bind="nlp-models"></ol>
//         </fieldset>
//     </div>
//     <div class="dialog-footer">
//         <button class="button" bind="cancel">Cancel</button>
//         <button class="button default" bind="tag">Tag</button>
//     </div>
// </div>
//


function EntityLinkingTaggerDialog(column) {
    this.column = column;
}

EntityLinkingTaggerDialog.prototype = {
    init: function (callback) {
        let self = this,
            selectedModel = null,
            dialogElement = this.dialogElement = $(DOM.loadHTML("aidava-tagger", "dialogs/entity-linking-tagger-dialog.html"));
        // Populate labels
        $(".tagger-column-name", dialogElement).text(this.column.name);
        // Bind controls
        let controls = DOM.bind(dialogElement);
        controls.cancel.click(this.bound("hide"));
        controls.tag.click(() => {
            self.tag(selectedModel);
        });

        // Load NLP models
        let langs = [
            {name: "English", value: "en"},
            {name: "German", value: "de"},
            {name: "Estonian", value: "et"}
        ];

        let modelList = $("ol", dialogElement);

        langs.forEach((model) => {
            let li = $("<li></li>").appendTo(modelList);
            let radio = $('<input type="radio" name="nlp-model" value="' + model.value + '">').appendTo(li);
            radio.click(() => {
                selectedModel = model.value;
                controls.tag.prop("disabled", false);
            });
            $('<label>' + model.name + '</label>').appendTo(li);
        });
        if (callback) {
            callback.apply(self);
        }
    },

    tag: function (model) {
        // Tag the column with the selected model
        console.log("Tagging column", this.column.name, "with model", model);
        let data = {
            column: this.column.name,
            model: model
        }
        Refine.postProcess("aidava-tagger", "tag-entity-linking", data, {}, {rowsChanged: false, modelsChanged: false});
        this.hide();
    },

    show: function () {
        this.init(function () {
            this.dialogLevel = DialogSystem.showDialog(this.dialogElement);
        });
    },

    hide: function () {
        DialogSystem.dismissUntil(this.dialogLevel - 1);
    },
}
