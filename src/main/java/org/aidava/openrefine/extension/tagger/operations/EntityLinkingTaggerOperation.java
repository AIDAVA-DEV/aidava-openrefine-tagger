package org.aidava.openrefine.extension.tagger.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.refine.model.Project;
import com.google.refine.operations.column.ColumnMoveOperation;

public class EntityLinkingTaggerOperation extends ColumnMoveOperation {
    private final String language;

    public EntityLinkingTaggerOperation(
            @JsonProperty("columnName")
            String columnName,
            @JsonProperty("language")
            String language,
            @JsonProperty("index")
            int index
    ) {
        super(columnName, index);
        this.language = language;
    }


    @JsonProperty("language")
    public String getLanguage() {
        return language;
    }

    @Override
    protected String getBriefDescription(Project project) {
        return "EntityLinkingTaggerOperation on " + getColumnName() + " with language " + language;
    }
}
