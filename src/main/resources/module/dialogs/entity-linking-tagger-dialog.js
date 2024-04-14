// <div class="dialog-frame aidava-tagger">
//     <div class="dialog-header">
//         Tag column named "<span class="tagger-column-name">column</span>" for Entity Linking Workflow
//     </div>
//     <div class="dialog-body">
//         <fieldset>
//             <p>
//                 Select the Language that is used in the column.
//             </p>
//             <ol bind="el-langs" class="language"></ol>
//         </fieldset>
//         <br/>
//         <fieldset>
//             <p>
//                 Select the Target Terminology for the column.
//             </p>
//             <ol bind="el-terminologies" class="terminology"></ol>
//         </fieldset>
//     </div>
//     <div class="dialog-footer">
//         <button bind="cancel" class="button">Cancel</button>
//         <button bind="tag" class="button default" disabled>Tag</button>
//     </div>
// </div>

function EntityLinkingTaggerDialog(column) {
    this.column = column;
}

EntityLinkingTaggerDialog.prototype = {
    init: function (callback) {
        let self = this,
            selectedLanguage = null,
            selectedTerminology = null,
            dialogElement = this.dialogElement = $(DOM.loadHTML("aidava-tagger", "dialogs/entity-linking-tagger-dialog.html"));
        // Populate labels
        $(".tagger-column-name", dialogElement).text(this.column.name);
        // Bind controls
        let controls = DOM.bind(dialogElement);
        controls.cancel.click(this.bound("hide"));
        controls.tag.click(() => {
            self.tag(selectedLanguage, selectedTerminology);
        });

        // Load NLP models
        let langs = [
            {name: "English", value: "en"},
            {name: "German", value: "de"},
            {name: "Estonian", value: "et"}
        ];

        let terminologies = [
            {name: "Snomed CT", value: "snomed"},
            {name: "ICD-10", value: "icd10"},
            {name: "LOINC", value: "loinc"}
        ];

        let langList = $("ol.language", dialogElement);
        let terminologyList = $("ol.terminology", dialogElement);

        langs.forEach((model) => {
            let li = $("<li></li>").appendTo(langList);
            let radio = $('<input type="radio" name="language" value="' + model.value + '">').appendTo(li);
            radio.click(() => {
                selectedLanguage = model.value;
                if (selectedTerminology) {
                    controls.tag.prop("disabled", false);
                }
            });
            $('<label>' + model.name + '</label>').appendTo(li);
        });

        terminologies.forEach((model) => {
            let li = $("<li></li>").appendTo(terminologyList);
            let radio = $('<input type="radio" name="terminology" value="' + model.value + '">').appendTo(li);
            radio.click(() => {
                selectedTerminology = model.value;
                if (selectedLanguage) {
                    controls.tag.prop("disabled", false);
                }
            });
            $('<label>' + model.name + '</label>').appendTo(li);
        });
        if (callback) {
            callback.apply(self);
        }
    },

    tag: function (
        language,
        terminology
    ) {
        // Tag the column with the selected model
        let data = {
            column: this.column.name,
            language: language,
            terminology: terminology
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
