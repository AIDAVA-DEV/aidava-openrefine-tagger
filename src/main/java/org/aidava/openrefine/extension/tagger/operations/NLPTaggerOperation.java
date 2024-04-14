package org.aidava.openrefine.extension.tagger.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.refine.model.Project;
import com.google.refine.operations.column.ColumnMoveOperation;

public class NLPTaggerOperation extends ColumnMoveOperation {

    private final String modelName;

    public NLPTaggerOperation(
            @JsonProperty("columnName")
            String columnName,
            @JsonProperty("modelName")
            String modelName,
            @JsonProperty("index")
            int index
    ) {
        super(columnName, index);
        this.modelName = modelName;
    }


    @JsonProperty("modelName")
    public String getModelName() {
        return modelName;
    }

    @Override
    protected String getBriefDescription(Project project) {
        return "NLPTaggerOperation on " + getColumnName() + " with model " + modelName;
    }

}
