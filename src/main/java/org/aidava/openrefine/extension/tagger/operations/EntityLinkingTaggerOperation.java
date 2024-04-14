package org.aidava.openrefine.extension.tagger.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.refine.model.Project;
import com.google.refine.operations.column.ColumnMoveOperation;

public class EntityLinkingTaggerOperation extends ColumnMoveOperation {
    private final String language;

    private final String terminology;

    public EntityLinkingTaggerOperation(
            @JsonProperty("columnName")
            String columnName,
            @JsonProperty("language")
            String language,
            @JsonProperty("terminology")
            String terminology,
            @JsonProperty("index")
            int index
    ) {
        super(columnName, index);
        this.language = language;
        this.terminology = terminology;
    }


    @JsonProperty("language")
    public String getLanguage() {
        return language;
    }

    @JsonProperty("terminology")
    public String getTerminology() {
        return terminology;
    }

    @Override
    protected String getBriefDescription(Project project) {
        return "EntityLinkingTaggerOperation on " + getColumnName() + " with language " + language + " and terminology " + terminology;
    }
}
