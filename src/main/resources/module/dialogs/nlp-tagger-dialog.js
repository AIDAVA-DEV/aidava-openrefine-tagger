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


function NlpTaggerDialog(column) {
    this.column = column;
}

NlpTaggerDialog.prototype = {
    init: function (callback) {
        let self = this,
            selectedModel = null,
            dialogElement = this.dialogElement = $(DOM.loadHTML("aidava-tagger", "dialogs/nlp-tagger-dialog.html"));
        // Populate labels
        $(".tagger-column-name", dialogElement).text(this.column.name);
        // Bind controls
        let controls = DOM.bind(dialogElement);
        controls.cancel.click(this.bound("hide"));
        controls.tag.click(() => {
            self.tag(selectedModel);
        });

        // Load NLP models
        let models = [
            {name: "Model 1", value: "model1"},
            {name: "Model 2", value: "model2"},
            {name: "Model 3", value: "model3"}
        ];

        let modelList = $("ol", dialogElement);

        models.forEach((model) => {
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
        Refine.postProcess("aidava-tagger", "tag-nlp", data, {}, {rowsChanged: false, modelsChanged: false});
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
